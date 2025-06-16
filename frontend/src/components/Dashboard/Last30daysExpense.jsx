import React, { useEffect, useState } from 'react'
import { CustomBarChart } from '../chart/CustomBarChart'
import moment from 'moment';

export const Last30daysExpense = ({data}) => {
    const [chartData,setChartData] = useState([]);
    const prepareData = (data)=>{
        if (!Array.isArray(data)) return [];
        return data.map(item=>({
            date:moment(item.date).format('DD MMM'),
            category:item?.category,
            amount:item.amount
        }))
    }
    useEffect(()=>{
        const formatted = prepareData(data);
        setChartData(formatted);
    },[data])
   
    
  return (
    <div className='card '>
        <div className='flex items-center justify-center mb-5'>
            <h5>Last 30Days Expense</h5>
        </div>
        <CustomBarChart datas={chartData}/>
    </div>
  )
}
