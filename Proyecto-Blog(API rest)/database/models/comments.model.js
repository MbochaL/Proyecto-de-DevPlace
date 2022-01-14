const db = require('../config');
const { Sequelize, Model, DataTypes } = require("sequelize");

const comments = db.define(
    "comments",
     {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },

        userId: DataTypes.INTEGER,
        contentCom: DataTypes.STRING,
        articlesId: DataTypes.INTEGER,
        createdAt: DataTypes.INTEGER,
        deleted: DataTypes.BOOLEAN,
    }, 
    {
        underscored: true,
        timestamps: false,
    }

)

comments.belongsTo( articles, {foreignKey: 'articleId'})
articles.hasMany( comments, {as: 'comments' ,foreignKey: 'articleId'})

module.exports = comments;

