const mongoose = require('mongoose');

module.exports = (app) => {
    const Schema = mongoose.Schema;
    const produtosSchema = Schema( 
        {
            codigo:{ type: Number, required: true, index:{ unique: true }},
            descricao: { type: String, required: true},
            preco:{ type: Number, required: true },
            dataHoracadastro:{type:Date,required:true},
        }
    );
    const Produto = mongoose.model('produto', produtosSchema);

    return Produto;
}