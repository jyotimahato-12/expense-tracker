 function groupByCategory(transactions) {

  const grouped = {};

  for (const tx of transactions) {

    // Ignore income
    if (tx.type !== "expense") continue;

    if (!grouped[tx.category]) {
      grouped[tx.category] = 0;
    }

    grouped[tx.category] += tx.amount;
  }

  return grouped;
}




function predictNextMonthExpense(monthlyData) {

  const months =
    Object.keys(monthlyData);

  if (months.length < 3) {
    return null;
  }

  months.sort();

  const lastThree =
    months.slice(-3);

  let total = 0;

  for (const month of lastThree) {
    total +=
      monthlyData[month].expense;
  }

  const predicted =
    Math.round(total / 3);

  return predicted;
}





function detectRecurringExpenses(transactions) {

  const merchantMap = {};

  for (const tx of transactions) {

    if (tx.type !== "expense") continue;

    if (!merchantMap[tx.merchant]) {
      merchantMap[tx.merchant] = 0;
    }

    merchantMap[tx.merchant]++;
  }

  const recurring = [];

  for (const merchant in merchantMap) {

    if (merchantMap[merchant] >= 2) {

      recurring.push(
        `${merchant} appears to be a recurring expense`
      );
    }
   }

  return recurring;
  }

function calculatePercentageChange(current, previous) {

  if (previous === 0) return 100;

  return  (
    ((current - previous) / previous) * 100
  ).toFixed(1);
}


function generateTrendInsights(monthlyData) {
  const insights = [];

  const months = Object.keys(monthlyData);

  if (months.length < 2) {
    insights.push("Not enough data for trend analysis");
    return insights;
  }

  months.sort((a, b) => new Date(a) - new Date(b));

  const currentMonth = monthlyData[months[months.length - 1]];
  const previousMonth = monthlyData[months[months.length - 2]];

  const expenseChange =
    calculatePercentageChange(
      currentMonth.expense,
      previousMonth.expense
    );

  if (expenseChange > 20) {
    insights.push(
      `Expenses increased by ${expenseChange}% compared to last month`
    );
  }

  if (expenseChange < 0) {
    insights.push(
      `Great job! Expenses reduced by ${Math.abs(expenseChange)}%`
    );
  }

  return insights;
}








function groupTransactionsByMonth(transactions) {
  const monthlyData = {};

  for (const tx of transactions) {

    const date = new Date(tx.date);

    const monthKey =
      `${date.getFullYear()}-${date.getMonth() + 1}`;

    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = {
        income: 0,
        expense: 0,
      };
    }

    if (tx.type === "income") {
      monthlyData[monthKey].income += tx.amount;
    } else {
      monthlyData[monthKey].expense += tx.amount;
    }
  }

  return monthlyData;
}






function splitIncomeExpense(transactions) {
  let income = 0;
  let expense = 0;

  for (const tx of transactions) {
    if (tx.type === "income") income += tx.amount;
    else expense += tx.amount;
  }
   console.log(1);
  return { income, expense };
}





 function getTopCategory(grouped) {
  let top = "";
  let max = 0;

  for (const key in grouped) {
    if (grouped[key] > max) {
      max = grouped[key];
      top = key;
    }
  }

  return { category: top, amount: max };
}




// REPLACE THE OLD ONE WITH THIS NEW ONE:
function checkBudget(expense, budget) {
  // Edge case handle: If budget is 0 or not provided, avoid NaN division
  if (!budget || budget === 0) return "No budget threshold set for this month.";

  const usagePercentage = (expense / budget) * 100;

  if (expense > budget) {
    return `🚨 Budget Alert: You have exceeded your monthly budget by ₹${(expense - budget).toFixed(2)}!`;
  } 
  
  if (usagePercentage >= 80) {
    return `⚠️ Budget Warning: You have consumed ${usagePercentage.toFixed(0)}% of your monthly budget allowance.`;
  }

  return "You are safely within your budget guidelines for this month.";
}



 function generateInsights(transactions,budget) {
  const insights = [];
 
 
  if (!transactions || transactions.length === 0) {
    return ["No transaction data available"];
  }
  const { income, expense } =
    splitIncomeExpense(transactions);

  const grouped = groupByCategory(transactions);

  const top = getTopCategory(grouped);

  const savings = income - expense;
  const budgetMessage =
  checkBudget(expense, budget);

    insights.push(budgetMessage);
    const monthlyData =
    groupTransactionsByMonth(transactions);

    const trendInsights =
    generateTrendInsights(monthlyData);

  insights.push(...trendInsights);
  const recurringInsights=detectRecurringExpenses(transactions);
  insights.push(...recurringInsights);

  const predictedExpense =
  predictNextMonthExpense(monthlyData);

  if (predictedExpense) {

  insights.push(
    `Predicted next month expense: ₹${predictedExpense}`
  );
  }


  // Insight 1
  if (expense > income) {
    insights.push("You are spending more than you earn");
  }

  // Insight 2
  if (savings > 0) {
    insights.push(`You saved ₹${savings} this month`);
  }

  // Insight 3
  insights.push(
    `${top.category} is your highest spending category`
  );
     

  // Insight 4
  if (grouped.Food > expense * 0.4){
    insights.push("Food spending is very high this month");
  }
   return insights;
   
}


  

module.exports = {
  generateInsights,
  groupByCategory,
  splitIncomeExpense,
  getTopCategory,
  checkBudget,
  detectRecurringExpenses,
  groupTransactionsByMonth,
  generateTrendInsights,
  calculatePercentageChange
};