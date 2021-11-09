const express = require("express");

const Book = require("../models/book-model");
const ReadingBooks = require("../models/reading-book");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", async (req, res) => {
  const books = await Book.find();

  res.status(200).json({
    success: true,
    data: books,
  });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const book = await Book.findById(id);

    if (!book) {
      res.status(500).json({
        success: false,
        data: `The book doesn't exists with the id of ${id}`,
      });
    }
    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    res.status(500).send("Server error!");
  }
});

router.post("/", async (req, res) => {
  const body = req.body;
  try {
    const book = new Book(body);
    await book.save();

    res.status(201).json({
      success: true,
      data: "book",
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      data: "500 internal server error.",
    });
  }
});

router.post("/readingBook", authMiddleware, async (req, res) => {
  const isExist = await ReadingBooks.findById(req.body.bookId);
  if (isExist) {
    return res.status(400).json({
      success: false,
      data: "The book already exist in the Reading Lists.",
    });
  }
  const fetchedBook = await Book.findById(req.body.bookId);

  const body = {
    user: req.user._id,
    title: fetchedBook.title,
    author: fetchedBook.author,
    coverImageUrl: fetchedBook.coverImageUrl,
    pageCount: fetchedBook.pageCount,
    publisher: fetchedBook.publisher,
    synopsis: fetchedBook.synopsis,
    _id: fetchedBook._id,
  };

  console.log("fetchedBook ", fetchedBook);

  try {
    const book = new ReadingBooks(body);
    await book.save();

    res.status(201).json({
      success: true,
      data: req.body,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      data: "500 internal server error.",
    });
  }
});

module.exports = router;
