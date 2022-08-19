const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');

// TODO - create the new sequelize connection
const db = new Sequelize({
    dialect: 'sqlite',
    storage: './data.sqlite',
    logging: false
})

module.exports = {
    db,
    DataTypes
};