const { verifyToken } = require('../middlewares/VerifyToken');
const Controller = require("../controllers/movie");
const router = require('express').Router();

router.post("/create", verifyToken, Controller.createMovie);
router.put("/update/:id", verifyToken, Controller.updateMovie);
router.delete("/delete/:id", verifyToken, Controller.deleteMovie);
router.get("/:id", Controller.getMovie);
router.get("/random", Controller.randomMovie);
router.get("/", Controller.getAllMovies);

module.exports = router;