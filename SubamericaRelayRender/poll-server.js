const express = require('express');
const redis = require('redis');

const app = express();
const PORT = process.env.PORT || 5050;

const client = redis.createClient({
  url: process.env.REDIS_URL
});

client.connect().then(() => {
  console.log('✅ Connected to Redis');
}).catch(console.error);

app.use(express.json());

app.get('/poll', async (req, res) => {
  const message = await client.blPop('tipstream', 0);
  if (message) {
    const [, data] = message;
    console.log('📨 Tip event received:', data);
    res.setHeader('Content-Type', 'application/json');
    res.end(data);
  }
});

app.listen(PORT, () => {
  console.log(`🚀 HTTP polling server running on port ${PORT}`);
});