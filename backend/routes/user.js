const Controller = require("../controllers/user");
const { verifyToken } = require("../middlewares/VerifyToken");
const router = require('express').Router();

router.put('/update/:id',verifyToken ,Controller.update);

module.exports = router;