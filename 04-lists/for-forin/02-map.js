const service = require('./service');

Array.prototype.myMap = function(callback) {
	const newArrayMapped = []

	for(let i = 0; i <= this.length - 1; i++) {
		const result = callback(this[i], i)
		newArrayMapped.push(result)
	}

	return newArrayMapped;
}

async function main() {
	try {
		const results = await service.obterPessoas("a")

		// const names = []
		// results.results.forEach(function(item) {
		// 	names.push(item.name)
		// })

		// const names = results.results.map(function (pessoa) {
		// 	return pessoa.name
		// })

		// const names = results.results.map((pessoa) => pessoa.name)
		const names = results.results.myMap(function(pessoa, index) {
			return pessoa.name
		})
		console.log("Names: ", names)
	} catch(error) {
		console.error("Deu Ruim: ", error)
	}

}

main()