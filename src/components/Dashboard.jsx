import React, { useEffect, useState } from "react";

import { useExpenses } from "../context/ExpenseContext";

import ExpenseSummary from "../components/ExpenseSummary";

import ExpenseChart from "../components/ExpenseChart";

import ExpenseForm from "../components/ExpenseForm";

import ExpenseList from "../components/ExpenseList";



const Dashboard = () => {

  // Pull expenses and state directly from the global context!

  const [expenses, setExpenses] = useState([]);

 

  const [summaryData, setSummaryData] = useState(null);

  const [insights, setInsights] = useState([]);

  const [aiSummary, setAiSummary] = useState("");



  // Fetch Summary Aggregation from GET /api/expenses/summary
   const fetchExpenses = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/expenses", {

        method: "GET",

        headers: {

          Authorization: `Bearer ${token}`,

        },

      });

      const data = await response.json();

     setExpenses(data.expenses || []);

    } catch (err) {

      console.error("Error fetching expenses:", err);

    }

  };

  const fetchSummary = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/expenses/summary", {

        method: "GET",

        headers: {

          Authorization: `Bearer ${token}`,

        },

      });

      const data = await response.json();

      setSummaryData(data);

    } catch (err) {

      console.error("Error fetching summary:", err);

    }

  };



  // Fetch Insights & AI Summary

  const fetchInsights = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/insights/insights", {

        method: "GET",

        headers: {

          Authorization: `Bearer ${token}`,

        },

      });

      const data = await response.json();

      setInsights(data.insights || []);

      setAiSummary(data.aiSummary || "");

    } catch (err) {

      console.error("Error fetching insights:", err);

    }

  };


console.log("expenses",expenses);
  // Re-fetch summary and insights whenever the global expenses array changes

  useEffect(() => {

    fetchSummary();

    fetchInsights();
     fetchExpenses();
  }, []);



  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-purple-50 p-6 space-y-8">

      <div className="text-center">

        <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-green-500">

          Save smart today, live free tomorrow.

        </h1>

      </div>



      {/* Summary Component */}

      <ExpenseSummary

        expenses={Array.isArray(expenses) ? expenses : []}

        summary={summaryData}

      />



      {/* AI Insights Section */}

      {(aiSummary || insights.length > 0) && (

        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-xl font-bold text-indigo-600 mb-4">

            🤖 AI Financial Insights

          </h2>

          <div className="space-y-4">

            <div>

              <h3 className="font-semibold text-gray-700 mb-1">AI Summary</h3>

              <p className="text-gray-600">{aiSummary}</p>

            </div>



            {insights.length > 0 && (

              <div>

                <h3 className="font-semibold text-gray-700 mb-2">Key Insights</h3>

                <ul className="space-y-2">

                  {insights.map((item, index) => (

                    <li key={index} className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">

                      {item}

                    </li>

                  ))}

                </ul>

              </div>

            )}

          </div>

        </div>

      )}



      {/* Grid Layout for Charts, Lists, and Form */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2 space-y-6">

          <div className="bg-white rounded-2xl shadow p-6">

            <ExpenseChart

              expenses={Array.isArray(expenses) ? expenses : []}

              categoryBreakdown={summaryData?.categoryBreakdown || []}

            />

          </div>



          <div className="bg-white rounded-2xl shadow p-6">

            <ExpenseList

              expenses={Array.isArray(expenses) ? expenses : []}

            />

          </div>

        </div>



        <div className="bg-white rounded-2xl shadow p-6">

          <ExpenseForm onExpenseAdded={() => {
  fetchExpenses();
  fetchSummary();
  fetchInsights();
}} /> 

        </div>

      </div>

    </div>

  );

};



export default Dashboard; 