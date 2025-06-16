import React from 'react'
import { TransactionInfoCard } from '../cards/TransactionInfoCard'
import moment from 'moment'
import { LuDownload } from 'react-icons/lu'

export const ExpenseList = ({ transactions, onDelete, onDownload }) => {
    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>ExpenseList </h5>
                <div onClick={onDownload} className='btn'>
                    <LuDownload />
                    Download
                </div>
            </div>

            <div className='mt-6 grid grid-cols-1 md:grid-cols-2 '>
                {
                    Array.isArray(transactions) && transactions.slice(0, 5).map((item) => (<TransactionInfoCard
                        key={item._id}
                        type="expense"
                        title={item.type = "expense" ? item.category : item.source}
                        icon={item.icon}
                        date={moment(item.date).format('Do MMM YYYY')}
                        amount={item.amount}
                        onDelete={() => onDelete(item._id)}
                    />))
                }
            </div>
        </div>
    )
}
