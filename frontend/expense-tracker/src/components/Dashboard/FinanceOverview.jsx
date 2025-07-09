import React from 'react'
import CustomPieChart from '../Charts/CustomPieChart';

const COLORS = ["#875CF5","#FA2C37","#FF6900"];

const FinanceOverview = ({totalBalance,totalIncome,totalExpense}) => {
    const balanceData=[
        {name:"Total Balance",amount: totalBalance},
        {name:"Total Income",amount: totalIncome},
        {name:"Total Expense",amount: totalExpense},
    ];
    const hasData = totalBalance > 0 || totalIncome > 0 || totalExpense > 0;
  return <div className="card overflow-visible p-4">
        <div className="flex items-center justify-between"> 
            <h5 className="text-lg">Financial overview</h5>
        </div>
        {/* <CustomPieChart
            data={balanceData}
            label="Total Balance"
            totalAmount={`$${totalBalance}`}
            colors={COLORS}
            showTextAnchor={true}
        /> */}

        {hasData ? (
            <CustomPieChart
            data={balanceData}
            label="Total Balance"
            totalAmount={`$${totalBalance}`}
            colors={COLORS}
            showTextAnchor={true}
            />
        ) : (
            <div className="text-sm text-gray-500 text-center mt-6">
            No financial data available yet.
            </div>
        )}


    </div>
  
}

export default FinanceOverview