import React, { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"; 

const ExpenseForm = ({ onExpenseAdded }) => {
  const { addExpense } = useExpenses();
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("food");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [type, setType] = useState("expense"); 
  const [merchant, setMerchant] = useState("Unknown");
  const [note, setNote] = useState("");

  const categoryOptions = [
    { value: "food", label: "Food & Dining" },
    { value: "transport", label: "Transportation" },
    { value: "entertainment", label: "Entertainment" },
    { value: "shopping", label: "Shopping" },
    { value: "utilities", label: "Utilities" },
    { value: "health", label: "Health & Medical" },
    { value: "other", label: "Other" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!description.trim() && !title.trim()) {
        throw new Error("Please enter a title or description");
      }
      if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
        throw new Error("Please enter a valid amount");
      }

      const token = localStorage.getItem("token");

      // Always post to the single unified expenses endpoint
      const response = await fetch("http://localhost:5000/api/expenses/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title.trim() || description.trim(),
          description: description.trim(),
          amount: Number(amount),
          category,
          type,
          date,
          note,
          merchant,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to add ${type} on server`);
      }

      console.log(`${type.charAt(0).toUpperCase() + type.slice(1)} added successfully`);
      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} added successfully`);

      // Instantly trigger dashboard to re-fetch the updated list + summary + AI insights
      if (onExpenseAdded) {
        onExpenseAdded();
      }

      // Reset form fields
      setTitle("");
      setDescription("");
      setAmount("");
      setCategory("food");
      setMerchant("Unknown");
      setNote("");
      setDate(new Date().toISOString().split("T")[0]);
    } catch (error) {
      toast.error(error.message || "Failed to submit transaction");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        {type === "expense" ? "Add New Expense" : "Add New Income"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        />

        {/* Description */}
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        />

        {/* Amount */}
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        />

        {/* Type */}
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        >
          {categoryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Merchant */}
        <input
          type="text"
          placeholder="Merchant"
          value={merchant}
          onChange={(e) => setMerchant(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        />

        {/* Note */}
        <textarea
          placeholder="Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        />

        {/* Date */}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
        >
          {isSubmitting ? "Adding..." : `Add ${type === "expense" ? "Expense" : "Income"}`}
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;