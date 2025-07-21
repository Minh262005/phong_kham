const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Example route
app.get('/', (req, res) => {
  res.send('Node.js backend is running!');
});

const authRoutes = require('./routes/auth');
app.use('/api/v1', authRoutes);

// TODO: Import và sử dụng các route khác ở đây

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 