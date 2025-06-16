import React from 'react';

export const InfoCard = ({ title, value, icon, color }) => {
    return (
        <div className="flex items-center gap-6 bg-white p-6 rounded-2xl shadow-md shadow-gray-500/15">
            <div className={`w-14 h-14 flex items-center justify-center ${color} rounded-full drop-shadow-md text-[26px] text-white`}>
                {icon}
            </div>

            <div className=''>
                <h6 className='text-sm text-gray-500'>{title}</h6>
                <span className="text-xl ">${value}</span>
            </div>
        </div>
    );
};
