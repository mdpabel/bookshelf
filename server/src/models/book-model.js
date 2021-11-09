const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  author: {
    type: String,
  },
  coverImageUrl: {
    type: String,
  },
  pageCount: {
    type: Number,
  },
  publisher: {
    type: String,
  },
  synopsis: {
    type: String,
  },
});

module.exports = mongoose.model("Books", bookSchema);
