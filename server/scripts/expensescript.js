const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Expense = require("../models/Expense");
const User = require("../models/User");

const categories = [
  "food",
  "transport",
  "entertainment",
  "shopping",
  "utilities",
  "health",
  "other"
];

const data = [];

async function seed() {
  await mongoose.connect("mongodb://127.0.0.1:27017/issuesDB");

  const hashedPassword = await bcrypt.hash("123456", 10);

  const user = await User.create({
    name: "Test User",
    email: "test@example.com",
    password: hashedPassword
  });

  const userId = user._id;

  for (let i = 0; i < 1000; i++) {
    data.push({
      title: `Expense ${i}`,
      amount: Math.random() * 5000,
      type: "expense",
      category: categories[i % categories.length],
      user: userId,
    });
  }

  await Expense.insertMany(data);

  console.log("1000 expenses inserted");

  await mongoose.disconnect();
}

seed();