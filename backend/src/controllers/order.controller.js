// order.controller.js
import User from "../models/user.model.js";
import { Book } from "../models/book.model.js";
import { Order } from "../models/order.model.js";

// Place an order
export const placeOrder = async (req, res) => {
  try {
    const { id } = req.headers;
    const { order } = req.body;
    
    // Validate user
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Process each book in the order
    for (const orderData of order) {
      // Get book to verify it exists and get price
      const book = await Book.findById(orderData._id);
      if (!book) {
        return res.status(404).json({ message: `Book with ID ${orderData._id} not found` });
      }

      // Calculate total price based on quantity
      const totalPrice = book.price * (orderData.quantity || 1);
      
      // Create new order
      const newOrder = new Order({
        user: id,
        book: orderData._id,
        quantity: orderData.quantity || 1,
        totalPrice: totalPrice,
        address: user.address, // Using user's default address
        status: "order placed"
      });
      
      // Save order to database
      const orderDataFromDb = await newOrder.save();
      
      // Add order to user's orders array
      await User.findByIdAndUpdate(id, {
        $push: { order: orderDataFromDb._id },
      });
      
      // Remove book from user's cart
      await User.findByIdAndUpdate(id, {
        $pull: { cart: orderData._id },
      });
    }
    
    return res.json({
      status: "Success",
      message: "Order Placed Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
};

// Get user's orders
export const getUserOrders = async (req, res) => {
  try {
    const { id } = req.headers;
    
    // Find user and populate orders with book details
    const user = await User.findById(id)
      .populate({
        path: 'order',
        populate: {
          path: 'book',
          model: 'Book'
        }
      });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    return res.json({
      status: "Success",
      orders: user.order
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
};

// Get order details for admin
export const getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;
    
    // Find order and populate user and book details
    const order = await Order.find()
      .populate('user', '-password')
      .populate('book').sort({createdAt:-1});
    
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    
    return res.json({
      status: "Success",
      order
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
};

// Update order status (admin only)
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    
    // Validate status
    const validStatuses = ["order placed", "out for delivery", "Delivered", "cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid order status" });
    }
    
    // Update order status
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    ).populate('book');
    
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    
    return res.json({
      status: "Success",
      message: `Order status updated to ${status}`,
      order: updatedOrder
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
};