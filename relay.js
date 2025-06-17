// relay.js

const net = require("net");
const redis = require("redis");

// CONFIG
const REDIS_URL = "redis://default:DKYK6U690gDgp94VTUqp2pxDTjRKatd5@redis-16811.c11.us-east-1-3.ec2.redns.redis-cloud.com:16811";
const REDIS_CHANNEL = "overlay_v1";
const TCP_PORT = 5050;

// Redis client
const subscriber = redis.createClient({ url: REDIS_URL });
subscriber.connect().then(() => {
  console.log("✅ Connected to Redis");
  subscriber.subscribe(REDIS_CHANNEL, (message) => {
    console.log("📨 Tip event:", message);
    broadcast(message);
  });
});

const clients = [];

// Create TCP server
const server = net.createServer((socket) => {
  console.log("📡 Roku connected");
  clients.push(socket);

  socket.on("end", () => {
    console.log("❌ Roku disconnected");
    const index = clients.indexOf(socket);
    if (index !== -1) clients.splice(index, 1);
  });

  socket.write("Connected to Subamerica Relay\n");
});

// Send message to all clients
function broadcast(message) {
  for (const client of clients) {
    try {
      client.write(message + "\n");
    } catch (e) {
      console.log("⚠️ Failed to send to client:", e.message);
    }
  }
}

server.listen(TCP_PORT, () => {
  console.log(`🚀 TCP relay server running on port ${TCP_PORT}`);
});
