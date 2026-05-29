const express = require("express");

const  {addExpense,deleteExpense} =require("../controllers/expenseController.js");

const protect =require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/add", protect, addExpense);
router.delete("/delete/:id", protect, deleteExpense);

module.exports = router;