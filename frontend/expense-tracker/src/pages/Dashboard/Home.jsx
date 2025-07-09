import React, { useEffect,useState} from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useUserAuth } from '../../hooks/useUserAuth';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import InfoCard from '../../components/Cards/InfoCard';
import { LuHandCoins,LuWalletMinimal } from 'react-icons/lu';
import {IoMdCard} from "react-icons/io"
import { addThousandseperator } from '../../utils/helper';
import RecentTransactions from '../../components/Dashboard/RecentTransactions';
import FinanceOverview from '../../components/Dashboard/FinanceOverview';
import ExpenseTransaction from '../../components/Dashboard/ExpenseTransaction';
import Last30DaysExpenses from '../../components/Dashboard/Last30DaysExpenses';
import RecentIncomeWithChart from '../../components/Dashboard/RecentIncomeWithChart';
import RecentIncome from '../../components/Dashboard/RecentIncome';
import Spinner from '../../components/Loader/Spinner';



const Home = () => {
  useUserAuth();

  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null); 
  const [loading, setloading] = useState(false); 

  const fetchDashboardData = async()=>{
    if(loading) return ;
    setloading(true);
    try {
      const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`);
      if(response.data){
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Something Went Wrong. Please try again",error);
    } finally{
      setloading(false);
    }
  };

  useEffect(()=>{
    fetchDashboardData();
    return ()=>{};
  },[]);

  if (loading) return <Spinner />;

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className='my-5 mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <InfoCard 
              icon={<IoMdCard/>}
              label = "Total Balance"
              value={addThousandseperator(dashboardData?.totalBalance || 0)}
              color="bg-purple-800"
            />

            <InfoCard 
              icon={<LuWalletMinimal/>}
              label = "Total Income"
              value={addThousandseperator(dashboardData?.totalIncome || 0)}
              color="bg-orange-500"
            />

            <InfoCard 
              icon={<LuHandCoins/>}
              label = "Total Expense"
              value={addThousandseperator(dashboardData?.totalExpense|| 0)}
              color="bg-red-800"
            />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
            <RecentTransactions
            transactions = {dashboardData?.recentTransactions || []}
            onSeeMore={()=>navigate("/transactions")}
            />
            <FinanceOverview
              totalBalance={dashboardData?.totalBalance || 0}
              totalIncome={dashboardData?.totalIncome || 0}
              totalExpense={dashboardData?.totalExpense || 0}
            />
            <ExpenseTransaction
              transactions={dashboardData?.last30DaysExpenses?.transactions}
              onSeeMore={()=>navigate("/expense")}
            />
            <Last30DaysExpenses
              data={dashboardData?.last30DaysExpenses?.transactions || []}
            />

            <RecentIncomeWithChart
              data={dashboardData?.last60DaysIncome?.transactions?.
              slice(0,4) || []}
              totalIncome={dashboardData?.totalIncome || 0}
            />
            <RecentIncome 
              transactions={dashboardData?.last60DaysIncome?.transactions || []}
              onseeMore={() => navigate("/income")}
            />

          </div>
      </div>

    </DashboardLayout>
  )
}

export default Home