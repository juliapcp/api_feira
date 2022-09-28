const { Banca, Produto } = require('./model');
const Sequelize = require('sequelize');

class ProdutosRepository {
    constructor() {
    }

    async save(produto) {
        const id = await Produto.create(produto);
        return id;
    }

    async put(idParam, produtoBody) {
        const { descricao, valorUnitario, quantidade, id, bancaId } = produtoBody;
        await Produto.update({
            descricao, valorUnitario, quantidade, id, bancaId
        },
            {
                where: { id: idParam },
            });
        const idConsulta = id ? id : idParam;
        const produtoResponse = await Produto.findByPk(idConsulta);
        return produtoResponse.toJSON();
    }

    async find(id) {
        const produto = await Produto.findByPk(id);
        return produto;
    }

    async list() {
        const listagem = await Produto.findAndCountAll();
        return listagem;
    }

    async delete(id) {
        await Produto.destroy({
            where: {
                id
            }
        })
    }
}

module.exports = ProdutosRepository;