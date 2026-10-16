import React, { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  // Pull refreshExpenses from your context
  const { refreshExpenses } = useExpenses();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Please fill all fields");

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      // 1. Save token and login flag first so the API helper can read it
      localStorage.setItem("token", data.token);
      localStorage.setItem("isLoggedIn", "true");

      // 2. Fetch and save all user expenses into useExpenses BEFORE navigating
      if (refreshExpenses) {
        await refreshExpenses();
      }

      // 3. Now redirect to dashboard with everything ready!
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 px-4">
      <div className="bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-full max-w-lg">
        {/* Quote */}
        <h2 className="text-2xl md:text-3xl font-extrabold text-center text-gray-800 leading-snug mb-8">
          Track every expense today,
          <br />
          <span className="text-blue-600">
            build financial freedom tomorrow.
          </span>
        </h2>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-purple-700 mb-6">
          Expense Tracker
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Enter Email"
            className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3 text-sm text-gray-500"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            disabled={!email || !password || loading}
            className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center mt-6 text-gray-600">
          Don't have an account?
          <Link to="/register" className="text-blue-600 font-semibold ml-2">
            Register
          </Link>
        </p>

        <p className="text-center text-xs text-gray-500 mt-8">
          Every rupee matters 💸
        </p>
      </div>
    </div>
  );
};

export default Login;