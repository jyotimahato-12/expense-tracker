const BASE_URL = "http://localhost:5000/api";

// 1. Helper function to get authorization headers dynamically
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  console.log("token", token);
  const headers = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

/* 🔥 GET insights (needs auth) */


/* 🔥 GET insights (needs auth) */
const getInsights = async () => {
  const res = await fetch(`${BASE_URL}/insights/insights`, {
    headers: getAuthHeaders(),
  });
  return res.json();
};

/* 💰 Add expense (needs auth) */
const addExpense = async (expense) => {
  console.log("j");
  const res = await fetch(`${BASE_URL}/expenses/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(), // Adds the Authorization header
    },
    body: JSON.stringify(expense),
  });

  return res.json();
};

/* 🧾 Get expenses (needs auth) */
const getExpenses = async () => {
  const res = await fetch(`${BASE_URL}/api/expenses/`, {
    headers: getAuthHeaders(),
  });
  return res.json();
};

/* ❌ Delete expense (needs auth) */
const deleteExpense = async (id) => {
  const res = await fetch(`${BASE_URL}/api/expenses/delete/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  return res.json();
};

/* 🧪 Detect merchant (needs auth) */
const detectMerchant = async (description) => {
  const res = await fetch(`${BASE_URL}/detect`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify({ description }),
  });

  return res.json();
};

/* 🔑 Login (Does NOT require auth token) */
const login = async (data) => {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
};

/* 👥 Shared Expenses (needs auth) */
const getSharedExpenses = async () => {
  const res = await fetch(`${BASE_URL}/api/shared-expenses`, {
    headers: getAuthHeaders(),
  });
  return res.json();
};

const addSharedExpense = async (data) => {
  const res = await fetch(`${BASE_URL}/api/shared-expenses`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

/* 🏪 Merchants (needs auth) */
const getMerchants = async () => {
  const res = await fetch(`${BASE_URL}/merchants`, {
    headers: getAuthHeaders(),
  });
  return res.json();
};

const addMerchant = async (data) => {
  const res = await fetch(`${BASE_URL}/merchant`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });

  return res.json();
};
/* 🌐 Generic API handler for ExpenseContext */
const api = async (endpoint, options = {}) => {
  const res = await fetch(`${BASE_URL}/${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
      ...options.headers,
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "API request failed");
  }

  return res.json();
};
export {
  addExpense,
  getExpenses,
  deleteExpense,
  
  detectMerchant,
  login,
  getSharedExpenses,
  addSharedExpense,
  getMerchants,
  addMerchant,
  api,
};