const CryptoJS = require("crypto-js");
const User = require("../models/User");
const mongoose = require("mongoose");
const { findOne } = require("../models/User");
const jwt = require("jsonwebtoken");

class Controller {
  async register(req, res, next) {
    try {
      const { username, email, password } = req.body;
      //Encrypt
      const ciphertext = CryptoJS.AES.encrypt(
        password,
        process.env.SECRET_KEY
      ).toString();

      const newUser = new User({
        username: username,
        email: email,
        password: ciphertext,
      });
      const user = await newUser.save();
      res.status(200).send(user);
    } catch (err) {
      res.status(500).json(err);
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) {
        res.status(404).json({ message: "User Not found!" });
      } else {
        const fetchedPassword = user.password;
        //DECRYPT
        const bytes = CryptoJS.AES.decrypt(
          fetchedPassword,
          process.env.SECRET_KEY
        );
        const originalPass = bytes.toString(CryptoJS.enc.Utf8);
        if (originalPass === password) {
          const { password, ...info } = user._doc;
          const accessToken = jwt.sign(
            {
              id: user._id,
              isAdmin: user.isAdmin
            },
            process.env.SECRET_KEY
          );
          res
            .status(200)
            .json({ ...info, accessToken, message : "Logged in successfully" });
        } else {
          res.status(404).json({ message: "Incorrect password!" });
        }
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = new Controller();
