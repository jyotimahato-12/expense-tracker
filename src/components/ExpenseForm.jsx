import React, { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";
import toast from "react-hot-toast";

const ExpenseForm = () => {
  const { addExpense } = useExpenses();
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("food");

  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState("");

const [type, setType] = useState("expense"); // income | expense

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
    setIsSubmitting(true); // <-- important fix

    try {
      if (!description.trim()) {
        throw new Error("Please enter a description");
      }
      if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
        throw new Error("Please enter a valid amount");
      }

      await addExpense({
          title: description.trim(),
          amount: Number(amount),
          category,
          type,
          date,
          note:"",
          merchant:"Unknown",

      });

      toast.success("Expense added successfully");

      // Reset fields
      setDescription("");
      setAmount("");
      setCategory("food");
      setDate(new Date().toISOString().split("T")[0]);
    } catch (error) {
      toast.error(error.message || "Failed to add expense");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
  <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md mx-auto">
    <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
      Add New Expense
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

      {/* Description (optional replace OR keep same as title) */}
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

      {/* Type (income/expense) */}
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full px-4 py-2 border rounded-md"
      >
        <option value="expense">expense</option>
        <option value="income">income</option>
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
        className="w-full py-2 bg-indigo-600 text-white rounded-md"
      >
        {isSubmitting ? "Adding..." : "Add Expense"}
      </button>
    </form>
  </div>
);
};

export default ExpenseForm;
