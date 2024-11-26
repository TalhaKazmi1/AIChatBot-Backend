// backend/server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
require('dotenv').config();
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/chat', async (req, res) => {
    const { message } = req.body;
  
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }]
      });
  
      const botMessage = completion.choices[0]?.message.content?.trim();
  
      if (botMessage) {
        res.json({ message: botMessage });
      } else {
        res.status(500).json({ error: 'No response generated' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Something went wrong!' });
    }
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
