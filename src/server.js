require("dotenv").config();

const mysql = require('mysql2/promise');

(async () => {
  try {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
    await connection.end();
    
    const app = require("./app");
    app.listen(process.env.PORT);
  } catch (error) {
    console.error('Hiba történt:', error);
  }
})();