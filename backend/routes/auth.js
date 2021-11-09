const Controller = require("../controllers/auth");
const router = require("express").Router();

//REGISTER routes
router.post("/register", Controller.register);
router.post("/login", Controller.login);

module.exports = router;
