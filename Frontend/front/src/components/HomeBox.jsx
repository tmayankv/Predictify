import React from 'react';

const HomeBox = ({ title, icon1, msg }) => {
  return (
    <div className="relative flex flex-col items-start text-white p-2 rounded-xl w-full backdrop-blur-lg">
      <div className="absolute inset-0 bg-gradient-to-b from-black to-blue-800 opacity-30 rounded-xl pointer-events-none"></div>
      <div className="relative z-10">
        <div className="text-sm italic opacity-100">
          <div className="flex items-center gap-1 text-gray-400 truncate">
            {title}
          </div>
        </div>
        <div className="flex items-center gap-1 text-lg">
          <icon1 size={18} />
          {String(msg).length > 4 && (

            <p>
            {String(msg).slice(0, 9)}
            {msg.length > 10 ? String(msg).slice(-3,) : ""}
          </p>
        )
          }
        </div>
      </div>
    </div>
  );
};

export default HomeBox;
