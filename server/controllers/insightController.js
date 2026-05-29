const Transaction=require("../models/Expense.js")
const  {generateInsights} =require("../services/insightEngine.js");
const User =require("../models/User.js");
const Transaction =
  require("../models/Expense.js");

const {
  generateInsights
} = require("../services/insightEngine.js");

const {
  generateAISummary
} = require("../services/aiInsights.js");

const User =
  require("../models/User.js");



const getInsights =
  async (req, res) => {

  try {

    const transactions =
      await Transaction.find({
        user: req.user.id,
      });

    const user =
      await User.findById(req.user.id);

    const budget =
      user.monthlyBudget;

    const insights =
      generateInsights(
        transactions,
        budget
      );

    // AI summary
    const aiSummary =
      await generateAISummary(
        insights
      );

    res.json({
      insights,
      aiSummary,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = getInsights;
module.exports=getInsights;