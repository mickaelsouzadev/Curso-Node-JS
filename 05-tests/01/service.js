const { get } = require('axios')

const URL = 'https://swapi.co/api/people'

async function getPeople(name) {
	const url = `${URL}/?search=${name}&format=json`
	const result = await get(url)
	return result.data.results.map(mapPeople);
}

function mapPeople(iten) {
	return {
		nome: iten.name,
		altura: iten.height
	}
}

module.exports = {
	getPeople
}