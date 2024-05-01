import { Outlet, useNavigate } from 'react-router-dom';
import  Topbar from '../components/Topbar';
import  Sidebar  from '../components/Sidebar';
import { useStateContext } from '../context/StateContext';
import { Menu, CircleX} from 'lucide-react';
import Footer from '../components/Footer';
import { Loader } from '../components';
const RootLayout = () => {
const {showBar, setshowBar,isLoading}= useStateContext()
console.log(localStorage.getItem('authentication'))
  return (
    <div className={`flex bg-slate-950 p-2 max-h-screen overflow-y-auto max-w-screen overflow-x-auto `}>
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
    <div className=" h-screen pt-5 rounded-lg mt-10 ">
     
      <Outlet />
      
      <hr className='mt-10 px-5' />
    <Footer />
    </div>
      </div>
  </div>
  )
}

export default RootLayout