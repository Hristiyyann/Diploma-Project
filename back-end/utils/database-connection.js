const config = require('./config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.database, config.username, config.password,
{
    host: config.host,
    dialect: config.dialect,
    define: 
    {
        freezeTableName: true,
        underscored: true,
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE',
    },

    dialectOptions: 
    {
        timezone: "+03:00"
    },

    timezone: "+03:00",
});

module.exports = sequelize;