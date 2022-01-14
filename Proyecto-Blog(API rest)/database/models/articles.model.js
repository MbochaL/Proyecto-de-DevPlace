const db = require('../config');
const { Sequelize, Model, DataTypes } = require("sequelize");
const comments = require('./comments.model');

const articles = db.define(
    "articles", 
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        userId: DataTypes.INTEGER,
        commentsId: DataTypes.INTEGER,
        title: DataTypes.STRING,
        contentArt: DataTypes.STRING,
        deleted: DataTypes.BOOLEAN
    },
    {
        underscored: true,
        timestamps: false,
    }

)


module.exports = articles;