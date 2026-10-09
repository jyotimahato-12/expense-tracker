console.log("🔥 expenseRoutes FILE LOADED");
const Expense =require("../models/Expense.js");
const mongoose = require("mongoose");
const addExpense = async(req,res)=>{
    try{

        const {title,amount,category,type,merchant,note,date} = req.body;

        const expense = await Expense.create({
            title,
            amount,
            category,
            type,
            merchant,
            note,
            date,
            user:req.user.id
        });

        res.status(201).json(expense);

    }
    catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};



const deleteExpense = async (req, res) => {
    try {

        const expense = await Expense.findById(req.params.id);

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        // Check if logged-in user owns this expense
        if (expense.user.toString() !== req.user.id.toString()) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        await expense.deleteOne();

        res.status(200).json({
            message: "Expense deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
const getExpenses = async (req, res) => {
  console.log("jii");
  try {
    console.log("User ID:", req.user.id);
    
    // Pass the user filter back into .find() to restrict results
    const expenses = await Expense.find({
      user: req.user.id,
    });
    
    console.log(`Total Expenses count for User ${req.user.id}:`, expenses.length);
    
    res.json({
      success: true,
      count: expenses.length, // Included the count here so you can see it easily!
      expenses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getSummary = async (req, res) => {
  try {
    const start = Date.now();

    const summary = await Expense.aggregate([
  {
    $match: {
      user: new mongoose.Types.ObjectId(req.user.id)
    }
  },
  {
    $group: {
      _id: "$category",
      totalAmount: { $sum: "$amount" },
      count: { $sum: 1 }
    }
  }
]);

    const totalExpenses = summary.reduce(
      (sum, item) => sum + item.totalAmount,
      0
    );

    const highestCategory =
      summary.length > 0
        ? summary.reduce((a, b) =>
            a.totalAmount > b.totalAmount ? a : b
          )
        : null;

    const duration = Date.now() - start;

    res.json({
      totalExpenses,
      totalEntries: summary.reduce((sum, item) => sum + item.count, 0),
      highestCategory: highestCategory?._id || null,
      categoryBreakdown: summary,
      generationTimeMs: duration
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
   addExpense,
   deleteExpense,
   getExpenses,
   getSummary
};