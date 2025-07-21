const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',      // hoặc IP MySQL server
  user: 'root',           // user MySQL
  password: 'admin', // password MySQL
  database: 'clinic_db', // tên database đã tạo
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
