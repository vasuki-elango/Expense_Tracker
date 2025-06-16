import React from 'react'
import { LuPlus } from 'react-icons/lu'
import { CustomBarChart } from '../chart/CustomBarChart'
import moment from 'moment'

export const IncomeOverview = ({ transactions, onAddIncome }) => {
    const prepareData = (data) => {
        if (!Array.isArray(data)) return [];
        return data.map(item => ({
            date: moment(item.date).format('DD MMM'),
            category: item?.source,
            amount: item.amount
        }))
    }
    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <div>
                    <h5 className='text-lg'>Income Overview</h5>
                    <p className='text-xs text-gray-500 my-0.5'>Track your earings over time and analyze your income trends.</p>
                </div>
                <button onClick={onAddIncome} className='add-btn' >
                    <LuPlus className='text-lg' />
                    Add Income
                </button>
            </div>

            <div className='mt-6'>
                <CustomBarChart datas={prepareData(transactions)} />
            </div>
        </div>
    )
}
