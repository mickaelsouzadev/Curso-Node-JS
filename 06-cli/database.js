const { 
	readFile, 
	writeFile 
} = require('fs')

const { promisify } = require('util')

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

class Database {

	constructor() {
		this.nome_arquivo = 'herois.json'
	}

	async getDataFile() {
		const file = await readFileAsync(this.nome_arquivo, 'utf8')

		return JSON.parse(file.toString())
	}

	async writeFile(data) {
		await writeFileAsync(this.nome_arquivo, JSON.stringify(data))
		return true
	}

	async list(id) {
		const data = await this.getDataFile()
		const filteredData = data.filter(iten => (id ? (iten.id === id) : true ))

		return filteredData
	}

	async insert(hero) {
		const data = await this.getDataFile()
		const id = hero.id <= 2 ? hero.id : Date.now()

		const heroWithId = {
			id,
			...hero
		}

		const finalData = [
			...data,
			heroWithId
		]

		const result = await this.writeFile(finalData)

		return result
	}

	async delete(id) {
		if(!id) {
			return await this.writeFile([])
		}

		const data = await this.getDataFile()
		const index = data.findIndex(iten => iten.id === parseInt(id)) 
	
		if(index === -1) {
			throw Error('O usuário informado não existe')
		}

		data.splice(index, 1)
		return await this.writeFile(data)
	}
}


module.exports = new Database()