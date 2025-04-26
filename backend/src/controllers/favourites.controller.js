// favourites.controller.js
import User from "../models/user.model.js";
import { Book } from "../models/book.model.js";

// Add book to favorites
export const addBookToFavourite = async (req, res) => {
  try {
    const { bookId, id } = req.headers;
    
    // Validate bookId
    if (!bookId) {
      return res.status(400).json({ message: "Book ID is required" });
    }
    
    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    
    // Get user data
    const userData = await User.findById(id);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Check if book is already in favorites
    const isBookFavourite = userData.favourites.includes(bookId);
    if (isBookFavourite) {
      return res.status(200).json({ message: "Book is already in favourites" });
    }
    
    // Add book to favorites using $push operator
    await User.findByIdAndUpdate(id, { $push: { favourites: bookId } });
    
    return res.status(200).json({ message: "Book added to favourites" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Remove book from favorites
export const removeFromFavourites = async (req, res) => {
  try {
    const { bookId, id } = req.headers;
    
    // Validate bookId
    if (!bookId) {
      return res.status(400).json({ message: "Book ID is required" });
    }
    
    // Get user data
    const userData = await User.findById(id);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Check if book is in favorites
    const isBookFavourite = userData.favourites.includes(bookId);
    if (!isBookFavourite) {
      return res.status(200).json({ message: "Book is not in favourites" });
    }
    
    // Remove book from favorites using $pull operator
    await User.findByIdAndUpdate(id, { $pull: { favourites: bookId } });
    
    return res.status(200).json({ message: "Book removed from favourites" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get user's favorites
export const getUserFavourites = async (req, res) => {
  try {
    const { id } = req.headers;
    
    // Get user data with populated favorites
    const userData = await User.findById(id).populate('favourites');
    
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    
    return res.status(200).json({ 
      favourites: userData.favourites,
      count: userData.favourites.length
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};