import { createContext, useContext, useEffect, useReducer } from "react";
import {
  getExpenses,
  addExpense as addExpenseAPI,
  deleteExpense as deleteExpenseAPI,
} from "../api/api";

const ExpenseContext = createContext();

const initialState = {
  expenses: [],
  loading: false,
  error: null,
};

const expenseReducer = (state, action) => {
  switch (action.type) {
    case "SET_EXPENSES":
      return { ...state, expenses: action.payload };

    case "ADD_EXPENSE":
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };

    case "DELETE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense._id !== action.payload.id
        ),
      };

    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "SET_ERROR":
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export const ExpenseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  // 🔥 1. LOAD EXPENSES (IMPORTANT FIX)
  const loadExpenses = async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });

      const token = localStorage.getItem("token");
       
      const data = await getExpenses(token);
       console.log("loaded",data);
      const expensesArray =
        data && data.success
          ? data.expenses
          : Array.isArray(data)
          ? data
          : [];

      dispatch({
        type: "SET_EXPENSES",
        payload: expensesArray,
      });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.message,
      });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  // 🔥 2. LOAD ON APP START
  useEffect(() => {
    if (localStorage.getItem("token")) {
      loadExpenses();
    }
  }, []);

  // 🔥 3. ADD EXPENSE
  const addExpense = async (expense) => {
    try {
      const saved = await addExpenseAPI(expense);

      const newExpense =
        saved && saved.success ? (saved.expense || saved.data) : saved;

      dispatch({
        type: "ADD_EXPENSE",
        payload: newExpense,
      });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.message,
      });
    }
  };

  // 🔥 4. DELETE EXPENSE
  const deleteExpense = async (id) => {
    try {
      await deleteExpenseAPI(id);

      dispatch({
        type: "DELETE_EXPENSE",
        payload: { id },
      });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.message,
      });
    }
  };

  return (
    <ExpenseContext.Provider
      value={{
        ...state,
        loadExpenses, // ✅ FIXED
        addExpense,
        deleteExpense,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

// 🔥 CUSTOM HOOK
export const useExpenses = () => {
  const context = useContext(ExpenseContext);

  if (!context) {
    throw new Error("useExpenses must be used within ExpenseProvider");
  }

  return context;
};