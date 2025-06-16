import React, { useEffect, useState } from 'react'
import { PieChart } from '../chart/PieChart'

export const Last30daysIncome = ({ data, totalincome }) => {
    const Colors = ["#B22222", "#725CAD", "#F3C623","#A19AD3"]
    const [chartData, setChartData] = useState([]);
    const prepareData = (data) => {
        if (!Array.isArray(data)) return [];
        return data.map(item => ({
            name: item?.source,
            amount: item?.amount
        }))
    }
    useEffect(() => {
        const formatted = prepareData(data);
        setChartData(formatted);
    }, [data])
    return (
        <div className='card'>
            <div className='text-center'>
                Last 60Days Incomes
            </div>
            <PieChart 
                data={chartData}
                label="Total Income"
                totalIncome={totalincome || 0}
                color={Colors}
                showTextAnchar={true}
            />
        </div>
    )
}
