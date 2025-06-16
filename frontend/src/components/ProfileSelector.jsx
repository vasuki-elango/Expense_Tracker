import React, { useRef, useState } from 'react'
import { LuTrash, LuUpload, LuUser } from 'react-icons/lu'

export const ProfileSelector = ({ image, setImage }) => {
    const [preview, setpreview] = useState(null);
    const inputRef = useRef(null)
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file)
            const fileURl = URL.createObjectURL(file);
            setpreview(fileURl);
        }
    };

    const handleRemoveIamge = () => {
        setpreview(null);
        setImage(null);
    }

    const onchooseFile = () => {
        inputRef.current.click();
    }

    return (
        <div className='flex justify-center mb-3 md:mb-8'>
            <input
                type="file"
                ref={inputRef}
                onChange={handleImageChange}
                accept='image/*'
                className='hidden'
            />
            {
                !image ?
                    <div className='w-20 h-20 bg-slate-200 flex justify-center items-center relative rounded-full'>
                        <LuUser className='w-8 h-8 ' />
                        <button className='absolute -bottom-1 -right-2 flex items-center justify-center bg-purple-500 p-2 rounded-full' onClick={onchooseFile}>
                            <LuUpload />
                        </button>
                    </div>
                    : <div className='w-20 h-20 bg-slate-200 flex justify-center items-center relative rounded-full'>
                        <img src={preview} alt="profile pic" className='w-20 h-20 rounded-full object-cover' />
                        <button className='absolute -bottom-1 -right-2 flex items-center justify-center bg-red-400 p-2 rounded-full' onClick={handleRemoveIamge}>
                            <LuTrash />
                        </button>
                    </div>
            }
        </div>
    )
}
