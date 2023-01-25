const express = require('express')
const app = express()

app.use(express.json())

let phoneNumbers = []

app.get('/', (request, response) => {
    response.send('<h1>Hi there</h1>')
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT} at http://localhost:${PORT}`)