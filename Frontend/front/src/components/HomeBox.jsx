import { Wallet } from 'lucide-react';
import React from 'react';

const HomeBox = ({ title, icon1, msg }) => {
  const months= ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  return (
    <div className="relative flex flex-col text-white p-2 rounded-xl w-full backdrop-blur-lg">
      <div className="absolute inset-0 rounded-xl pointer-events-none bg-slate-950" style={{ background: 'linear-gradient(to top, rgba(62, 100, 224, 0.61), rgba(0, 0, 0, 0.8))', backdropFilter: 'blur(10px)' }}></div>
      <div className="relative z-10 ">
        <div className="text-sm  opacity-100 w-full">
          <div className="flex items-center mb-2 text-gray-400 truncate">
            {title}
          </div>
        </div>
        <div className="flex items-center text-lg w-full gap-5">
         <p>
        {title === 'Wallet\'s Balance' && <Wallet/>}
        {title === `${months[new Date().getMonth()]} Month\'s Income` && <Wallet/>}
        {title === `${months[new Date().getMonth()]} Month\'s Expenses` && <Wallet/>}

         </p>
         <p>{msg}</p>
        </div>
      </div>
    </div>
  );
};

export default HomeBox;
