import React from 'react'
import { LuArrowDown, LuArrowRight, LuUtensils } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'

const ExpenseTransaction = ({transactions,onSeeMore}) => {
  const hasExpenses = transactions && transactions.length > 0;
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Expenses</h5>
          <button className="card-btn" onClick={onSeeMore}>See All <LuArrowRight className="text-base"/>
        </button>
      </div>
      {/* <div>
        {transactions?.slice(0,4)?.map((expense)=>(
          <TransactionInfoCard
            key={expense._id}
            title={expense.category}
            icon={expense.icon}
            date={moment(expense.date).format("DD MMM YYYY")}
            amount={expense.amount}
            type="expense"
            hideDeleteBtn
          />
        ))}
      </div> */}
      <div>
        {hasExpenses ? (
          transactions.slice(0, 4).map((expense) => (
            <TransactionInfoCard
              key={expense._id}
              title={expense.category}
              icon={expense.icon}
              date={moment(expense.date).format("DD MMM YYYY")}
              amount={expense.amount}
              type="expense"
              hideDeleteBtn
            />
          ))
        ) : (
          <p className="text-gray-500 text-sm mt-4 text-center">
            No expense transactions found.
          </p>
        )}
      </div>

    </div>
  )
}

export default ExpenseTransaction