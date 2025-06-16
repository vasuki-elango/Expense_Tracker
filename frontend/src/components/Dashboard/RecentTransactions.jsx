import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import { TransactionInfoCard } from '../cards/TransactionInfoCard'
import moment from 'moment'

export const RecentTransactions = ({ transactions, onSeeMore }) => {

    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Recent Transactions</h5>
                <button onClick={onSeeMore} className='card-btn'>
                    See All
                    <LuArrowRight />
                </button>
            </div>

            <div className='mt-6'>
                {
                    transactions.length===0? <span className='no-data'>No Recent Transcations</span>  :Array.isArray(transactions) && transactions?.slice(0, 5)?.map((item) => <TransactionInfoCard
                        key={item._id}
                        type={item.source?"income":"expense"}
                        title={item.source?item.source:item.category}
                        icon={item.icon}
                        date={moment(item.date).format('Do MMM YYYY')}
                        amount={item.amount}
                        hideDeleteBtn="false"
                    />)
                }
            </div>
        </div>
    )
}
