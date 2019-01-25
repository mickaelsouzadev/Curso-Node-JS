const {
	deepEqual,
	ok
} = require('assert')

const INSERT_DEFAULT_ITEN = {
	nome: 'Flash',
	poder: 'Speed',
	id: 1
}

const database = require('./database')

describe('Suite de manipulação de heróis', () => {

	before(async () => {
		await database.insert(INSERT_DEFAULT_ITEN)
	})

	if('Deve pesquisar um heroi, usando arquivos', async () => {
		const expected = INSERT_DEFAULT_ITEN
		const [result] = await database.list(expected.id)

		deepEqual(result, expected)
	})

	it('Deve cadastrar um heroi, usando arquivos', async () => {
	  	const expected = {
	  		...INSERT_DEFAULT_ITEN,
	  		nome: 'Batman',
	  		id: 2
	  	}
	  	const result = await database.insert(expected)
	  	const [actual] = await database.list(expected.id)

	 	deepEqual(actual, expected)
	})

	it.only('Deve remover um heroi por id', async () => {
		const expected = true
		const result = await database.delete(INSERT_DEFAULT_ITEN.id)

		deepEqual(result, expected)
	})
})