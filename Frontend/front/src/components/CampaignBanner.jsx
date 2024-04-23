import React from 'react'

const CampaignBanner = ({campaign, banner}) => {
  return (
    <div className="p-5 pt-0 md:bg-gradient-to-r bg-gradient-to-b from-transparent  to-black rounded-xl flex flex-col text-center items-center gap-2">
      <span className="font-bold text-xl border-1px border border-t-0 border-white px-5 pb-3 ">{campaign}</span>
      <span className="text-sm text-gray-400"> {banner}</span>
      </div>
  )
}

export default CampaignBanner