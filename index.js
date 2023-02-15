const { request } = require('express')
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

app.use(express.json(), morgan('tiny'))
app.use(cors())
app.use(express.static('build'))

let phoneNumbers = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('pies')
    // morgan.token('host', function (req, res) {
    //     return req.hostname;
    // });

})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(people => {
        response.json(people)
    })

})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    phoneNumbers = phoneNumbers.filter(number => number.id !== id)

    response.status(204).end()
})

const generateId = () => {
    const maxId = phoneNumbers.length > 0
        ? Math.max(...phoneNumbers.map(n => n.id))
        : 0
    return maxId + 1
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    if (phoneNumbers.find(number => number.name === body.name)) {
        return response.status(400).json({
            error: 'name already in there'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })

    // morgan.token('user-type', function (req, res) { return JSON.stringify(newNumber) })

})

app.get('/info', (request, response) => {
    response.send(`Phone book has info for ${phoneNumbers.length} people <br> ${new Date()}`)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} at http://localhost:${PORT}`)
})
