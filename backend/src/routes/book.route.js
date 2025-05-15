import express from "express";
import upload from "../middlewares/multer.middleware.js"
import { 
  createBook, 
  getAllBooks, 
  getBookById, 
  updateBook, 
  deleteBook, 
  getRecentBooks
} from "../controllers/book.controller.js";
import auth from "../middlewares/auth.middleware.js"
import {adminMiddleware} from "../middlewares/adminMiddleware.js"

const router = express.Router();

// Public routes - anyone can view books
router.get("/books", getAllBooks);
router.get("/get-recent-books", getRecentBooks);
router.get("/book/:bookId", getBookById);

// Admin only routes - require authentication AND admin role
router.post("/create-book", auth, adminMiddleware, upload.single("image"), createBook);

router.put("/update-book", auth, adminMiddleware, upload.single("image"),updateBook);
router.delete("/delete-book/:bookId", auth, adminMiddleware, deleteBook);

export default router;