const { obterPessoas } = require('./service')

Array.prototype.myFilter = function(callback) {

	const list = []

	for(index in this) {
		const iten = this[index]
		const result = callback(iten, index, this)


		if(!result) continue;
		list.push(iten)
	}

	return list;
}

async function main() {
	try {
		const {
			results
		} = await obterPessoas('a')

		// const larsFamily = results.filter(function(iten) {
		// 	const result = iten.name.toLowerCase().indexOf('lars') !== -1
		// 	return result;
		// })

		const larsFamily = results.myFilter((iten, index, list) => iten.name.toLowerCase().indexOf('lars') !== -1)
		const names = larsFamily.map((person) => person.name)
		
		console.log(names)
		
	} catch(error) {
		console.log("Deu Ruim: ", error)
	}

}

main()