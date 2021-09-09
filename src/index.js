const { response } = require('express')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
let phonebook = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4
  }

]

const PORT = process.env.PORT || 3001

app.set('port', PORT)
let contador = 0
//config
morgan.token('body', function (req, res) { JSON.stringify(req.body) })
app.use(morgan(':method :url :response-time ms'))
app.use(cors())
app.use(express.json())
//routes
app.get('/', (request, response) => {
  response.send('<h1>Hello moto!</h1>')
})

app.get('/info', (req, res) => {
  res.send(`The app has send info to ${contador} <br> ${Date.now}`)
})

app.get('/api/persons', (request, response) => {
  contador++
  response.status(200).json(phonebook)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = phonebook.find(person => person.id === id)

  if (person) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})
app.post('/api/persons', (req, res) => {
  if (req.body.name && req.body.number) {
    const name = req.body.name
    const number = req.body.number
    const duplicate = phonebook.find(phone => phone.name === name)
    if (!duplicate) {
      const id = Math.random() * 20000

      const newPhone = {
        name: name,
        number: number,
        id: id
      }
      phonebook.push(newPhone)
      res.status(201).send(newPhone)
    } else {
      res.status(409).send({ error: 'name must be unique' })
    }
  } else {
    res.status(400).send({ error: 'content missing' })
  }
})
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  phonebook = phonebook.filter(phone => phone.id !== id)
  res.status(204).end()
})
//listening

app.listen(PORT, () => {
  console.log(`Server listening in port: ${PORT}`)
})