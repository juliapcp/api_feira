
const express = require('express');
const app = express();
const { Banca } = require('./banca/model');


app.use(express.json());

const bancasRouter = require('./banca/routes');
app.use('/bancas', bancasRouter);

const usuariosRouter = require('./usuario/routes');
app.use('/usuarios', usuariosRouter);

const produtosRouter = require('./produto/routes');
app.use('/produtos', produtosRouter);

app.listen(3000, () => console.log("Listening at 3000"));