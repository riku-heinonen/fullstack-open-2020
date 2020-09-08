const mongoose = require('mongoose')

const [ password, name, number ] = process.argv.slice(2, 5)

if (!password) {
	console.log('give password as argument')
	process.exit(1)
}

const url = `mongodb+srv://fullstack-open:${password}@cluster0.opidg.mongodb.net/phonebook?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
	name: String,
	number: String
})

const Person = mongoose.model('Person', personSchema)

if (name && number) {
	const person = new Person({ name, number })
	person.save().then((response) => {
		console.log(`added ${response.name} number ${response.number}`)
		mongoose.connection.close()
	})
} else if (!name && !number) {
	console.log('phonebook:')
	Person.find({}).then((result) => {
		result.forEach((person) => console.log(`${person.name} ${person.number}`))
		mongoose.connection.close()
	})
} else {
	console.log('Both name and number are required to add a new person')
	mongoose.connection.close()
}
