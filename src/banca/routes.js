const { isAuth } = require('../middlewares/isAuth');
const { Router } = require('express');
const router = Router();

const BancaController = require('./controller');
const controller = new BancaController();

router.post('/', isAuth, (req, res) => controller.create(req, res));
router.get('/list', isAuth, (req, res) => controller.list(req, res));
router.put('/:id', isAuth, (req, res) => controller.update(req, res));
router.delete('/:id', isAuth, (req, res) => controller.delete(req, res));
router.get('/:id', isAuth, (req, res) => controller.detail(req, res));

module.exports = router;