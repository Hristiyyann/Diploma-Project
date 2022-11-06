const {DataTypes} = require('sequelize');
const sequelize = require('../utils/database-connection');

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

    token_type:
    {
        type: DataTypes.ENUM('Access', 'Refresh'),
    }
});

module.exports = UserToken;