import { createContext, useContext, useEffect, useReducer } from "react";  

import { api } from "../api/api";

 

const ExpenseContext = createContext();  

 

const initialState = { expenses: [], loading: false, error: null };  

 

// MongoDB returns _id; normalize to id so the reducer/UI keep working  

const normalize = (e) => ({ ...e, id: e._id });  

 

const expenseReducer = (state, action) => {  

  switch (action.type) {  

    case "ADD_EXPENSE":  

      return { ...state, expenses: [...state.expenses, action.payload] };  

    case "DELETE_EXPENSE":  

      return {  

        ...state,  

        expenses: state.expenses.filter((e) => e.id !== action.payload.id),  

      };  

    case "UPDATE_EXPENSE":  

      return {  

        ...state,  

        expenses: state.expenses.map((e) =>  

          e.id === action.payload.id ? action.payload : e  

        ),  

      };  

    case "SET_EXPENSES":  

      return { ...state, expenses: action.payload };  

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

 

  // Load expenses from backend on mount (replaces localStorage effect)  

  useEffect(() => {  

    (async () => {  

      try {  

        dispatch({ type: "SET_LOADING", payload: true });  

        const data = await api("expenses");  

        dispatch({ type: "SET_EXPENSES", payload: data.map(normalize) });  

      } catch (error) {  

        dispatch({ type: "SET_ERROR", payload: error });  

      } finally {  

        dispatch({ type: "SET_LOADING", payload: false });  

      }  

    })();  

  }, []);  

 

  const value = {  

    ...state,  

    addExpense: async (expense) => {  

      // backend expects `title`, not `description`  

      const saved = await api("expenses/add", {  

        method: "POST",  

        body: JSON.stringify({  

          title: expense.title,

          description:expense.description,

          amount: expense.amount,  

          category: expense.category,  

          type: "expense",  

          date: expense.date,  

        }),  

      });  

      dispatch({ type: "ADD_EXPENSE", payload: normalize(saved) });  

    },  

    deleteExpense: async (id) => {  

      await api(`expenses/delete/${id}`, { method: "DELETE" });  

      dispatch({ type: "DELETE_EXPENSE", payload: { id } });  

    },  

    updateExpense: async (expense) => {  

      const updated = await api(`expenses/update/${expense.id}`, {  

        method: "PUT",  

        body: JSON.stringify(expense),  

      });  

      dispatch({ type: "UPDATE_EXPENSE", payload: normalize(updated) });  

    },  

  };  

 

  return (  

    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>  

  );  

};  

 

export const useExpenses = () => {  

  const context = useContext(ExpenseContext);  

  if (context === undefined) {  

    throw new Error("useExpenses must be used within an ExpenseProvider");  

  }  

  return context;  

};