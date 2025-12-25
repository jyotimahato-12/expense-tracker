import ExpenseSummary from "../components/ExpenseSummary";
import ExpenseChart from "../components/ExpenseChart";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";

const Dashboard = ({ expenses, setExpenses }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-purple-50 p-6 space-y-8">

      {/* Big quote */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-green-500">
          Save smart today, live free tomorrow.
        </h1>
      </div>

      {/* Expense summary */}
      <ExpenseSummary expenses={expenses} />

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left side */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow p-6">
            <ExpenseChart expenses={expenses} />
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <ExpenseList expenses={expenses} />
          </div>
        </div>

        {/* Right side */}
        <div className="bg-white rounded-2xl shadow p-6">
          <ExpenseForm setExpenses={setExpenses} />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
