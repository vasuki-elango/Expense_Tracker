import React from 'react'

export const Model = ({ children, title, isOpen, onClose }) => {
    if (!isOpen) return null
    return (
        <div className='fixed top-0 right-0 left-0 z-50 flex items-center justify-center w-ful h-[calc(100%-1rem)] overflow-y-auto overflow-x-hidden bg-black/20 bg-opacity-50'>
            <div className='relative p-4 w-full max-w-2xl max-h-full'>
                <div className='relative bg-white rounded-lg shadow-md '>
                    <div className='flex items-center justify-between border-b p-5 dark:border-gray-600 border-gray-200'>
                        <h3 className='text-lg font-medium text-gray-900'>{title}</h3>
                        <button type='button' onClick={onClose}
                            className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-800 rounded-full w-8 h-8 text-sm inline-flex justify-center items-center'
                        >X</button>
                    </div>
                    <div className='p-4'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
