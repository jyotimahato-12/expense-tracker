import React, { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";
import { Link, useNavigate } from "react-router-dom";
const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  

  const navigate = useNavigate();

const { loadExpenses } = useExpenses();

  const handleSubmit = async (e) => {
    e.preventDefault();
  

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );
const data=await response.json();
      if (data.success && data.token) {
         localStorage.removeItem("token");
    localStorage.removeItem("user");
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.data));
   await loadExpenses(); // <-- important

  alert("Login Successful");
  navigate("/dashboard");

} else {
  alert(data.message || "Login failed");
}
     
 } catch (error) {
      console.error(error);
      alert("Something went wrong");
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
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <input
            type="email"
            placeholder="Enter Email"
            className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <div className="relative">
            <input
              type={
                showPassword ? "text" : "password"
              }
              placeholder="Enter Password"
              className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-4 top-3 text-sm text-gray-500"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            disabled={
              !email || !password || loading
            }
            className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center mt-6 text-gray-600">
          Don't have an account?
          <Link
            to="/register"
            className="text-blue-600 font-semibold ml-2"
          >
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