import card from '../../assests/images/bar-chart.jpg'
import {LuTrendingUpDown} from 'react-icons/lu'

export const Autolayout = ({children}) => {
  return (
     <div className='flex'>
            <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12'>
                <h2 className='text-lg font-medium '>Expense Tracker</h2>
                {children}
            </div>
            <div className='hidden md:block w-[40vw] h-screen bg-violet-50 bg-auto-bg-img bg-no-repeat bg-center overflow-hidden p-8 relative'>
                <div className='w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-8 -left-9'></div>
                 <div className='w-48 h-48 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-[30%] -right-12'></div>
                <div className='w-48 h-48 rounded-[40px] bg-purple-500 absolute -bottom-7 -left-9'></div>
                <div className='grid grid-cols-1 absolute z-20 w-[80%]'>
                    <InfoCard/>
                </div>
                    <img src={card} alt='card' className='w-64 h-[50%] lg:w-[90%] absolute bottom-10 rounded-xl shadow-md object-cover'/>
            </div>
        </div>
  )
}

const InfoCard = () =>{
    return <div className='flex bg-white w-full items-center p-4 gap-5 rounded-xl'>
        <div className='flex items-center justify-center w-12 h-12 bg-purple-600 rounded-full text-[26px] p-2 text-white shadow-md shadow-purple-700/50'>
            <LuTrendingUpDown/>
        </div>
        <div>
            <h6 className='text-gray-400 text-sm'>Track Your Income & Expenses</h6>
            <span>₹430,000</span>
        </div>
    </div>
}
