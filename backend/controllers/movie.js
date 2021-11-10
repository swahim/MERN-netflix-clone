const Movie = require("../models/Movie");

class Controller {
  //CREATE MOVIES
  async createMovie(req, res, next) {
    if (req.user.isAdmin) {
      const newMovie = new Movie(req.body);
      try {
        const movie = await newMovie.save();
        res.status(200).json(movie);
      } catch (err) {
        res.status(500).json(err);
        next();
      }
    } else {
      res.status(403).json({ message: "You are not authorized" });
    }
  }

  //UPDATE MOVIES
  async updateMovie(req, res, next) {
    if (req.user.isAdmin) {
      try {
        const updatedMovie = await Movie.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updatedMovie);
      } catch (err) {
        res.status(500).json(err);
        next();
      }
    } else {
      res.status(403).json({ message: "You are not authorized" });
    }
  }

  //DELETE MOVIES
  async deleteMovie(req, res, next) {
    if (req.user.isAdmin) {
      try {
        await Movie.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Movie deleted successfully" });
      } catch (err) {
        res.status(500).json(err);
        next();
      }
    } else {
      res.status(403).json({ message: "You are not authorized" });
    }
  }

  //GET MOVIE
  async getMovie(req, res, next) {
    try {
      const movie = await Movie.findById(req.params.id);
      res.status(200).json(movie);
    } catch (err) {
      res.status(500).json(err);
      next();
    }
  }

  //RANDOM MOVIES
  async randomMovie(req, res, next) {
    try {
      const type = req.query.type;
      let movie;
      if (type === "series") {
        movie = await Movie.aggregate([
          { $match: { isSeries: true } },
          { $sample: { size: 1 } },
        ]);
      } else {
        movie = await Movie.aggregate([
          { $match: { isSeries: false } },
          { $sample: { size: 1 } },
        ]);
      }
      console.log(movie);
      res.status(200).json(movie);
    } catch (err) {
      res.status(500).json(err);
      next();
    }
  }

  //GET ALL MOVIES
  async getAllMovies(req, res, next) {
      try{
        const movies = await Movie.find();
        res.status(200).json(movies);
      }catch{
          res.status(500).json(err);
          next();
      }
  }
}

module.exports = new Controller();
