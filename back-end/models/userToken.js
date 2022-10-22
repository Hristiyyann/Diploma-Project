const {DataTypes} = require('sequelize');
const sequelize = require('../utils/databaseConnection');

const UserToken = sequelize.define('user_tokens',
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

    token:
    {
        type: DataTypes.STRING,
    },

    is_invalidated:
    {
        type: DataTypes.BOOLEAN,
    }
});

module.exports = UserToken;