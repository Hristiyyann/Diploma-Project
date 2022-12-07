const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database-connection');

const Review = sequelize.define('reviews',
{
    id:
    {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

    bookerId: 
    {
        type: DataTypes.UUID,
    },

    sitterId: 
    {
        type: DataTypes.UUID,
    },

    review:
    {
        type: DataTypes.TEXT,
    },

    grade: 
    {
        type: DataTypes.INTEGER,
    }
});

module.exports = Review;