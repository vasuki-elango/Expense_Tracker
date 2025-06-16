import React from 'react'
import { LuExpand, LuTrash2, LuTrendingDown, LuTrendingUp } from 'react-icons/lu'

export const TransactionInfoCard = ({ title, icon, date, amount, type, onDelete ,hideDeleteBtn}) => {
  const getelementStyle = () =>
    type === "income" ? "bg-green-50 text-green-400" : "bg-red-50 text-red-400"

  return (
    <div className='flex items-center justify-between my-4 hover:bg-gray-100 p-2 rounded-lg '>
      <div className='flex items-center gap-3 '>
        <div className='w-12 h-12 flex items-center justify-center text-xl bg-slate-100 rounded-full'>
          {
            icon ? <img src={icon} alt='icon' className='w-6 h-6' /> : <LuExpand />
          }
        </div>
        <div className='text-sm '>
          <p className='font-medium text-gray-700'>{title}</p>
          <p className='text-gray-400'>{date}</p>
        </div>
      </div>
      <div className='flex items-center gap-2'>
        {
          !hideDeleteBtn && (
            <button 
              className='text-gray-500  hover:text-red-600'
              onClick={onDelete}
            >
              <LuTrash2 size={18}/>
            </button>
          )
        }
        <div className={`flex items-center gap-2 text-xs font-medium py-1.5 px-3 rounded-md  ${getelementStyle()}`}>
          <h6>
            {
              type === "income" ? "+" : "-"
            }
            ${amount}
          </h6>
          {
            type === "income" ? <LuTrendingUp /> : <LuTrendingDown />
          }
        </div>
      </div>
    </div>
  )
}
