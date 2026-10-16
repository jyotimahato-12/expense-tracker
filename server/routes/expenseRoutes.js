const express = require("express");

const  {addExpense,deleteExpense,getExpenses,getSummary,updateExpense} =require("../controllers/expenseController.js");

const protect =require("../middleware/authMiddleware.js");

const router = express.Router();
router.get("/",protect,getExpenses);
router.post("/add", protect, addExpense);
router.delete("/delete/:id", protect, deleteExpense);
router.get("/summary",protect,getSummary);

router.put("/update/:id", protect, updateExpense);

module.exports = router;