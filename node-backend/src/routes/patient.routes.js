module.exports = app => {
  const patient = require("../controllers/patient.controller.js");
  const db = require("../models");
  console.log("patient.routes.js loaded");
  app.post("/patient/register", async (req, res, next) => {
    try {
      await patient.register(req, res);
    } catch (err) {
      next(err);
    }
  });
  app.get("/patient/list", async (req, res, next) => {
    try {
      await patient.getAllPatients(req, res);
    } catch (err) {
      next(err);
    }
  });
  app.post("/patient/login", async (req, res, next) => {
    try {
      await patient.login(req, res);
    } catch (err) {
      next(err);
    }
  });
  app.post("/patient/logingoogle", async (req, res, next) => {
    console.log("=== ĐÃ VÀO ROUTE /patient/logingoogle ===");
    try {
      await patient.loginWithGoogle(req, res);
    } catch (err) {
      next(err);
    }
  });
  app.get("/location/list", async (req, res, next) => {
    try {
      const locations = await db.location.findAll();
      res.status(200).send(locations);
    } catch (err) {
      next(err);
    }
  });
  app.get("/symptom/list", async (req, res, next) => {
    try {
      const symptoms = await db.symptom.findAll();
      res.status(200).send(symptoms);
    } catch (err) {
      next(err);
    }
  });
  app.get("/spec/list", async (req, res, next) => {
    try {
      const specs = await db.specialty.findAll();
      res.status(200).send(specs);
    } catch (err) {
      next(err);
    }
  });
  app.get("/schedule/list", async (req, res, next) => {
    try {
      const schedules = await db.schedule.findAll();
      res.status(200).send(schedules);
    } catch (err) {
      next(err);
    }
  });
  app.get("/news/random", async (req, res, next) => {
    try {
      const count = await db.news.count();
      if (count === 0) return res.status(200).send(null);
      const randomIndex = Math.floor(Math.random() * count);
      const news = await db.news.findOne({ offset: randomIndex });
      res.status(200).send(news);
    } catch (err) {
      next(err);
    }
  });
  app.get("/api/internal-accounts/search-email", async (req, res, next) => {
    try {
      const { email } = req.query;
      if (!email) return res.status(400).send({ message: "Missing email" });
      const user = await db.user.findOne({ where: { email } });
      if (!user) return res.status(404).send({ message: "User not found" });
      res.status(200).send(user);
    } catch (err) {
      next(err);
    }
  });
  app.get("/users/getUserInfo", async (req, res, next) => {
    try {
      const { email } = req.query;
      if (!email) return res.status(400).send({ message: "Missing email" });
      const user = await db.user.findOne({ where: { email } });
      if (!user) return res.status(404).send({ message: "User not found" });
      res.status(200).send(user);
    } catch (err) {
      next(err);
    }
  });
};