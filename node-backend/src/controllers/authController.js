const authService = require('../services/authService');
const pool = require('../config/db');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    if (!token) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.register(email, password);
    if (!result.success) {
      return res.status(400).json({ message: result.message });
    }
    res.json({ message: 'Register success', user: result.user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}; 