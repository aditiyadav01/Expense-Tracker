import React from 'react'
import { LuArrowRight, LuUtensils } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import moment from 'moment';

const RecentIncome = ({transactions=[],onseeMore}) => {
    const hasData = transactions.length > 0;

  return (
    <div className="card">
        <div className="flex items-center justify-between">
             <h5 className="text-lg">Income</h5>
             <button className="card-btn" onClick={onseeMore}>
                See All<LuArrowRight className="text-base"/>
             </button>
        </div>
        <div className="mt-6">
        {/* {transactions?.slice(0,4)?.map((item) => (
            <TransactionInfoCard
            key={item._id}
            title={item.source}
            icon={<LuUtensils size={18}/>}
            date={moment(item.date).format("DD MMM YYYY")}
            amount={item.amount}
            type="income"
            hideDeleteBtn
            />
        ))} */}
        {hasData ? (
          transactions.slice(0, 4).map((item) => (
            <TransactionInfoCard
              key={item._id}
              title={item.source}
              icon={<LuUtensils size={18} />}
              date={moment(item.date).format("DD MMM YYYY")}
              amount={item.amount}
              type="income"
              hideDeleteBtn
            />
          ))
        ) : (
          <p className="text-sm text-gray-500 text-center mt-4">
            No income transactions found.
          </p>
        )}
        </div>

    </div>
  )
};

export default RecentIncome