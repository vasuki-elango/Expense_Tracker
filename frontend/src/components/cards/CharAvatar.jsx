import React from 'react'
import { getInitials } from '../../utils/helper'

export const CharAvatar = ({fullname}) => {
  return (
    <div className='flex items-center justify-center w-20 h-20 bg-slate-200 rounded-full text-2xl mt-14 mb-2'>
        {getInitials(fullname)}
    </div>
  )
}
