import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import toast from "react-hot-toast";
import Spinner from "../../components/Loader/Spinner";

const Budget = () => {
  const [budget, setBudget] = useState(0);
  const [inputBudget, setInputBudget] = useState("");
  const [monthlySpent, setMonthlySpent] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);

  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  });

  const fetchBudget = async () => {
    try {
      const res = await axiosInstance.get(
        `/api/v1/budget?month=${selectedMonth}`,
        {
          withCredentials: true,
        }
      );
      setBudget(res.data.budget || 0);
    } catch (err) {
      toast.error("Failed to fetch budget");
      console.error("Budget Error:", err?.response?.data || err.message);
    }
  };

  const fetchTransactions = async () => {
    try {
      const res = await axiosInstance.get("/api/v1/transactions", {
        withCredentials: true,
      });
      setTransactions(res.data.transactions || []);
    } catch (err) {
      toast.error("Failed to fetch transactions");
      console.error("Transaction Error:", err.response?.data || err.message);
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await axiosInstance.get("/api/v1/budget/history", {
        withCredentials: true,
      });

      const data = Array.isArray(res.data.history) ? res.data.history : [];
      setHistory(data);
    } catch (err) {
      toast.error("Failed to fetch budget history");
      setHistory([]);
    }
  };

  const calculateMonthlySpent = () => {
    const [year, month] = selectedMonth.split("-").map(Number);

    const selectedMonthTransactions = transactions.filter((txn) => {
      const date = new Date(txn.date);
      return (
        date.getMonth() + 1 === month &&
        date.getFullYear() === year &&
        txn.type === "expense"
      );
    });

    const total = selectedMonthTransactions.reduce(
      (acc, txn) => acc + Number(txn.amount),
      0
    );
    setMonthlySpent(total);
  };

  const updateBudget = async () => {
    if (!inputBudget || isNaN(inputBudget) || inputBudget < 0) {
      toast.error("Please enter a valid number");
      return;
    }

    try {
      await axiosInstance.put(
        `/api/v1/budget?month=${selectedMonth}`,
        { budget: Number(inputBudget) },
        { withCredentials: true }
      );
      toast.success("Budget updated!");
      setBudget(Number(inputBudget));
      setInputBudget("");
      fetchHistory(); // update history after update
    } catch (err) {
      toast.error("Error updating budget");
      console.error("Update Budget Error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      await Promise.all([fetchBudget(), fetchTransactions(), fetchHistory()]);
      setLoading(false);
    };
    fetchAll();
  }, []);

  useEffect(() => {
    fetchBudget();
    if (transactions.length) calculateMonthlySpent();
  }, [selectedMonth]);

  useEffect(() => {
    if (transactions.length) calculateMonthlySpent();
  }, [transactions]);

  const percentUsed =
    budget > 0 ? Math.min((monthlySpent / budget) * 100, 100).toFixed(1) : 0;

  if (loading) return <Spinner />;

  return (
    <DashboardLayout activeMenu="Budget">
      <div className="py-8 px-4 md:px-10">
        <h1 className="text-2xl font-bold text-purple-800 mb-6">
          Budget Overview
        </h1>

        <div className="mb-6">
          <label className="block text-gray-600 mb-2 font-medium">
            Select Month
          </label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-md focus:outline-purple-600"
          >
            {Array.from({ length: 12 }).map((_, i) => {
              const date = new Date();
              date.setMonth(date.getMonth() + i);
              const month = `${date.getFullYear()}-${String(
                date.getMonth() + 1
              ).padStart(2, "0")}`;
              return (
                <option key={month} value={month}>
                  {month}
                </option>
              );
            })}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white shadow rounded-lg p-5">
            <p className="text-gray-600 text-sm mb-1">Budget Set</p>
            <h2 className="text-xl font-bold text-purple-700">${budget}</h2>
          </div>
          <div className="bg-white shadow rounded-lg p-5">
            <p className="text-gray-600 text-sm mb-1">Spent</p>
            <h2 className="text-xl font-bold text-red-600">${monthlySpent}</h2>
          </div>
          <div className="bg-white shadow rounded-lg p-5">
            <p className="text-gray-600 text-sm mb-1">Remaining</p>
            <h2 className="text-xl font-bold text-green-600">
              ${Math.max(budget - monthlySpent, 0)}
            </h2>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6 mb-10">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Spending Progress
          </h3>
          <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                monthlySpent > budget ? "bg-red-500" : "bg-indigo-500"
              }`}
              style={{ width: `${percentUsed}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">{percentUsed}% used</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 mb-10">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Update Budget
          </h3>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <input
              type="number"
              placeholder="Enter new budget"
              className="w-full md:w-1/3 border border-gray-300 px-4 py-2 rounded focus:outline-purple-600"
              value={inputBudget}
              onChange={(e) => setInputBudget(e.target.value)}
            />
            <button
              onClick={updateBudget}
              className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded transition"
            >
              Save
            </button>
          </div>
        </div>

        {/* Budget History Table */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Budget History
          </h3>
          {history.length === 0 ? (
            <p className="text-gray-600">No budget history available.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead className="bg-purple-100 text-purple-800">
                  <tr>
                    <th className="p-3">Month</th>
                    <th className="p-3">Budget ($)</th>
                    <th className="p-3">Spent ($)</th>
                    <th className="p-3">Remaining ($)</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((entry) => (
                    <tr key={entry.month} className="border-t hover:bg-gray-50">
                      <td className="p-3">{entry.month}</td>
                      <td className="p-3">${entry.budget}</td>
                      <td className="p-3 text-red-600">${entry.spent}</td>
                      <td className="p-3 text-green-700">${entry.remaining}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Budget;
