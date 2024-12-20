require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.post('/generate-world', async (req, res) => {
  const { userInput } = req.body;

  const API_KEY = process.env.OPENAI_API_KEY;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'user',
            content: `Generate a dystopian narrative based on user input: ${userInput}`,
          },
        ],
        max_tokens: 1000,
      }),
    });

    const data = await response.json();
    res.json(data); 
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to generate world' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
