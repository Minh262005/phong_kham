const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = db.user;
const { OAuth2Client } = require('google-auth-library');
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "473360203491-9ocehvmftucan3f1ad1b4ja7ma29cj4c.apps.googleusercontent.com";
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

exports.register = async (req, res) => {
  try {
    console.log("Dữ liệu nhận được từ client:", req.body); // Log dữ liệu gửi lên

    const { PAINTED_ID, Name, Email, PASSWORD, BIRTHDATE } = req.body;

    // Kiểm tra email đã tồn tại chưa
    const existingUser = await User.findOne({ where: { email: Email } });
    if (existingUser) {
      return res.status(400).send({ message: "Email đã tồn tại!" });
    }

    // Tạo user mới
    const user = await User.create({
      displayName: Name,
      email: Email,
      password: bcrypt.hashSync(PASSWORD, 8),
      role: "patient",
      birthdate: BIRTHDATE,
      paintedId: PAINTED_ID
    });

    res.status(201).send({ message: "Đăng ký thành công!", user });
  } catch (error) {
    console.error("Lỗi khi đăng ký:", error); // Log lỗi chi tiết
    res.status(500).send({ message: error.message });
  }
};

exports.getAllPatients = async (req, res) => {
  try {
    const patients = await User.findAll({ where: { role: "patient" } });
    res.status(200).send(patients);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email, role: "patient" } });
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid Password!" });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 86400
    });
    res.status(200).send({
      token,
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.loginWithGoogle = async (req, res) => {
  try {
    const { idToken } = req.body;
    console.log("Received idToken:", idToken);
    const ticket = await client.verifyIdToken({
      idToken,
      audience: GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    console.log("Google payload:", payload);
    const email = payload.email;
    const displayName = payload.name;
    let user = await User.findOne({ where: { email, role: "patient" } });
    if (!user) {
      user = await User.create({
        email,
        displayName,
        role: "patient",
        password: bcrypt.hashSync(Math.random().toString(36), 8)
      });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 86400
    });
    res.status(200).send({
      token,
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Google login error:", error);
    console.error("idToken gây lỗi:", req.body.idToken);
    // Nếu lỗi xác thực token Google, trả về 403 kèm message rõ ràng
    if (
      error.message &&
      (error.message.includes("Wrong number of segments in token") ||
        error.message.includes("No audience provided to verify") ||
        error.message.includes("invalid_token") ||
        error.message.includes("Token used too late") ||
        error.message.includes("Token used too early") ||
        error.message.includes("audience") ||
        error.message.includes("Invalid token"))
    ) {
      return res.status(403).send({ message: "Invalid Google token: " + error.message });
    }
    res.status(500).send({ message: error.message });
  }
};