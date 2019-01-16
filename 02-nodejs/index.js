const util = require('util');

const obterEnderecoAsync = util.promisify(obterEndereco); 

function obterUsuario() {

	return new Promise(function resolvePromise (resolve, reject) {
		
		setTimeout(() => {
			return resolve({
				id: 1,
				nome: 'Aladin',
				dataNascimento: new Date()
			})
		}, 1000);

	});

}

function obterTelefone(idUsuario) {

	return new Promise(function(resolve, reject) {
		setTimeout(() => {
			return resolve({
				numero: '5599999',
				ddd: 55
			})
		}, 2000);

	});

}

function obterEndereco(idUsuario, callback) {
	setTimeout(() => {
		return callback(null,{
			rua: 'dos bobos',
			numero: 0
		})
	}, 2000);
}


const usuarioPromise = obterUsuario();

usuarioPromise
	.then(function(usuario) {
		return obterTelefone(usuario.id)
			.then(function resolverTelefone(result) {
				return {
					usuario: {
						nome: usuario.nome,
						id: usuario.id
					},
					telefone: result
				}
			});
	})
	.then(function(resultado) {
		const endereco = obterEnderecoAsync(resultado.usuario.id)

		return endereco.then(function resolverEndereco(result) {
			return {
				usuario: resultado.usuario,
				telefone: resultado.telefone,
				endereco: result
			}
		});
	})
	.then(function(resultado) {
		console.log(
			`Nome: ${resultado.usuario.nome}
			Endereço: ${resultado.endereco.rua}, ${resultado.endereco.numero}
			telefone: ${resultado.telefone.ddd} ${resultado.telefone.numero}
		`);
	})
	.catch(function(error) {
		console.error("Deu Ruim ",error);
	});


// obterUsuario(function resolverUsuario(error, usuario) {
// 	if(error) {
// 		console.error("DEU RUIM CARA", error);
// 		return;
// 	}

// 	obterTelefone(usuario.id, function resolverTelefone(error2, telefone) {
// 		if(error2) {
// 			console.error("DEU RUIM CARA x2", error2);
// 			return;
// 		}
		
// 		obterEndereco(usuario.id, function resolverEndereco(error3, endereco) {
// 			if(error3) {
// 				console.error("DEU RUIM CARA x3", error3);
// 				return;
// 			}

// 			console.log(`
// 				Nome: ${usuario.nome},
// 				Endereço: ${endereco.rua}, ${endereco.numero}
// 				telefone: ${telefone.numero}
// 			`);

// 		});

		

// 	});

// });


// const usuario = obterUsuario();
// const telefone = obterTelefone(usuario.id)


// console.log('telefone', telefone)