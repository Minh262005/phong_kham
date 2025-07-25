require('dotenv').config();
const express = require("express");
const cors = require("cors");
const db = require("./models");
const dbConfig = require("./config/db");

const app = express();

// Cấu hình CORS cho phép frontend truy cập backend
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

app.use((req, res, next) => {
  console.log("REQUEST:", req.method, req.url);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
require('./routes/auth.routes')(app);
require('./routes/patient.routes')(app);

// Database connection
db.sequelize.sync()
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((err) => {
    console.log("Failed to sync database: " + err.message);
  });

const PORT = 9999;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});