
const Expense =require("../models/Expense.js");

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
module.exports = {
   addExpense,
   deleteExpense
};