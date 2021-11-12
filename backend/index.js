const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const AuthRouter = require("./routes/auth");
const MovieRouter = require("./routes/movie");
const UserRouter = require("./routes/user");
const ListRouter = require("./routes/list");
const cors = require("cors");
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology : true
  })
  .then(() => {
    console.log("DB connection established");
  })
  .catch((err) => console.log(err));

const port = process.env.PORT || 8000;

//MIDDLEWARES
app.use(cors());
app.use(express.json());

//NORMAL ROUTES
app.use("/api/auth", AuthRouter);
app.use("/user", UserRouter);
app.use("/movie", MovieRouter);
app.use("/list", ListRouter);


app.listen(port, () => {
  console.log("Server is listening on port " + port);
});
