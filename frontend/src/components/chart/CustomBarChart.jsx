import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

export const CustomBarChart = ({ datas = [] }) => {
    
    const getBarColor = (index) => {
        return index % 2 === 0 ? "#815cf5" : "#cfbefb"
    }

    const customeTootlip = ({active,payload}) =>{
        if( active && payload && payload.length ){
            return (
                <div className='bg-white shadow-md rounded-lg p-2 border border-gray-300'>
                    <p className='text-xs font-semibold text-purple-800 mb-1'>{payload[0].payload.category}</p>
                    <p className='text-sm font-medium text-gray-900'> Amount : <span>{payload[0].payload.amount}</span></p>
                </div>
            )
        }
        return null;
    }
    return (
        <div className='w-full h-[350px]'>
            <ResponsiveContainer>
                <BarChart data={datas}>
                    <CartesianGrid stroke="none" />
                    <Bar 
                        name="name"
                        dataKey="amount" 
                        fill="#ff8042" 
                        radius={[10, 10, 0, 0]} 
                        activeDot={{ fill: 'yellow', r:8 }}
                        activeStyle={{fill:"green"}}
                    >
                        {
                            datas.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={getBarColor(index)} />
                            ))
                        }
                    </Bar>
                    <XAxis dataKey="date" tick={{ fill: '#555' }} />
                    <YAxis tick={{ fill: '#555' }} />
                    <Tooltip 
                       content={customeTootlip}
                    />
                </BarChart>
            </ResponsiveContainer>

        </div>
    )
}
