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

        await sequelize.authenticate();
        console.log('Database connection successful!');
        
        await db.Users.sync({alter: true})
        await db.User_customization.sync({alter: true})
        await sequelize.sync({ alter: true });
        console.log('Database models synchronized.');
        
        await db.Themes.initializeThemes();
        
        await db.Tasks.initializeTasks();
        
        await db.Community_tags.initializeTags();
        
        await db.Advertisement_Cards.initializeCards();

        await db.Competitions.initializeCompetitions();

        await db.Daily_Tasks.initializeDailyTask();

        await db.StoreItems.initializeStoreItems();
        
        await sequelize.query('SET GLOBAL event_scheduler = ON;');

        await db.Users.bulkCreate([
            { email: "pinteadani88@gmail.com", password: "$2b$10$QsxRn8Z5r2LFneDpfH4DD.bUM0S/YBV8FRbx/2Gmj.rV8AGQM8l4O", user_name: "admin", user_role: "admin", admin: 1, activated: 1 },
            { email: "pinteaviktoria1@gmail.com", password: "$2b$10$fLB5TCYXBPlKBazYYTDa9OAjcCCxxAuv21lxWLIr/gSV67cNW1VOC", user_name: "teszt_felhasznalo",  activated: 2 }
        ], {ignoreDuplicates: true})

        await db.User_customization.bulkCreate([
            { user_id: 1, darkmode: 0 },
            { user_id: 2, darkmode: 0 }
        ], {ignoreDuplicates: true})

        await db.CompetitionTasks.bulkCreate([
            { competition_id: 1, task_id: 1 },
            { competition_id: 1, task_id: 20 },
            { competition_id: 2, task_id: 40 },
            { competition_id: 2, task_id: 24 },
            { competition_id: 3, task_id: 70 },
            { competition_id: 3, task_id: 5 },
            { competition_id: 4, task_id: 2 },
            { competition_id: 4, task_id: 7 },
            { competition_id: 4, task_id: 9 },
            { competition_id: 4, task_id: 66 },
            { competition_id: 5, task_id: 45 },
            { competition_id: 5, task_id: 59 },
            { competition_id: 6, task_id: 92 },
            { competition_id: 6, task_id: 34 },
            { competition_id: 6, task_id: 28 },
            { competition_id: 6, task_id: 39 },
            { competition_id: 7, task_id: 72 },
            { competition_id: 7, task_id: 54 }
        ], {ignoreDuplicates: true});
        
        const createEventQuery = `
        CREATE EVENT IF NOT EXISTS delete_expired_tokens
        ON SCHEDULE EVERY 10 SECOND
        DO
        DELETE FROM Tokenz
        WHERE expires <= DATE_SUB(NOW(), INTERVAL 1 HOUR) AND type = 'regisztrálás';`;
        
        await sequelize.query(createEventQuery);
        
        const createConfDeleteEventQuery = `
        CREATE EVENT IF NOT EXISTS delete_expired_confirm_tokens
        ON SCHEDULE EVERY 10 SECOND
        DO
        DELETE FROM Tokenz
        WHERE expires <= DATE_SUB(NOW(), INTERVAL 15 MINUTE) AND type = 'beállítások';`;
        
        await sequelize.query(createConfDeleteEventQuery);

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

        const createDailyTaskEventQuery = `
            CREATE EVENT IF NOT EXISTS daily_task_event
            ON SCHEDULE EVERY 1 DAY
            STARTS TIMESTAMP(CURRENT_DATE)
            DO
            BEGIN
                IF DAY(CURRENT_DATE) = 1 THEN
                    DELETE FROM Daily_Tasks;
                END IF;

                IF NOT EXISTS (SELECT 1 FROM Daily_Tasks WHERE id = DAY(CURRENT_DATE)) THEN

                    INSERT INTO Daily_Tasks (id, task_id)
                    SELECT 
                        DAY(CURRENT_DATE) AS id,  -- Az aktuális nap sorszáma
                        (SELECT id FROM Tasks ORDER BY RAND() LIMIT 1) AS task_id; -- Véletlenszerű task kiválasztása
                END IF;
            END;
        `;

        await sequelize.query(createDailyTaskEventQuery);

        const createTokenRedeemDeleteQuery = `
            CREATE EVENT IF NOT EXISTS token_redeem_delete_event
            ON SCHEDULE EVERY 1 DAY
            STARTS TIMESTAMP(CURRENT_DATE)
            DO
            BEGIN

                IF DAY(CURRENT_DATE) = 1 THEN
                    DELETE FROM tokenredeems;
                END IF;
            END;
        `;

        await sequelize.query(createTokenRedeemDeleteQuery);

        const awardedDeleteQuery = `
        CREATE EVENT IF NOT EXISTS awarded_delete_event
        ON SCHEDULE EVERY 1 DAY
        STARTS TIMESTAMP(CURRENT_DATE)
        DO
        BEGIN
            UPDATE Task_solutions 
            SET awarded = NULL
            WHERE awarded = 1;
        END;
        `
       await sequelize.query(awardedDeleteQuery)
    } catch (error) {
        console.error('Error initializing database:', error);
    }
};

initializeDatabase();

module.exports = db;
