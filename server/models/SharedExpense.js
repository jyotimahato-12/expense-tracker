const mongoose =
  require("mongoose");

const sharedExpenseSchema =
  new mongoose.Schema({

    title: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    group: {
      type:
        mongoose.Schema.Types.ObjectId,

      ref: "Group",

      required: true,
    },

    paidBy: {
      type:
        mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,
    },

    splitAmong: [{
      type:
        mongoose.Schema.Types.ObjectId,

      ref: "User",
    }]

}, {
  timestamps: true,
});

module.exports =
  mongoose.model(
    "SharedExpense",
    sharedExpenseSchema
  );