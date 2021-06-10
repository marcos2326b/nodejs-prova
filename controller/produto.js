const mongoose = require('mongoose');
const produto = require('../route/produto');

module.exports = (app) => {

    const ProdutosController = {

        cadastrar(request, response) {

            console.log('Produtos / chamada...');
            console.log(`request.body: ${request.body}`);
            console.log(request.body);

            const Produto = app.model.produto;
            const produto = new Produto(request.body);


            if (produto.dataHoracadastro == null){
                produto.dataHoracadastro = new Date(); 
            }
            
 
            mongoose.connect(
                app.constantes.pd.connection,
                app.constantes.pd.connectionParams
                )

                .then(
                    (resultado) => {

                        if(request.body.codigo > 0 ){
                        const resultadoCreate = Produto.create(produto)
                    
                            .then((resultado) => {
                                console.log(`resultado do then: ${resultado} | constructor: ${resultado.constructor.name}`);
                                console.log(resultado);
                                console.log(`cadastrado com sucesso.`);
                                mongoose.disconnect();
                                response.status(200).send(resultado);
                            })
                            .catch((erro) => {
                                console.log(`erro do create: ${erro} | constructor: ${erro.constructor.name}`);
                                console.log(erro);
                                console.log(`Erro ao cadastrar o produto: ${erro}`);
                                mongoose.disconnect();
                                response.status(500).send(`Erro ao cadastrar o Codigo: ${erro}`);
                            });

                        } else{
                            console.log("não existe código 0, por favor coloque um código acima de 0")
                            mongoose.disconnect();
                            response.status(400).send(`Código do produto: ${produto.codigo} invalido.`);

                        }

                        if(request.body.preco > 0 ){
                            const resultadoCreate = Produto.create(produto)
                                .then((resultado) => {
                                    console.log(`resultado do then: ${resultado} | constructor: ${resultado.constructor.name}`);
                                    console.log(resultado);
                                    console.log(`cadastrado com sucesso.`);
                                    mongoose.disconnect();
                                    response.status(200).send(resultado);
                                })
                                .catch((erro) => {
                                    console.log(`erro do create: ${erro} | constructor: ${erro.constructor.name}`);
                                    console.log(erro);
                                    console.log(`Erro ao cadastrar o produto: ${erro}`);
                                    mongoose.disconnect();
                                    response.status(500).send(`Erro ao cadastrar o Código: ${erro}`);
                                });

                            } else{
                                console.log("não existe código 0, por favor coloque um código acima de 0")
                                mongoose.disconnect();
                                response.status(400).send(`preço do produto: ${produto.preco} invalido.`);
    
                            }
                    }
                ).catch(
                    (erro) => {
                        console.log(`erro do connection: ${erro} | constructor: ${erro.constructor.name}`);
                        console.log(erro);
                        console.log(`Erro ao conectar no banco MongoDB: ${erro}`);
                        response.status(500).send(`Erro ao conectar no banco MongoDB: ${erro}`);
                    }
                );
        },
        alterar(request,response) {

            console.log('Rota PUT /produto chamada...');
            console.log(`request.body: ${request.body}`);
            console.log(request.body);

            const Produto = app.model.produto;

            if (produto.dataHoracadastro == null){
                produto.dataHoracadastro = new Date(); 
            }

            if(request.body.preco > 0){

            } 

            mongoose.connect(
                app.constantes.pd.connection,
                app.constantes.pd.connectionParams
                )

                .then(() => {
                    Produto.updateOne(
                        {codigo: request.body.codigo },
                        {
                            $set: {
                                preco: request.body.preco,
                            }
                        }
                    )
                        .then((resultado) => {
                            console.log(`resultado do updateOne:`);
                            console.log(resultado);

                            if(request.body.preco > 0){
                                if (resultado.nModified > 0) {
                                    mongoose.disconnect();
                                    response.status(200).send('Usuario alterado com sucesso.');

                            }

                            } else {
                                mongoose.disconnect();
                                response.status(404).send('Usuario não localizado no cadastro.');
                            }

                        })
                        
                        .catch((erro) => {
                            console.log(`Erro ao alterar o Usuario: ${erro}`);
                            console.log(erro);
                            mongoose.disconnect();
                            response.status(500).send(`Erro ao alterar o Usuario: ${erro}`);
                        });
                })
                .catch((erro) => {
                    console.log(`erro do connection: ${erro} | constructor: ${erro.constructor.name}`);
                    console.log(erro);
                    console.log(`Erro ao conectar no banco MongoDB: ${erro}`);
                    response.status(500).send(`Erro ao conectar no banco MongoDB: ${erro}`);
                });
        },

        buscarcodigo(request, response){
            console.log('Rota GET/produto/:codigo? chamada...')
            console.log(`request.params:${request.params}`);
            console.log(request.params)

            if(request.params.codigo == "" || request.params.codigo == null ){
                response.status(400).send('Parametro codigo invalido');
            } else {
               
                mongoose.connect(
                    app.constantes.pd.connection,
                    app.constantes.pd.connectionParams
                    )

                .then(() => {
                    const Produto = app.model.produto;

                    Produto.find( { codigo: request.params.codigo } )
                    .then((codigoProduto) => {
                        console.log(codigoProduto);
                        mongoose.disconnect();
                        response.status(200).send(codigoProduto);
                    })

                    .catch((erro) => {
                        console.log(`Erro ao realizar a consulta do código: ${erro}`);
                        console.log(erro);
                        mongoose.disconnect();
                        response.status(500).send(`Erro ao realizar a consulta do código: ${erro}`);
                    });
    
                })

                .catch((erro) => {
                    console.log(`Erro ao conectar no banco MongoDB: ${erro}`);
                    console.log(erro);
                    response.status(500).send(`Erro ao conectar no banco MongoDB: ${erro}`);
                });
            }   
        },
    }
    return ProdutosController;
}