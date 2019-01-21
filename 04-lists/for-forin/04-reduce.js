const { obterPessoas } = require('./service')

Array.prototype.myReduce = function(callback, firstValue) {
	let lastValue = typeof firstValue !== undefined ? firstValue : this[0]

	for(let index = 0; index <= this.length - 1; index++) {
		lastValue = callback(lastValue, this[index])
	}

	return lastValue
}


async function main() {

	try {
		// const { results } = await obterPessoas('a')


		// const alturas = results.map(iten => parseInt(iten.height))

		// console.log("Alturas: ", alturas)

		// const total = alturas.reduce((previous, next) => {
		// 		return previous + next;
		// }, 0)

		const myList = [
			['Eric', 'Wendel'],
			['NodeBr', 'Nerdzão']
		]

		const total = myList.myReduce((previous, next) => {
				return previous.concat(next)
			}, [])
			.join(', ')

		console.log('Total: ', total)

	} catch(error) {
		console.error("Deu Ruim: ", error)
	}

}

main()