const express = require("express");
const router = express.Router(); //used express to create route handlers
//import controllers
const bookControllers = require("../controllers/bookControllers");

//Book API's
router.post("/api/books", bookControllers.createBook);
router.get("/api/books", bookControllers.getBook);
router.get("/api/books/:id", bookControllers.getBookById);
router.get("/api/genre/books", bookControllers.getBookByGenre);
router.put("/api/books/:id", bookControllers.updateBook);
router.delete("/api/books/:id", bookControllers.deleteBook);


module.exports = router;
