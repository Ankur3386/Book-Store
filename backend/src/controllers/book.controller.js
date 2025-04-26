

// book.controller.js
import { Book } from "../models/book.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
 

export const createBook = async (req, res) => {
  try {
    const { title, author, price, desc, language } = req.body;

    if (!title || !author || !price || !desc || !language) {
      return res.status(400).json({ message: "All fields except image are required" });
    }

    let image;

    if (req.file) {
      const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
      if (!cloudinaryResponse || !cloudinaryResponse.url) {
        return res.status(500).json({ message: "Image upload failed" });
      }
      console.log("Heloo",cloudinaryResponse);
      image = cloudinaryResponse.url;
    }

    const newBook = await Book.create({
      title,
      author,
      price,
      desc,
      language,
      image,
    });

    res.status(201).json({
      success: true,
      book: newBook,
      message: "Book created successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred" });
  }
};


export const getAllBooks = async (req, res) => {
    try {
      const books = await Book.find().sort({ createdAt: -1 });
      
      res.status(200).json({
        success: true,
        count: books.length,
        books
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "An error occurred" });
    }
  };
export const getRecentBooks = async (req, res) => {
    try {
      const books = await Book.find().sort({ createdAt: -1 }).limit(4);
      
      res.status(200).json({
        success: true,
        count: books.length,
        books
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "An error occurred" });
    }
  };

  export const getBookById = async (req, res) => {
    try {
      const { bookId } = req.params;
      
      const book = await Book.findById(bookId);
      
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      
      res.status(200).json({
        success: true,
        book
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "An error occurred" });
    }
  };

// Update book
export const updateBook = async (req, res) => {
  try {
    const { bookId } = req.headers;
    const { title, author, price, desc, language } = req.body;
    
    await Book.findByIdAndUpdate(bookId, {
      title,
      author,
      price,
      desc,
      language,
    });
    
    return res.status(200).json({
      message: "Book Updated successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
};
// Delete book
export const deleteBook = async (req, res) => {
    try {
      const { bookId } = req.params;
      
      const book = await Book.findByIdAndDelete(bookId);
      
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      
      res.status(200).json({
        success: true,
        message: "Book deleted successfully"
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "An error occurred" });
    }
  };
