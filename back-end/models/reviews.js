const {DataTypes} = require('sequelize');
const sequelize = require('../utils/databaseConnection');

const Review = sequelize.define('reviews',
{
    id:
    {
        type: DataTypes.UUID,
        primaryKey: true,
    },

    booker_id: 
    {
        type: DataTypes.UUID,
    },

    sitter_id: 
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