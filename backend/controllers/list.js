const List = require("../models/List");

class Controller {
  //CREATE LIST
  async createList(req, res, next) {
    if (req.user.isAdmin) {
      const newList = new List(req.body);
      try {
        const list = await newList.save();
        res.status(200).json(list);
      } catch (err) {
        res.status(500).json(err);
        next();
      }
    } else {
      res.status(403).json({ message: "You are not authorized" });
    }
  }

  //DELETE LIST
  async deleteList(req, res, next) {
    if (req.user.isAdmin) {
      try {
        await List.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "List deleted successfully" });
      } catch (err) {
        res.status(500).json(err);
        next();
      }
    } else {
      res.status(403).json({ message: "You are not authorized" });
    }
  }

  //GET LIST
  async getList(req, res, next) {
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    let list = [];
    try {
      if (typeQuery) {
        if (genreQuery) {
          list = await List.aggregate([
            { $sample: { size: 10 } },
            { $match: { type: typeQuery, genre: genreQuery } },
          ]);
        } else {
          list = await List.aggregate([
            { $sample: { size: 10 } },
            { $match: { type: typeQuery } },
          ]);
        }
      } else {
        list = await List.aggregate([{ $sample: { size: 10 } }]);
      }
      res.status(200).json(list);
    } catch (err) {
      res.status(500).json(err);
      next();
    }
  }
}

module.exports = new Controller();
