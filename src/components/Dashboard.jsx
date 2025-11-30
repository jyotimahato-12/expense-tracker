import React, { useMemo } from "react";
import ExpenseSummary from "./ExpenseSummary";
import ExpenseChart from "./ExpenseChart";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";

const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Expense summary */}
      <ExpenseSummary />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Expense charts */}
          <ExpenseChart />

          {/* Expense history */}
          <ExpenseList />
        </div>

        {/* Expense form */}
        <ExpenseForm />
      </div>
    </div>
  );
};

export default Dashboard;
