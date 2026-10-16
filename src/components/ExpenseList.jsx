import React, { useState, useMemo } from "react";
import { useExpenses } from "../context/ExpenseContext";
import { formatCurrency, formatDate, getCategoryTextColor } from "../utils/expenses";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const ExpenseRow = React.memo(({ expense, onDelete }) => (
  <tr className="hover:bg-gray-50 transition-colors">
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
      {formatDate(expense.date)}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
      {expense.title || expense.description}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm">
      <span className={`${getCategoryTextColor(expense.category)} font-medium`}>
        {expense.category ? expense.category.charAt(0).toUpperCase() + expense.category.slice(1) : "Other"}
      </span>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
      {formatCurrency(expense.amount)}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-right">
      <button 
        onClick={() => onDelete(expense._id || expense.id)} 
        className="text-red-500 hover:text-red-700 transition-colors"
      >
        <Trash2 size={18} />
      </button>
    </td>
  </tr>
));

const ExpenseList = ({ expenses: propExpenses }) => {
  const context = useExpenses();
  const contextExpenses = context ? context.expenses : undefined;
  const deleteExpense = context ? context.deleteExpense : () => {};

  // Direct check: strictly use propExpenses if passed, otherwise fallback to context
  const expenses = Array.isArray(propExpenses) 
    ? propExpenses 
    : (Array.isArray(contextExpenses) ? contextExpenses : []);

  const [categoryFilter, setCategoryFilter] = useState("all");

  const categoryOptions = [
    { value: "all", label: "All Categories" }, 
    { value: "food", label: "Food & Dining" },
    { value: "transport", label: "Transportation" },
    { value: "entertainment", label: "Entertainment" },
    { value: "shopping", label: "Shopping" },
    { value: "utilities", label: "Utilities" },
    { value: "health", label: "Health & Medical" },
    { value: "other", label: "Other" },
  ];

  const filteredAndSortedExpenses = useMemo(() => {
    return expenses
      .filter(exp => categoryFilter === "all" || exp.category === categoryFilter)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [expenses, categoryFilter]);

 const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/expenses/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete expense on server");
      }

      toast.success("Expense deleted successfully");

      // If Dashboard passed down an onExpenseDeleted or onExpenseAdded callback, trigger it here
      // Or if you want to notify parent dashboard, you can accept a callback prop just like ExpenseForm!
      window.location.reload(); // Quickest way to sync state if parent isn't using a callback prop yet
    } catch (err) {
      toast.error(err.message || "Failed to delete expense");
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-expense-dark">Expense History</h2>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-1 rounded-md border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-expense-light focus:border-transparent"
        >
          {categoryOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      {filteredAndSortedExpenses.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-500">
          <p className="mb-2">No expenses found</p>
          {categoryFilter !== "all" && <p>Try changing the category filter or add new expenses.</p>}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAndSortedExpenses.map(exp => (
                  <ExpenseRow key={exp._id || exp.id} expense={exp} onDelete={handleDelete} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

// Removed React.memo wrapper so prop updates from Dashboard always trigger a re-render
export default ExpenseList;