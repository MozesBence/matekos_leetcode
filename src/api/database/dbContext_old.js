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
    },
);

const models = require("../models/index")(sequelize, DataTypes);

const db = {
    sequelize,
    Sequelize,
    ...models 
};
// Initialize database and themes
const initializeDatabase = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
        });

        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
        console.log(`Database "${process.env.DB_NAME}" created or already exists.`);
        await connection.end();

        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true });
        
        await db.Users.sync({ force: true });
        await db.Community_posts.sync({ force: true });
        await sequelize.sync({ force: true });
        console.log('Database connected and models synchronized.');
        
        await db.Themes.initializeThemes();
        
        await db.Tasks.initializeTasks();
        
        await db.Community_tags.initializeTags();
        
        await db.Advertisement_Cards.initializeCards();

        await db.Competitions.initializeCompetitions();
        
        await sequelize.query('SET GLOBAL event_scheduler = ON;');

        await db.CompetitionTasks.bulkCreate([
            { task_id: 1, competition_id: 1 },
            { task_id: 1, competition_id: 20 },
            { task_id: 2, competition_id: 40 },
            { task_id: 2, competition_id: 24 },
            { task_id: 3, competition_id: 70 },
            { task_id: 3, competition_id: 5 },
            { task_id: 4, competition_id: 2 },
            { task_id: 4, competition_id: 7 },
            { task_id: 4, competition_id: 9 },
            { task_id: 4, competition_id: 66 },
            { task_id: 5, competition_id: 45 },
            { task_id: 5, competition_id: 59 },
            { task_id: 6, competition_id: 92 },
            { task_id: 6, competition_id: 34 },
            { task_id: 7, competition_id: 28 },
            { task_id: 7, competition_id: 39 },
            { task_id: 7, competition_id: 72 },
            { task_id: 7, competition_id: 54 }
        ], { ignoreDuplicates: true });
        
        const createEventQuery = `
        CREATE EVENT IF NOT EXISTS delete_expired_tokens
        ON SCHEDULE EVERY 10 SECOND
        DO
        DELETE FROM Tokenz
        WHERE expires <= DATE_SUB(NOW(), INTERVAL 1 HOUR) AND type = 'regisztrálás';`;
        
        await sequelize.query(createEventQuery);
        console.log('Event for automatic token deletion created.');
        
        const createConfDeleteEventQuery = `
        CREATE EVENT IF NOT EXISTS delete_expired_confirm_tokens
        ON SCHEDULE EVERY 10 SECOND
        DO
        DELETE FROM Tokenz
        WHERE expires <= DATE_SUB(NOW(), INTERVAL 15 MINUTE) AND type = 'beállítások';`;
        
        await sequelize.query(createConfDeleteEventQuery);
        console.log('Event for automatic confirm token deletion created.');

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

        await sequelize.query(createTriggerQuery);
        console.log('Trigger for user deletion created.');

        const createDailyTaskEventQuery = `
            CREATE EVENT IF NOT EXISTS daily_task_event
            ON SCHEDULE EVERY 1 DAY
            STARTS TIMESTAMP(CURRENT_DATE) -- Holnaptól indul
            DO
            BEGIN
                -- Ellenőrzés, hogy a hónap első napja van-e
                IF DAY(CURRENT_DATE) = 1 THEN
                    DELETE FROM Daily_Tasks;
                END IF;

                -- Ha az adott napi id már létezik, akkor nem csinál semmit
                IF NOT EXISTS (SELECT 1 FROM Daily_Tasks WHERE id = DAY(CURRENT_DATE)) THEN
                    -- Új random task hozzáadása az aktuális nap id-jával
                    INSERT INTO Daily_Tasks (id, task_id)
                    SELECT 
                        DAY(CURRENT_DATE) AS id,  -- Az aktuális nap sorszáma
                        (SELECT id FROM Tasks ORDER BY RAND() LIMIT 1) AS task_id; -- Véletlenszerű task kiválasztása
                END IF;
            END;
        `;

        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1', { raw: true });

        await sequelize.query(createDailyTaskEventQuery);
        console.log('Daily event for tasks created.');

    } catch (error) {
        console.error('Error initializing database:', error);
    }
};

initializeDatabase();

module.exports = db;
