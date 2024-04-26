import { Outlet, useNavigate } from 'react-router-dom';
import  Topbar from '../components/Topbar';
import  Sidebar  from '../components/Sidebar';
import { useStateContext } from '../context/StateContext';
import { Menu, CircleX} from 'lucide-react';
const RootLayout = () => {
const {showBar, setshowBar}= useStateContext()

  return (
    <div className={`flex bg-slate-900 p-2 max-h-screen overflow-y-auto max-w-screen overflow-x-auto `}>
      <div className={`flex ${showBar && "mr-1"}`}>
      <Sidebar showBAr={showBar}/>
      </div>
      <div className="mt-2 w-full">
        <div className="flex justify-between gap-2 w-full items-center">
     <div className="">
     <div className='text-white flex cursor-pointer hover:bg-white hover:text-violet-500 p-1 rounded-full' onClick={()=> setshowBar(!showBar)}>{showBar? <CircleX/> :<Menu />}
     </div>
     </div>
      <div className='w-full'>
      <Topbar />
      </div>
        </div>
    <div className="bg-slate-900 h-screen mt-10">
      <Outlet />
    </div>
      </div>
  </div>
  )
}

export default RootLayout