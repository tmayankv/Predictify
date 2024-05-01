import React from 'react'

const CustomButton = ({ btnType, title, handleClick, styles }) => {
  return (
    <button
      type={btnType}
      className={`font-epilogue font-semibold text-xs lg:text-[16px] leading-[20px] text-white min-h-[52px] md:px-4 rounded-[10px] ${styles}`}
      onClick={handleClick}
      style={{ background: 'rgba(22, 100, 224, 1)' }}
    >
      {title}
    </button>
  )
}

export default CustomButton