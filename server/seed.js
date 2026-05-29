const mongoose = require("mongoose");

const Merchant = require("./models/Merchant");

mongoose
  .connect("mongodb://127.0.0.1:27017/issuesDB")
  .then(() => console.log("DB Connected"));

async function seed() {

  await Merchant.insertMany([

    // FOOD
    {
      name: "dominos",
      category: "Food",
      aliases: [
        "dominos pizza",
        "domino's",
        "pizza shop"
      ]
    },

    {
      name: "pizza",
      category: "Food",
      aliases: [
        "pizza hut",
        "cheese pizza",
        "pepperoni"
      ]
    },

    {
      name: "swiggy",
      category: "Food",
      aliases: [
        "food delivery",
        "swiggy order",
        "online food"
      ]
    },

    {
      name: "zomato",
      category: "Food",
      aliases: [
        "zomato order",
        "restaurant order",
        "food app"
      ]
    },

    {
      name: "mcdonalds",
      category: "Food",
      aliases: [
        "mc donalds",
        "mcd",
        "big mac"
      ]
    },

    {
      name: "kfc",
      category: "Food",
      aliases: [
        "kentucky fried chicken",
        "fried chicken",
        "chicken bucket"
      ]
    },

    {
      name: "burgerking",
      category: "Food",
      aliases: [
        "burger king",
        "whopper",
        "burger meal"
      ]
    },

    // TRAVEL
    {
      name: "uber",
      category: "Travel",
      aliases: [
        "uber cab",
        "uber ride",
        "taxi"
      ]
    },

    {
      name: "ola",
      category: "Travel",
      aliases: [
        "ola cab",
        "ola ride",
        "cab booking"
      ]
    },

    {
      name: "rapido",
      category: "Travel",
      aliases: [
        "bike taxi",
        "rapido ride",
        "bike ride"
      ]
    },

    {
      name: "taxi",
      category: "Travel",
      aliases: [
        "cab",
        "local taxi",
        "ride"
      ]
    },

    {
      name: "metro",
      category: "Travel",
      aliases: [
        "subway",
        "train ride",
        "metro train"
      ]
    },

    // SHOPPING
    {
      name: "amazon",
      category: "Shopping",
      aliases: [
        "amazon india",
        "online shopping",
        "amazon order"
      ]
    },

    {
      name: "flipkart",
      category: "Shopping",
      aliases: [
        "flipkart order",
        "shopping app",
        "online order"
      ]
    },

    {
      name: "myntra",
      category: "Shopping",
      aliases: [
        "fashion shopping",
        "clothing app",
        "myntra order"
      ]
    },

    {
      name: "ajio",
      category: "Shopping",
      aliases: [
        "ajio fashion",
        "clothes shopping",
        "fashion order"
      ]
    },

    // BILLS
    {
      name: "electricity",
      category: "Bills",
      aliases: [
        "electric bill",
        "power bill",
        "electricity payment"
      ]
    },

    {
      name: "water",
      category: "Bills",
      aliases: [
        "water bill",
        "water payment",
        "utility bill"
      ]
    },

    {
      name: "wifi",
      category: "Bills",
      aliases: [
        "internet",
        "broadband",
        "wifi recharge"
      ]
    },

    {
      name: "recharge",
      category: "Bills",
      aliases: [
        "mobile recharge",
        "phone recharge",
        "prepaid recharge"
      ]
    },

    // ENTERTAINMENT
    {
      name: "netflix",
      category: "Entertainment",
      aliases: [
        "movie streaming",
        "series",
        "ott"
      ]
    },

    {
      name: "spotify",
      category: "Entertainment",
      aliases: [
        "music app",
        "songs",
        "podcast"
      ]
    },

    {
      name: "movie",
      category: "Entertainment",
      aliases: [
        "cinema",
        "film",
        "movie tickets"
      ]
    },

    // HEALTH
    {
      name: "hospital",
      category: "Health",
      aliases: [
        "clinic",
        "medical center",
        "healthcare"
      ]
    },

    {
      name: "medicine",
      category: "Health",
      aliases: [
        "medicines",
        "tablets",
        "drugs"
      ]
    },

    {
      name: "pharmacy",
      category: "Health",
      aliases: [
        "medical store",
        "chemist",
        "drug store"
      ]
    }

  ]);

  console.log("Merchants Seeded");

  mongoose.connection.close();
}

seed();