const express = require("express");

const  {addExpense,deleteExpense,getExpenses,getSummary} =require("../Controllers/expenseController.js");

const protect =require("../middleware/authMiddleware.js");

const router = express.Router();
router.get("/",protect,getExpenses);
router.post("/add", protect, addExpense);
router.delete("/delete/:id", protect, deleteExpense);
router.get("/summary",protect,getSummary);

module.exports = router;