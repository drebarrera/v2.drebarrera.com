require('dotenv').config();

// api/invoke-dre.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }
  const { prompt } = req.body;
  const apiUrl = process.env.API_URL;
  const apiToken = process.env.API_KEY;

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });
  const data = await response.json();
  res.status(200).json(data);
}