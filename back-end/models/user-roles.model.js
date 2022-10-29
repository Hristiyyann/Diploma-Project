const {DataTypes} = require('sequelize');
const sequelize = require('../utils/database-connection');

const UserRole = sequelize.define('user_roles',
{
    id:
    {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

    user_id: 
    {
        type: DataTypes.UUID,
    },

    role: 
    {
        type: DataTypes.ENUM('Common', 'Sitter', 'Admin'),
    }
});

module.exports = UserRole;