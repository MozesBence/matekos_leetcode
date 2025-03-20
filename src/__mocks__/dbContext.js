require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const mysql = require('mysql2/promise');

const sequelize = new Sequelize({logging: false});

const models = require("../api/models/index")(sequelize, DataTypes); // Betöltöd az index.js-t

const db = {
    sequelize,
    Sequelize,
    ...models
};

module.exports = db;
