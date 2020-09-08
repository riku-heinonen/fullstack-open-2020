import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/persons'

const getPeople = () => {
	return axios.get(baseUrl).then((response) => response.data)
}

const createPerson = (person) => {
	return axios.post(baseUrl, person).then((response) => response.data)
}

const deletePerson = (id) => {
	return axios.delete(`${baseUrl}/${id}`).then((response) => response.data)
}

const replacePerson = (id, person) => {
	return axios.put(`${baseUrl}/${id}`, person).then((response) => response.data)
}

export default { getPeople, createPerson, deletePerson, replacePerson }
