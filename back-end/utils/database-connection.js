const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD,
{
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT,
    define: 
    {
        freezeTableName: true,
        underscored: true,
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE',
    },

    dialectOptions: 
    {
        timezone: "+02:00"
    },

    timezone: "+02:00",
});

module.exports = sequelize;