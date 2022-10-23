const {DataTypes} = require('sequelize');
const sequelize = require('../utils/databaseConnection');

const Service = sequelize.define('services',
{
    id:
    {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

    service_name: 
    {
        type: DataTypes.STRING,
        unique: true,
    },
    
    service_type:
    {
        type: DataTypes.ENUM('Main', 'Additional'),
    }
});

module.exports = Service;