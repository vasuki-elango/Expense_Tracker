import React from 'react'
import { TransactionInfoCard } from '../cards/TransactionInfoCard'
import moment from 'moment'
import { LuArrowRight } from 'react-icons/lu'

export const TransactionCard = ({ transactions, onSeeMore, title, amount }) => {
    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <div>
                    <h5 className='text-lg'>{title}</h5>
                    <p className='text-sm text-gray-600'>Amount :${amount}</p>
                </div>
                <button onClick={onSeeMore} className='card-btn'>
                    See All
                    <LuArrowRight />
                </button>
            </div>

            <div className='mt-6'>
                {
                    Array.isArray(transactions) && transactions.slice(0, 5).map((item) => (<TransactionInfoCard
                        key={item._id}
                        type={item.source?"income":"expense"}
                        title={item.source?item.source:item.category}
                        icon={item.icon}
                        date={moment(item.date).format('Do MMM YYYY')}
                        amount={item.amount}
                        
                        hideDeleteBtn="false"
                    />))
                }
            </div>
        </div>
    )
}
