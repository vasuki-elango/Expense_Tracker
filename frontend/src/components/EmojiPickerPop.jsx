import React, { useState } from 'react'
import EmojiPicker from 'emoji-picker-react';
import { LuImage, LuX } from 'react-icons/lu';

export const EmojiPickerPop = ({ icon, onSelect }) => {
    const [isOpen, setisOpen] = useState(false)
    return (
        <div className='flex flex-col md:flex-row items-center md:items-start  gap-5 mb-5'>
            <div onClick={() => setisOpen(true)}>
                <div className='flex items-center gap-4 cursor-pointer'>
                    <div className='w-12 h-12 flex items-center justify-center bg-purple-200 rounded-full'>
                        {
                            icon ? (
                                <img src={icon} alt="icon" className='w-12 h-12' />
                            ) : <LuImage />
                        }

                    </div>
                    <p>{icon ? "Change Icon" : "Pick Icon"}</p>
                </div>
            </div>

            {
                isOpen && <div className='relative'>
                    <button className='w-7 h-7 flex items-center justify-center' onClick={() => setisOpen(false)}>
                        <LuX />
                    </button>

                    <EmojiPicker
                        open={isOpen}
                        onEmojiClick={(emoji) => onSelect(emoji?.imageUrl || "")}
                    />
                </div>
            }
        </div>
    )
}
