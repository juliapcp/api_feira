const BancasRepository = require('./repositorio-sql');
const ProdutosRepository = require('../produto/repositorio-sql');

class BancaController {
    constructor() {
        this.repository = new BancasRepository();
        this.repositoryProdutos = new ProdutosRepository();
    }
    async create(req, res) {
        const { descricao, horaAbertura, horaFechamento } =  req.body;
        const banca = {  
            descricao, horaAbertura, horaFechamento, usuarioEmail: req.user.email
        };
        const bancaId = await this.repository.save(banca);
        for (const produto of req.body.produtos) {
            const { descricao, valorUnitario, quantidade } = produto;
            const produtoDto = {
                descricao, valorUnitario, quantidade, bancaId: bancaId
            };
            await this.repositoryProdutos.save(produtoDto);
        }
        return res.json({message:"Sucesso na inclusão"});
    }

    async list(req, res) {
        const listagem = await this.repository.list();
        return res.json(listagem);
    }

    async update(req, res) {
        const { id } = req.params;
        const banca = await this.repository.find(id);
        if (banca) {
            try {
                console.log(req.body)
                const response = await this.repository.put(id, req.body);
                return res.json(response);
            } catch(e){
                res.status(400);
                console.error(e);
                return res.json({ message: "Body inválido" });
            }
            
        } else {
            res.status(404);
            return res.json({ message: "Objeto não encontrado" });
        }
    }

    async delete(req, res) {
        const { id } = req.params;
        const banca = await this.repository.find(id);
        if (banca) {
            await this.repository.delete(id);
            return res.json();
        } else {
            res.status(404);
            return res.json({ message: "Objeto não encontrado" });
        }
    }

    async detail(req, res) {
        const { id } = req.params;
        const banca = await this.repository.find(id);
        if(banca){
            return res.json(banca);
        } else {
            res.status(404);
            return res.json({message: "Objeto não encontrado"});
        }
    }
    

}


module.exports = BancaController;