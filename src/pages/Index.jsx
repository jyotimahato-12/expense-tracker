import React, { useState } from "react";
import { ExpenseProvider } from "../context/ExpenseContext";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../components/Dashboard";
import Login from "../components/Login";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <ExpenseProvider>
      {isLoggedIn ? (
        <DashboardLayout>
          <Dashboard />
        </DashboardLayout>
      ) : (
        <Login onLogin={() => setIsLoggedIn(true)} />
      )}
    </ExpenseProvider>
  );
};

export default Index;
