const express = require('express');
const { createClient } = require('redis');

const app = express();
const PORT = 5050;

let latestTip = { type: "tip", emoji: "🎵", amount: 0 };

// Connect to Redis
const redis = createClient({
  url: 'redis://:DKYK6U690gDgp94VTUqp2pxDTjRKatd5@redis-16811.c11.us-east-1-3.ec2.redns.redis-cloud.com:16811'
});

redis.on('error', (err) => console.error("Redis error:", err));
redis.connect().then(() => {
  console.log("✅ Connected to Redis");

  redis.subscribe('overlay_v1', (message) => {
    try {
      const parsed = JSON.parse(message);
      console.log("📨 Tip event received:", parsed);
      latestTip = parsed;
    } catch (e) {
      console.error("Failed to parse Redis message", e);
    }
  });
});

// Endpoint for Roku to poll
app.get('/poll', (req, res) => {
  res.json(latestTip);
});

app.listen(PORT, () => {
  console.log(`🚀 HTTP polling server running on port ${PORT}`);
});