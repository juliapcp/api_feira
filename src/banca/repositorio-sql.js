const { Banca } = require('./model');
const { Produto } = require('../produto/model');

class BancasRepository {
    constructor() {
    }

    async save(banca) {
        const bancaDB = await Banca.create(banca);
        return bancaDB.toJSON().id;
    }

    async put(idParam, bancaBody) {
        const {horaFechamento, horaAbertura, descricao, id} = bancaBody;
        await Banca.update({
            horaFechamento,horaAbertura, descricao,id
        },
            {
                where: { id: idParam },
            });
        const idConsulta = id ? id : idParam;
        const bancaResponse = await Banca.findByPk(idConsulta);
        return bancaResponse.toJSON();
    }

    async find(id) {
        const banca = await Banca.findByPk(id, {
            include: [
                {
                    model: Produto,
                    required: false
                }
            ]
        });
        return banca;
    }

    async list() {
        const listagem = await Banca.findAll();
        return listagem;
    }

    async delete(id) {
        await Banca.destroy({
            where: {
                id
            }
        })
    }
}

module.exports = BancasRepository;