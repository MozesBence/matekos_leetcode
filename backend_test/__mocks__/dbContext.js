const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT || 'mysql',
        port: 3306,
        logging: false,
    }
);

const models = require("../api/models/index")(sequelize, DataTypes);

const db = {
    sequelize,
    Sequelize,
    ...models
};

const databaseAuth = async () =>{
    try
    {
        await sequelize.sync({ force: true });

        await sequelize.authenticate();
    }
    catch(err)
    {
        console.log(err);
        console.error("Database connection failed!");
    }
}

databaseAuth()

module.exports = db;
