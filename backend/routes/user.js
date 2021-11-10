const Controller = require("../controllers/user");
const { verifyToken } = require("../middlewares/VerifyToken");
const router = require('express').Router();

router.put('/update/:id',verifyToken ,Controller.update);
router.delete('/delete/:id', verifyToken ,Controller.delete);
router.get('/find/:id' ,Controller.getUser);
router.get('/', Controller.getAllUser);
router.get('/stats', Controller.getUserStats);

module.exports = router;