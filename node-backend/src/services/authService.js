const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.register = async (email, password) => {
  try {
    console.log('Register input:', email, password);
    // 1. Kiểm tra email đã tồn tại chưa
    const [rows] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (rows.length > 0) {
      console.log('Email already exists:', email);
      return { success: false, message: 'Email already exists' };
    }
    // 2. Mã hóa mật khẩu
    const hash = await bcrypt.hash(password, 10);
    // 3. Lưu user mới vào MySQL
    const [result] = await pool.query(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [email, hash]
    );
    console.log('User registered, id:', result.insertId);
    // 4. Trả về kết quả thành công
    return { success: true, user: { id: result.insertId, email } };
  } catch (error) {
    console.error('Register error:', error);
    return { success: false, message: 'Server error: ' + error.message };
  }
};

exports.login = async (email, password) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  if (rows.length === 0) return null;
  const user = rows[0];
  const match = await bcrypt.compare(password, user.password);
  if (!match) return null;
  // Sinh JWT
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
  return token;
}; 