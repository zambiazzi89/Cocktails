const express = require('express')
const axios = require('axios')
const cors = require('cors')
require('dotenv').config()

const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

const OPENAI_API_KEY = process.env.OPENAI_API_KEY

const OPENAI_API_URL = 'https://api.openai.com/v1/completions'

app.post('/api/generate', async (req, res) => {
  const { prompt } = req.body

  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-3.5-turbo-instruct',
        prompt: prompt,
        max_tokens: 150,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    )

    res.json(response.data)
  } catch (error) {
    console.error('Error fetching from OpenAI:', error)
    res.status(500).json({ error: 'Error fetching from OpenAI' })
  }
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
