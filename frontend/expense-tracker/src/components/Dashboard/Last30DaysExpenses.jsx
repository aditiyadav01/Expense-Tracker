import React, { useEffect, useState } from 'react'
import { prepareExpenseBarChartData } from '../../utils/helper';
import CustomBarChart from '../Charts/CustomBarChart';

const Last30DaysExpenses = ({data}) => {
    const [chartData,setChartData] = useState([]);

    useEffect(()=>{
        const result = prepareExpenseBarChartData(data);
        setChartData(result);

        return()=>{};
    },[data]);
    const hasData = chartData && chartData.length > 0;
  return (
    <div className="card col-span-1">
        <div className=" flex items-center justify-between">
            <h5 className="text-lg">Last 30 Days Expenses</h5>
        </div>
        {/* <CustomBarChart
            data={chartData}
        /> */}
        {hasData ? (
            <CustomBarChart data={chartData} />
        ) : (
            <div className="text-sm text-gray-500 text-center mt-6">
            No expense data for the last 30 days.
            </div>
      )}
    </div>
  )
}

export default Last30DaysExpenses