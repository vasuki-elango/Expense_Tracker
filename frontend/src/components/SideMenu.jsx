import { useContext } from 'react'
import { SIDE_MENU_DATA } from '../utils/data'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import { CharAvatar } from './cards/CharAvatar'

export const SideMenu = ({ activeMenu }) => {
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const user = useContext(UserContext)
  return (
    <div className='w-64 h-full bg-white border-r border-gray-200/50 p-3'>
      <div className='flex flex-col items-center justify-center gap-3 mb-4'>
        <div className='w-24 h-24 mt-14 mb-2'>

          {
            user?.user.profileURL ? <img src={user?.user.profileURL || 0} alt="profile_image" className=' object-cover rounded-full w-full h-full' /> : <CharAvatar fullname={user?.user.fullname || ""} />
          }
        </div>

        <h5 className='text-gray-950 leading-0 font-medium'>{user?.user.fullname || "test1"}</h5>
      </div>

      {
        SIDE_MENU_DATA.map((item, index) => {
          return (<Link
            key={`menu_${index}`}
            className={`w-full flex items-center gap-4 ${activeMenu === item.label ? "text-white bg-violet-500" : "none"} py-3 px-6 rounded-lg mb-3  `}
            to={item.path} onClick={() => {
              if (item.label === "Logout") {
                logout()
              }
            }}>
            <item.icon className='text-xl' />{item.label}
          </Link>
          )
        })
      }
    </div>
  )
}
