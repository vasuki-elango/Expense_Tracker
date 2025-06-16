import React, { useState } from 'react'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'
import { SideMenu } from './SideMenu'

export const Navbar = ({ activeMenu }) => {
    const [openSideMenu, setopenSideMenu] = useState(false)
    return (
        <div className='flex gap-5 p-5 bg-white border-gray-200  border-b shadow-gray-200/50 shadow-md w-full backdrop-blur z-10 sticky top-0'>
            <button onClick={() => setopenSideMenu(!openSideMenu)}
                className='block text-2xl lg:hidden'>
                {
                    openSideMenu ? (
                        <HiOutlineX />
                    ) : (
                        <HiOutlineMenu />
                    )
                }
            </button>
            <h2 className='font-medium text-xl'>Expense Tracker</h2>
            {
                openSideMenu && (
                    <div className='fixed h-[calc(100vh-61px)] top-16 left-0'>
                        <SideMenu activeMenu={activeMenu} />
                    </div>
                )
            }
        </div>
    )
}
