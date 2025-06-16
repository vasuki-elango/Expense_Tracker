import React from 'react'
import { ResponsiveContainer,AreaChart,XAxis,YAxis,Tooltip,Area,CartesianGrid } from 'recharts'

export const CustomLineChart = ({datas}) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={datas}>
        <defs>
          <linearGradient id='incomeGradient' x1="0" x2="0" y1="0" y2="1">
            <stop offset="5%" stopColor='#875cf5' stopOpacity={0.4} />
            <stop offset="95%" stopColor='#875cf5' stopOpacity={0.4} />
          </linearGradient>
        </defs>
        <XAxis dataKey='date' stroke='none' tick={{fontSize:12,fill:"#555"}}/>
        <YAxis stroke='none' tick={{fontSize:12,fill:"#555"}}/>
        <CartesianGrid stroke='none'/>
        <Tooltip/>
        <Area type='monotone' dataKey='amount' stroke='#875cf5' fill='url(#incomeGradient)' strokeWidth={3} dot={{r:3,fill:"#abcefc"}}/>
      </AreaChart>
    </ResponsiveContainer>
  )
}
