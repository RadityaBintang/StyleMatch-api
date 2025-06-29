const mysql = require('mysql2/promise');
require('dotenv').config(); 

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.getConnection()
  .then(connection => {
    console.log(' Connected to database successfully!');
    connection.release();
  })
  .catch(err => {
    console.error(' Failed to connect to database:', err.message);
    process.exit(1); 
  });

module.exports = pool;