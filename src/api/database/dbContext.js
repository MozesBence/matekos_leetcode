require('dotenv').config(); 
const { Sequelize, DataTypes } = require('sequelize');
const mysql = require('mysql2/promise'); 

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT || 'mysql',
        logging: false,
    }
);

const db = {};

db.Sequelize = Sequelize;

db.sequelize = sequelize;

const { Users, Topics, Topics_comments, Themes, Tasks, Task_comments, Competitions, Competitions_types, Badges, Alerts, Tokenz, User_custom, Vip_custom } = require("../models")(sequelize, DataTypes);

db.Users = Users;
db.Topics = Topics;
db.Topics_comments = Topics_comments;
db.Themes = Themes;
db.Tasks = Tasks;
db.Task_comments = Task_comments;
db.Competitions = Competitions;
db.Competitions_types = Competitions_types;
db.Badges = Badges;
db.Alerts = Alerts;
db.Tokenz = Tokenz;
db.User_customization = User_custom;
db.Vip_customization = Vip_custom;

const initializeDatabase = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
        });
        // Ellenőrizzük és létrehozzuk az adatbázist, ha nem létezik
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
        console.log(`Database "${process.env.DB_NAME}" created or already exists.`);
        await connection.end();

        await db.sequelize.sync({ alter: true });
        console.log('Database connected and models synchronized.');

        sequelize.query('SET GLOBAL event_scheduler = ON;')
        .then(() => {
            console.log("Event Scheduler is enabled.");
        })
        .catch(error => {
            console.error("Error enabling event scheduler:", error);
        });

        const createEventQuery = `
        CREATE EVENT IF NOT EXISTS delete_expired_tokens
        ON SCHEDULE EVERY 10 SECOND
        DO
            DELETE FROM Tokenz
            WHERE expires <= DATE_SUB(NOW(), INTERVAL 1 HOUR);`;

        await db.sequelize.query(createEventQuery);
        console.log('Event for automatic token deletion created.');

        // Létrehozzuk a triggert, amely a Tokenz törlésekor a Users táblát is módosítja
        const createTriggerQuery = `
            CREATE TRIGGER IF NOT EXISTS delete_user_when_token_deleted
            AFTER DELETE ON Tokenz
            FOR EACH ROW
            BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM Tokenz WHERE user_id = OLD.user_id
                ) AND EXISTS (
                    SELECT 1 FROM Users WHERE id = OLD.user_id AND activated = 0
                ) THEN
                    DELETE FROM Users WHERE id = OLD.user_id;
                END IF;
            END;`;

        await db.sequelize.query(createTriggerQuery);
        console.log('Event for automatic token deletion created.');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
};

initializeDatabase();

try
{
    sequelize.authenticate();
    
    console.log("Database Connection Successful");
}
catch(error)
{
    console.log(error.message);
}


module.exports = db;
