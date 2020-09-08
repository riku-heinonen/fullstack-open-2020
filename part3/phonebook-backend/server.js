require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/Person')
const app = express()
morgan.token('postBody', (request) => JSON.stringify(request.body))

app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postBody'))
app.use(cors())

app.get('/api/persons', (request, response, next) => {
	Person.find({}).then((persons) => response.json(persons)).catch((error) => next(error))
})

app.get('/info', (request, response, next) => {
	Person.find({})
		.then((persons) => {
			const content = `
		<p>Phonebook has information for ${persons.length} people</p>
		<p>${new Date()}</p>
	  `
			response.send(content)
		})
		.catch((error) => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
	Person.findById(request.params.id)
		.then((person) => {
			if (person) {
				response.json(person)
			} else {
				response.status(404).end()
			}
		})
		.catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
	Person.findByIdAndDelete(request.params.id)
		.then(() => response.status(204).end())
		.catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
	const { name, number } = request.body

	if (!(name && number)) {
		return response.status(400).json({
			error: 'content missing'
		})
	}

	const person = new Person({ name, number })
	person
		.save()
		.then(() => {
			response.json(person)
		})
		.catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
	const { name, number } = request.body
	const person = { name, number }

	Person.findByIdAndUpdate(request.params.id, person, { new: true })
		.then((updatedPerson) => {
			response.json(updatedPerson)
		})
		.catch((error) => next(error))
})

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
	console.error(error.message)

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	}

	next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
