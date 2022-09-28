const { DataTypes, Model } = require('sequelize');
const { Usuario } = require('../usuario/model');
const { Produto } = require('../produto/model');

const { sequelizeCon } = require('../config/db-config');

class Banca extends Model {}
    
Banca.init({
    descricao: DataTypes.STRING,
    horaAbertura: DataTypes.TIME,
    horaFechamento: DataTypes.TIME
}, { 
    sequelize: sequelizeCon, 
    schema: 'public',
    modelName: 'banca'
});

Banca.belongsTo(Usuario);
Usuario.hasMany(Banca);
Produto.belongsTo(Banca);
Banca.hasMany(Produto, { onDelete: 'cascade', onUpdate: 'cascade' })
sequelizeCon.sync();

module.exports = { Banca };