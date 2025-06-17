# Subamerica Relay Server

🚀 A lightweight relay server built for the Subamerica Network to enable real-time communication between applications — including Roku apps — using Redis and HTTP polling (or WebSocket support in the future).

## 🌐 Overview

The Subamerica Relay Server enables:
- **Real-time message delivery** from any app or interface to Subamerica-connected channels.
- **Redis pub/sub** integration to broadcast events such as tips, emotes, or live triggers.
- **Roku overlay support**, used to power real-time feedback from the Subamerica audience network.

This server is built in **Node.js** and runs on a lightweight port, ready for deployment via services like **Render** or **Fly.io**.

---

## 🧱 How It Works

1. Other applications (e.g., tipping systems, web dashboards) publish events to Redis.
2. This server listens to the Redis channel (e.g., `"relay"`).
3. Connected clients poll `/poll` or use WebSocket to retrieve live updates (e.g., a Roku app).
4. The client reacts and renders the overlay (e.g., "🎵 Tip: $5").

---

## 📦 Installation

```bash
git clone https://github.com/subamericanetwork/sub-relay-server.git
cd sub-relay-server
npm install
```

---

## 🚀 Running the Server

Make sure your Redis instance is running locally or remotely.

```bash
node poll-server.js
```

The server will:
- Listen on port `5050` by default.
- Subscribe to the `relay` channel on Redis.
- Serve incoming HTTP poll requests on `/poll`.

---

## 🧪 Testing Locally

To send a test tip via Redis CLI:

```bash
redis-cli
> PUBLISH relay '{"type":"tip","emoji":"🎵","amount":5}'
```

Then open your Roku app or send a browser request to:

```
http://localhost:5050/poll
```

---

## ⚙️ Configuration

To customize the Redis host or port, modify the `poll-server.js` file:

```js
const redis = new Redis({
  host: 'localhost',
  port: 6379
});
```

---

## 📡 Deployment

You can deploy to services like:

- **Render.com** (recommended)
- **Fly.io**
- **Heroku**

Make sure port `5050` is publicly exposed and your Redis is accessible to the app.

---

## 🔐 Security Note

In production:
- Use **rate limiting** and **authentication** for `/poll`.
- Secure Redis access via authentication and firewall rules.

---

## 🤝 License

MIT — Use freely with credit. Built for the underground, by the underground.  
🌊 _Subamerica Network: Indie Underground — Stream fearless art, sound & stories 24/7._