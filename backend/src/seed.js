import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

import User from "../src/models/user.model.js";
import { Book } from "../src/models/book.model.js";
import { Order } from "../src/models/order.model.js";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

connectDB().then(async () => {
  console.log("Connected to DB. Seeding...");

  // Optional: Reset database
  // await User.deleteMany();
  // await Book.deleteMany();
  // await Order.deleteMany();

  const hashedPassword = await bcrypt.hash("test1234", 10);

  const admin = await User.create({
    username: "adminUser",
    password: hashedPassword,
    address: "Admin Street, System City",
    email: "admin@example.com",
    role: "admin",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg"
  });

  const user = await User.create({
    username: "johnDoe",
    password: hashedPassword,
    address: "123 Elm Street, New York, NY",
    email: "john@example.com",
    role: "user",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  });

  const books = await Book.insertMany([
    {
      title: "The Alchemist",
      author: "Paulo Coelho",
      price: 299,
      desc: "A philosophical journey of a shepherd pursuing his dreams.",
      language: "English",
      image: "https://res.cloudinary.com/demo/image/upload/v1700000000/book1.jpg"
    },
    {
      title: "1984",
      author: "George Orwell",
      price: 199,
      desc: "A dystopian novel about a totalitarian regime and surveillance.",
      language: "English",
      image: "https://res.cloudinary.com/demo/image/upload/v1700000001/book2.jpg"
    },
    {
      title: "Sapiens",
      author: "Yuval Noah Harari",
      price: 349,
      desc: "A brief history of humankind, exploring evolution and society.",
      language: "English",
      image: "https://res.cloudinary.com/demo/image/upload/v1700000002/book3.jpg"
    },
    {
      title: "Wings of Fire",
      author: "A.P.J. Abdul Kalam",
      price: 150,
      desc: "An autobiography of India's Missile Man, filled with inspiration.",
      language: "English",
      image: "https://res.cloudinary.com/demo/image/upload/v1700000003/book4.jpg"
    },
    {
      title: "Clean Code",
      author: "Robert C. Martin",
      price: 499,
      desc: "A handbook of agile software craftsmanship.",
      language: "English",
      image: "https://res.cloudinary.com/demo/image/upload/v1700000004/book5.jpg"
    }
  ]);

  const order1 = await Order.create({
    user: user._id,
    book: books[0]._id,
    quantity: 2,
    totalPrice: books[0].price * 2,
    address: user.address,
    status: "order placed"
  });

  const order2 = await Order.create({
    user: admin._id,
    book: books[1]._id,
    quantity: 1,
    totalPrice: books[1].price,
    address: admin.address,
    status: "Delivered"
  });

  user.order.push(order1._id);
  user.cart.push(books[2]._id);
  user.favourites.push(books[3]._id);
  await user.save();

  admin.order.push(order2._id);
  admin.cart.push(books[4]._id);
  admin.favourites.push(books[1]._id);
  await admin.save();

  console.log("✅ Seeding complete!");
  process.exit(0); // Exit cleanly
});
