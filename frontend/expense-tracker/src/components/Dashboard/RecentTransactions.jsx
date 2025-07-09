import React from 'react'
import { IoMdDocument } from 'react-icons/io'
import { LuArrowRight,LuUtensils } from 'react-icons/lu'
import moment from 'moment';
import TransactionInfoCard from '../Cards/TransactionInfoCard';

const RecentTransactions = ({transactions,onSeeMore}) => {
  return (
    <div className="card">
        <div className="flex items-center justify-between">
            <h5 className='text-lg'>Recent Transactions</h5>
            <button className='card-btn' onClick={onSeeMore}>
                See All<LuArrowRight className='text-base'/>
            </button>
        </div>
        <div className='mt-6'>
        {transactions && transactions?.length > 0 ? (
            transactions?.slice(0, 4).map((item, index) => (
            <TransactionInfoCard
                key={item.id ?? `${item.type}-${index}`}
                title={item.type === 'expense' ? item.category ?? "Unknown" : item.source ?? "Unknown"}
                icon={item.icon}
                date={item.date ? moment(item.date).format("DD MMM YYYY") : "Unknown Date"}
                amount={item.amount ?? 0}
                type={item.type}
                hideDeleteBtn
            />
            ))
        ) : (
            <p className="text-sm text-gray-500">No recent transactions found.</p>
        )}
        </div>


    </div>
  )
}

export default RecentTransactions