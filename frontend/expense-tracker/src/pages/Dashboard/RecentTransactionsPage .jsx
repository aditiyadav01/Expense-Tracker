import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import TransactionInfoCard from '../../components/Cards/TransactionInfoCard';
import moment from 'moment';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import Spinner from '../../components/Loader/Spinner';

const RecentTransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      const response = await axiosInstance.get('/api/v1/transactions'); // backend returns combined recentTransactions
      // setTransactions(response.data?.recentTransactions || []);
      setTransactions(response.data?.transactions || []);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  if (loading) return <Spinner />;

  return (
    <DashboardLayout activeMenu="Transactions">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-6">All Recent Transactions</h2>

        {loading ? (
          <p className="text-sm text-gray-500 text-center">Loading...</p>
        ) : transactions.length === 0 ? (
          <p className="text-sm text-gray-500 text-center mt-4">
            No income or expense transactions found.
          </p>
        ) : (
          <div className="grid gap-4">
            {transactions.map((item, index) => (
              <TransactionInfoCard
                key={item._id ?? `${item.type}-${index}`}
                title={item.type === 'expense' ? item.category ?? "Unknown" : item.source ?? "Unknown"}
                icon={item.icon}
                date={moment(item.date).format("DD MMM YYYY")}
                amount={item.amount}
                type={item.type}
                hideDeleteBtn
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default RecentTransactionsPage;
