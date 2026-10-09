const Transaction=require("../models/Expense.js")
const  {generateInsights} =require("../services/insightEngine.js");
const User =require("../models/User.js");
const {
  generateAISummary
} = require("../services/aiInsights.js");





const getInsights = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const budget = user.monthlyBudget;

    const transactions = await Transaction.find({
      user: req.user._id,
    });

    const insights = generateInsights(
      transactions,
      budget
    );
 const aiResult =
  await generateAISummary(insights);
    res.json({
  insights,
  aiSummary: aiResult.summary,
  generationTimeMs:
    aiResult.generationTimeMs,
});

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
  


module.exports = getInsights;
