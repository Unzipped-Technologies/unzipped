const axios = require('axios')

async function GET(url, headers = {}, searchParams = new URLSearchParams()) {
  try {
    const response = await axios.get(url, { headers, params: searchParams })
    return response.data
  } catch (error) {
    console.log(error)
  }
}

async function POST(url, headers, body) {
  try {
    const response = await axios.post(url, body, { headers })
    return response.data
  } catch (error) {
    console.log(error)
  }
}

const API = { GET, POST }

module.exports = API
