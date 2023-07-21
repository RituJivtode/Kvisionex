const mongoose = require("mongoose");

//structure of document
const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    genre: { type: String, trim: true },
    price: { type: Number, required: true, trim: true },
    rating: { type: Number, required: true, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("books", bookSchema);
//model will create document using above structure of document
