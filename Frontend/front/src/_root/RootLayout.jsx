import { Outlet, useNavigate } from 'react-router-dom';
import  Topbar from '../components/Topbar';
import  Sidebar  from '../components/Sidebar';
import { useStateContext } from '../context/StateContext';
import { Menu, CircleX} from 'lucide-react';
const RootLayout = () => {
const {showBar, setshowBar, isAuth}= useStateContext()
const navigate = useNavigate()
// {!isAuth && navigate('/login')}
  return (
    <div className={`flex bg-slate-900 p-2 h-full`}>
      <div className={`flex ${showBar && "mx-2"}`}>
      <Sidebar showBAr={showBar}/>
      </div>
      <div className="mt-2 w-full">
        <div className="flex justify-between gap-2 w-full items-center">

     <div className='text-white sm:hidden lg:block cursor-pointer hover:bg-white hover:text-violet-500 p-1 rounded-full' onClick={()=> setshowBar(!showBar)}>{showBar? <CircleX/> :<Menu />}</div>
      <div className='w-full'>
      <Topbar />
      </div>
        </div>
    <div className="mt-2 ">
      <Outlet />
    </div>
      </div>
  </div>
  )
}

export default RootLayout