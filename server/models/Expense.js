const mongoose =require("mongoose");

const expenseSchema = new mongoose.Schema(
{
    title:{
        type:String,
        required:true
    },

    amount:{
        type:Number,
        required:true
    },

     type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },

    category:{
        type:String,
        required:true
    },
      merchant: {
      type: String,
      default: "Unknown",
    },
    note: {
      type: String,
    },

    date:{
        type:Date,
        default:Date.now
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    
},
{
    timestamps:true
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;