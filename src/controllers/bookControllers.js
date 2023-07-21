const bookModel = require("../models/bookModel");
const mongoose = require("mongoose");

const createBook = async function (req, res) {
  try {
    //reading input from request body
    let Body = req.body;
    let arr = Object.keys(Body);

    //if empty request body
    if (arr.length == 0) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide input" });
    }
    //mandatory fields
    if (!Body.title) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide title" });
    }
    if (!Body.author) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide author" });
    }
    if (!Body.price) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide price" });
    }
    if (!Body.rating) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide rating" });
    }

    //book created
    let bookCreated = await bookModel.create(Body);
    res
      .status(201)
      .send({ status: true, message: "success", data: bookCreated });
  } catch (err) {
    res.status(500).send({
      status: false,
      Error: "Server not responding",
      msg: err.message,
    });
  }
};

const getBook = async function (req, res) {
  try {
  
      let findBook = await bookModel.find({ })
      if(!findBook){
        return res.status(404).send({ status: false, data: "No book found" });
      }

      //respond with filtered books
      return res.status(200).send({ status: true, data: findBook });
  } catch (err) {
    res.status(500).send({
      status: false,
      Error: "Server not responding",
      message: err.message,
    });
  }
};

const getBookById = async function (req, res) {
  try {
    //reading bookid from path
    const _id = req.params.id;

    //id format validation
    if (_id) {
      if (mongoose.Types.ObjectId.isValid(_id) == false) {
        return res
          .status(400)
          .send({ status: false, message: "Invalid bookId" });
      }
    }

    //fetch book with bookId
    const book = await bookModel.findOne({ _id })

    //no books found
    if (!book) {
      return res.status(404).send({ status: true, data: "book not found" });
    }

    //respond book with reviews
    res.status(200).send({ status: true, data: book });
  } catch (err) {
    res.status(500).send({
      status: false,
      Error: "Server not responding",
      msg: err.message,
    });
  }
};

const getBookByGenre = async function (req, res) {
  try {
    //reading bookid from path
    let genre = req.query.genre
    let page = parseInt(req.query.page) || 1;
    let itemsPerPage = parseInt(req.query.itemsPerPage) || 5

    console.log(page)

    if (!genre) {
      return res.status(400).send({ status: false, message: "Please provide genre" });
    }

    const totalBooks = await bookModel.countDocuments({ genre: genre });
    const totalPages = Math.ceil(totalBooks / itemsPerPage);

    const getBookGenre = await bookModel
      .find({ genre: genre })
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage);

    if (getBookGenre.length === 0) {
      return res.status(404).send({ status: false, data: "No books found for given genre" });
    }
    res.status(200).send({
      status: true,
      currentPage: page,
      totalPages: totalPages,
      totalBooks: totalBooks,
      data: getBookGenre,
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      Error: "Server not responding",
      msg: err.message,
    });
  }
};

const updateBook = async function (req, res) {
  try {
    //reading bookid from path
    const _id = req.params.id;

    //id format validation
    if (_id) {
      if (mongoose.Types.ObjectId.isValid(_id) == false) {
        return res
          .status(400)
          .send({ status: false, message: "Invalid bookId" });
      }
    }

    //fetch book using bookId
    const book = await bookModel.findOne({ _id });
    if (!book) {
      return res.status(404).send({ status: true, data: "book not found" });
    }

    //reading updates from body
    const updates = req.body;
    const { title, author, genre, price, rating } = updates; //destructuring

    //fetch and update book
    const updatedBook = await bookModel.findByIdAndUpdate(
      { _id },
      { $set: updates },
      { new: true }
    );
    res.status(200).send({ status: true, data: updatedBook });
  } catch (err) {
    res.status(500).send({
      status: false,
      Error: "Server not responding",
      msg: err.message,
    });
  }
};

const deleteBook = async function (req, res) {
  try {
    //reading bookId from path
    const BookId = req.params.id;
    console.log(BookId)

    //id format validation
    if (BookId) {
      if (mongoose.Types.ObjectId.isValid(BookId) == false) {
        return res
          .status(400)
          .send({ status: false, message: "Invalid bookId" });
      }
    }

    //fetch book
    const book = await bookModel.findById({ _id: BookId });
    console.log(book)

    //no book found
    if (!book) {
      return res.status(404).send({ status: false, data: "book not found" });
    }
    await bookModel.deleteOne({ _id: BookId });
    res.status(200).send({ status: true, msg: "Document for given book Id is deleted." });
  } catch (err) {
    res.status(500).send({
      status: false,
      Error: "Server not responding",
      msg: err.message,
    });
  }
};

//used destructuring to export all function
module.exports = {
  createBook,
  getBook,
  getBookById,
  getBookByGenre,
  updateBook,
  deleteBook,
};
