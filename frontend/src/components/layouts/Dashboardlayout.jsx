import { Navbar } from '../Navbar'
import { SideMenu } from '../SideMenu'

export const Dashboardlayout = ({ activeMenu,children }) => {
  const token = localStorage.getItem('token');
  return (
    <div>
        <Navbar activeMenu={activeMenu}/>
        {
          token && (
            <div className='flex'>
              <div className='max-[1080px] hidden md:flex'>
                <SideMenu activeMenu={activeMenu}/>
              </div>
              <div className=' grow mx-5 '>{children}</div>
            </div>
          )
        }
    </div>
  )
}
