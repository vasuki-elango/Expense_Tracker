import React from 'react'

export const DeleteAlert = ({content,onDelete}) => {
  return (
    <div>
        <p>{content}</p>
        <div className='flex justify-end mt-6'>
            <button type="button"
                className='add-btn'
                onClick={onDelete}
            >
                Delete
            </button>
        </div>
    </div>
  )
}
