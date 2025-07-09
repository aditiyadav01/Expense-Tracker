import React, { useEffect, useState } from 'react'
import CustomPieChart from '../Charts/CustomPieChart';

const COLORS = [
  "#875CF5",
  "#FA2C37",
  "#FF6900",
  "#4F39F6",
  "#16A34A",
  "#0EA5E9",
  "#F59E0B",
  "#EF4444",
  "#10B981",
  "#3B82F6",
  "#F43F5E",
  "#EAB308",
  "#8B5CF6",
  "#14B8A6",
];


const RecentIncomeWithChart = ({data,totalIncome}) => {
    const [chartData,setChartData] = useState([]);
    const preparechartData=()=>{
        const dataArr = data?.map((item)=>({
            name: item?.source,
            amount: item?.amount,
        }));
        setChartData(dataArr);
    };
    useEffect(()=>{
        preparechartData();
        return()=>{};
    },[data]);

    const hasData = chartData && chartData.length > 0 && chartData.some(item => item.amount > 0);

  return (
    <div className="card">
        <div className="flex items-center justify-between">
            <h5 className="txt-lg">Last 60 Days Income</h5>
        </div>
         {/* <CustomPieChart
            data={chartData}
            label="Total Income"
            totalAmount={`$${totalIncome}`}
            colors={COLORS}
            showTextAnchor={true}
        /> */}
        {hasData ? (
          <CustomPieChart
            data={chartData}
            label="Total Income"
            totalAmount={`$${totalIncome}`}
            colors={COLORS}
            showTextAnchor={true}
          />
        ) : (
          <div className="text-sm text-gray-500 text-center mt-6">
            No income data available for the last 60 days.
          </div>
        )}
    </div>
  )
}

export default RecentIncomeWithChart