const { isAuth } = require('../middlewares/isAuth');
const { Router } = require('express');
const router = Router();

const ProdutosController = require('./controller');
const controller = new ProdutosController();

router.delete('/:id', isAuth, (req, res) => controller.delete(req, res));
router.put('/:id', isAuth, (req, res) => controller.update(req, res));

module.exports = router;