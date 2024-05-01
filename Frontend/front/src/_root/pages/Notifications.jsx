import { LucideBellDot } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useStateContext } from '../../context/StateContext';
const Notifications = () => {
   const {notifications,  fetchCardsData,fetchExpenses,fetchIncome,} = useStateContext() 
    useEffect(()=>{
      fetchCardsData()
      fetchExpenses()
      fetchIncome()
    },[])
  localStorage.setItem('notifications',JSON.stringify(notifications));
  return (
    <div className="mx-auto px-4 py-8 w-[75vw] md:w-[83vw] xl:w-[86vw]">
      <h1 className="text-xl md:text-3xl font-bold mb-6 text-center text-white">Notifications</h1>
      <div className="flex flex-col gap-2">
        {notifications.map((notification,i) => (
          <div
            key={i}
            className={` text-white p-4  rounded-lg ${
              notification.read ? 'bg-gray-100' : 'bg-white'
            }`}
            style={{ background: 'linear-gradient(to top, rgba(62, 100, 224, 0.51), rgba(0, 0, 0, 0.8))', backdropFilter: 'blur(10px)' }}
          >
            <div className='flex justify-between items-center'>
                <div>

            <h2 className="text-lg max-[500px]:text-sm font-semibold">{notification.title}</h2>
            <p className="text-gray-400">{notification.val}</p>
            <p className="text-sm text-gray-300">{notification.msg}</p>
                </div>
            
            <p className='bg-blue-600 p-2 rounded-full text-white'>
            <LucideBellDot />
            </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
