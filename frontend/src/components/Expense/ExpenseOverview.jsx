import React from 'react'
import { CustomLineChart } from '../chart/CustomLineChart'
import moment from 'moment';
import { LuPlus } from 'react-icons/lu';

export const ExpenseOverview = ({ transactions, onExpense }) => {
    const prepareData = (data) => {
        if (!Array.isArray(data)) return [];
        return data.map(item => ({
            date: moment(item.date).format('DD MMM'),
            category: item?.category,
            amount: item.amount
        }))
    }

    return (
        <div className='card'>
            <div className='flex items-center justify-between gap-6'>
                <div>
                    <h5 className='text-lg'>Expense Overview</h5>
                    <p className='text-xs text-gray-500 my-0.5'>Track your spending over time and gain insights into where your money goes.</p>
                </div>
                <button onClick={onExpense} className='add-btn'>
                    <LuPlus className='text-lg' />
                    Add Expense
                </button>
            </div>

            <div className='mt-6'>
                <CustomLineChart datas={prepareData(transactions)} />
            </div>
        </div>
    )
}
