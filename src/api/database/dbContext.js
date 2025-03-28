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

const models = require("../models/index")(sequelize, DataTypes);

const db = {
    sequelize,
    Sequelize,
    ...models
};

const initializeDatabase = async () => {
    try {
        console.log("\n--- Új log ---");
        console.log('Starting database authentication...');

        await sequelize.authenticate()
            .then(() => {
                console.log('Database connected successfully.');
            })
            .catch((error) => {
                console.error('Unable to connect to the database:', error.message);
            });
      
        //await sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true });
        await sequelize.sync({ force: false })
        .then(() => {
            console.log('Database synchronized.');
        })
        .catch((error) => {
            console.error('Error syncing database:', error.message);
        });

        /*await db.Themes.initializeThemes();
        console.log('Default themes inserted.');

        await db.Tasks.initializeTasks();
        console.log('Default tasks inserted.');
        
        await db.Community_tags.initializeTags();
        console.log('Default tags inserted.');

        await db.Advertisement_Cards.initializeCards();
        console.log('Cards inserted.');

        await db.StoreItems.initializeStoreItems();
        console.log('Store items inserted.');
    
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1', { raw: true });*/
    } catch (error) {
        console.error('Error initializing database:', error);
    }
};

initializeDatabase();

module.exports = db;