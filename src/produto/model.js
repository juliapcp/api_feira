const { DataTypes, Model } = require('sequelize');

const { sequelizeCon } = require('../config/db-config');

class Produto extends Model {}
    
Produto.init({
    descricao: DataTypes.STRING,
    valorUnitario: DataTypes.FLOAT,
    quantidade: DataTypes.FLOAT,
}, { 
    sequelize: sequelizeCon, 
    schema: 'public',
    modelName: 'produto'
});


module.exports = { Produto };