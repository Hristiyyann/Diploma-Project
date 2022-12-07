const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database-connection');

const Sitter = sequelize.define('sitters',
{
    id:
    {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

    userId: 
    {
        type: DataTypes.UUID,
        unique: true,
    },

    about:
    {
        type: DataTypes.TEXT,
    },

    city:
    {
        type: DataTypes.STRING,
    },

    status:
    {
        type: DataTypes.ENUM('Candidate', 'Approved', 'Disapproved'),
        defaultValue: 'Candidate',
    }
});
    
module.exports = Sitter;