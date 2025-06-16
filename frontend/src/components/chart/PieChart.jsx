import { PieChart as RechartsPieChart, Pie, ResponsiveContainer, Cell, Tooltip, Legend } from 'recharts';

export const PieChart = ({ data, color, label, showTextAnchar, totalIncome = 500 }) => {


    const customTooltip = ({ active, payload }) => {
        if (active && payload) {
            return (
                <div className='bg-white p-2 rounded-lg shadow-md border border-gray-300'>
                    <p className='text-xs font-semibold text-purple-800'>{payload[0].name}</p>
                    <p className='text-sm text-gray-900 font-semibold'>Amount: <span>${payload[0].value}</span> </p>
                </div>
            )
        }
    }

    const customLegend = ({ payload }) => {
        return (
            <div className='flex flex-wrap justify-center gap-2 mt-4 space-x-8'>
                {
                    payload.map((entry, index) => (
                        <div key={`legend-${index}`} className='flex items-center space-x-2'>
                            <div className='w-2.5 h-2.5 rounded-full' style={{ backgroundColor: entry.color }}></div>
                            <span className='text-sm font-medium text-gray-700'>
                                {entry.value}
                            </span>
                        </div>
                    ))
                }
            </div>
        )
    }

    return (

        <ResponsiveContainer width="100%" height={400}>
            <RechartsPieChart>
                <Pie data={data} dataKey="amount" outerRadius={150} innerRadius={120} nameKey="name" cx="50%" cy="50%" labelLine={false} >
                    {
                        data.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={color[index % color.length]} />
                        ))
                    }
                    {/* <Label
                            value={totalIncome}
                            position="center"
                            style={{ fontSize: 18, fill: "#333" }}
                        /> */}
                </Pie>
                <Tooltip content={customTooltip} />
                <Legend content={customLegend} />


                <text x="50%" y="50%" dy={-25} textAnchor="middle" fill="#777" fontSize="14px">{label}</text>
                <text x="50%" y="50%" dy={8} textAnchor='middle' fill='#333' fontSize='24px'>${totalIncome}</text>
            </RechartsPieChart>

        </ResponsiveContainer>
    )
}
