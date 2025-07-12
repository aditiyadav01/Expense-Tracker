import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import Spinner from "../../components/Loader/Spinner";
import toast from "react-hot-toast";

const BudgetHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const res = await axiosInstance.get("/api/v1/budget/history", {
        withCredentials: true,
      });
      setHistory(res.data.history || []);
    } catch (err) {
      toast.error("Failed to fetch budget history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  if (loading) return <Spinner />;

  return (
    <DashboardLayout activeMenu="Budget">
      <div className="py-8 px-4 md:px-10">
        <h1 className="text-2xl font-bold text-purple-800 mb-6">
          Budget History
        </h1>

        {history.length === 0 ? (
          <p className="text-gray-600">No budget history available.</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow rounded-lg p-5">
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
    </DashboardLayout>
  );
};

export default BudgetHistory;
