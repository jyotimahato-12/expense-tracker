// models/Merchant.js

const mongoose = require("mongoose");

const merchantSchema = new mongoose.Schema({
  name: String,
  category: String,
  aliases: [String]
});

module.exports = mongoose.model("Merchant", merchantSchema);