import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 px-6 md:px-20 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-blue-400">About Book Store</h1>

        <p className="text-lg mb-4">
          <strong>Book Store</strong> is an all-in-one platform designed for book lovers. Whether you’re a passionate reader or a seller, Book Store provides an easy and modern way to <span className="font-semibold text-blue-300">explore, order, and add books</span>.
        </p>

        <p className="text-lg mb-4">
          We’re on a mission to bring the literary world closer to everyone — by offering a space where users can browse thousands of books, order with a few clicks, and even upload their own books to the marketplace.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">What You Can Do</h2>
        <ul className="list-disc list-inside text-lg space-y-2">
          <li>🛒 Browse and order books with ease</li>
          <li>📚 Add your own books to the store</li>
          <li>🔎 Discover new titles through categories and search</li>
          <li>💼 Admin panel for managing books and users</li>
          <li>📦 Track orders and manage your collection</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Why Choose Us?</h2>
        <p className="text-lg mb-4">
          We combine speed, simplicity, and community. Whether you're buying your next favorite book or helping others discover your work — <strong>Book Store</strong> makes it effortless and enjoyable.
        </p>

        <p className="text-lg mt-6">
          Thank you for being a part of our growing reading community. At <strong>Book Store</strong>, we believe that every book has a reader — and every reader deserves the right book.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
