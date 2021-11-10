const User = require("../models/User");
const CryptoJS = require("crypto-js");
class Controller {
  //UPDATE
  async update(req, res, next) {
    if (req.params.id === req.user.id || req.user.isAdmin) {
      if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
          password,
          process.env.SECRET_KEY
        ).toString();
      }
      try {
        const user = await User.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(user);
      } catch (err) {
        res.status(500).json(err);
        next(err);
      }
    } else {
      res.status(403).json("You cant update account");
    }
  }
  //DELETE
  async delete(req, res, next) {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User deleted successfully" });
      } catch (err) {
        res.status(500).json(err);
        next();
      }
    } else {
      res.status(403).json("You cant delete this account");
    }
  }
  //GET USER
  async getUser(req, res, next) {
    try {
      const user = await User.findById(req.params.id);
      !user && res.status(401).json({ message: "User not found" });
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ err });
      next(err);
    }
  }
  //GET ALL
  async getAllUser(req, res, next) {
    try {
      const query = req.query.new;
      const userArray = query
        ? await User.find().sort({ _id: -1 }).limit(10)
        : await User.find();
      !userArray && res.status(401).json({ message: "Users not found" });
      res.status(200).json(userArray);
    } catch (err) {
      res.status(500).json(err);
      next();
    }
  }
  //GET ALL USER STATS
  async getUserStats(req, res, next) {
      try {
        const date = new Date();
        const lastYear = date.setFullYear(date.setFullYear() - 1);
        const month = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
      const data = await User.aggregate([
        {
          $project: 
          {
              month : {
                  $month : "$createdAt"
              },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
      next();
    }
  }
}

module.exports = new Controller();
