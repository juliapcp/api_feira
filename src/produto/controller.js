const ProdutosRepository = require("./repositorio-sql");

class ProdutosController {

    constructor() {
        this.repository = new ProdutosRepository();
    }

    async update(req, res) {
        const { id } = req.params;
        const produto = await this.repository.find(id);
        if (produto) {
            try {
                console.log(req.body)
                const response = await this.repository.put(id, req.body);
                return res.json(response);
            } catch (e) {
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
        const produto = await this.repository.find(id);
        if (produto) {
            await this.repository.delete(id);
            return res.json();
        } else {
            res.status(404);
            return res.json({ message: "Objeto não encontrado" });
        }
    }
}


module.exports = ProdutosController;