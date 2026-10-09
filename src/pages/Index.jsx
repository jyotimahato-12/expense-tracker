import React from "react";
import { ExpenseProvider } from "../context/ExpenseContext";
import Login from "../components/Login";

const Index = () => {
  return (
    <ExpenseProvider>
      <Login />
    </ExpenseProvider>
  );
};

export default Index;