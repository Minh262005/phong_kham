// routes/auth.routes.js
const controller = require("../controllers/auth.controller");
const { verifyToken } = require("../middleware/authJwt");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/patient/login", controller.login);
  app.post("/api/patient/logingoogle", controller.loginWithGoogle);
  app.post("/api/patient/register", require("../controllers/patient.controller").register);
  // app.use(verifyToken); // XÓA DÒNG NÀY hoặc CHỈ ÁP DỤNG CHO ROUTE CẦN BẢO VỆ
  // Ví dụ: app.use('/api/protected', verifyToken);
};