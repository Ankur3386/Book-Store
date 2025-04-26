// cart.controller.js
import User from "../models/user.model.js";
import { Book } from "../models/book.model.js";

// Add book to cart
export const addToCart = async (req, res) => {
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
    
    // Check if book is already in cart
    const isBookInCart = userData.cart.includes(bookId);
    if (isBookInCart) {
      return res.json({
        status: "Success",
        message: "Book is already in cart",
      });
    }
    
    // Add book to cart using $push operator
    await User.findByIdAndUpdate(id, { $push: { cart: bookId } });
    
    return res.json({
      status: "Success",
      message: "Book added to cart",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
};

// Remove book from cart
export const removeFromCart = async (req, res) => {
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
    
    // Check if book is in cart
    const isBookInCart = userData.cart.includes(bookId);
    if (!isBookInCart) {
      return res.status(400).json({ message: "Book is not in cart" });
    }
    
    // Remove book from cart using $pull operator
    await User.findByIdAndUpdate(id, { $pull: { cart: bookId } });
    
    return res.json({
      status: "Success",
      message: "Book removed from cart",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
};

// Get user's cart
export const getCart = async (req, res) => {
  try {
    const { id } = req.headers;
    
    // Get user data with populated cart
    const userData = await User.findById(id).populate('cart');
    
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Calculate total price of all items in cart
    const totalPrice = userData.cart.reduce((sum, book) => sum + book.price, 0);
    
    return res.json({
      status: "Success",
      cart: userData.cart,
      totalItems: userData.cart.length,
      totalPrice
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
};

// Clear cart
export const clearCart = async (req, res) => {
  try {
    const { id } = req.headers;
    
    // Get user data
    const userData = await User.findById(id);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Clear cart by setting to empty array
    await User.findByIdAndUpdate(id, { cart: [] });
    
    return res.json({
      status: "Success",
      message: "Cart cleared successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
};