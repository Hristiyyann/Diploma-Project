const config = require('./config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.database, config.username, config.password,
{
    host: config,
    dialect: config.dialect,
    define: 
    {
        freezeTableName: true,
        underscored: true,
    },
});

module.exports = sequelize;