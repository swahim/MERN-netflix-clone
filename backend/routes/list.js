const { verifyToken } = require("../middlewares/VerifyToken");
const Controller = require("../controllers/list");
const router = require("express").Router();

router.post("/create", verifyToken, Controller.createList);
router.delete("/delete/:id", verifyToken, Controller.deleteList);
router.get("/getlist", Controller.getList);
module.exports = router;
