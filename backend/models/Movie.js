const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    imageTitle: { type: String },
    imageThumbnail: { type: String },
    Trailer: { type: String },
    Video: { type: String },
    Time: { type: String },
    AgeLimit: { type: Number },
    Genre: { type: String },
    isSeries : { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", MovieSchema);
