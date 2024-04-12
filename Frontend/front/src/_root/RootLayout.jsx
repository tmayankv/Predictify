import { Outlet } from 'react-router-dom';
import  Topbar from '../components/Topbar';
import  Sidebar  from '../components/Sidebar';
import { useState } from 'react';
import CustomButton from '../components/CustomButton';
import { useStateContext } from '../context/StateContext';
const RootLayout = () => {
const {showBar, setshowBar}= useStateContext()
  return (
    <div className='w-full flex bg-slate-900 h-full'>
      <div className="m-2 flex">
      <Sidebar showBAr={showBar}/>
      </div>
      <div className="mt-2 mr-1 w-full">
        <div className="flex justify-between gap-2 w-full">

     <button className='text-white sm:hidden lg:block' onClick={()=> setshowBar(!showBar)}>show</button>
      <div className='w-full'>
      <Topbar />
      </div>
        </div>
    <div className="mt-2">
      <Outlet />
    </div>
      </div>
  </div>
  )
}

export default RootLayout