import { daysLeft } from "../utils"
const CampaignLine = ({title, deadline, collection, campaignImage}) => {
  return (
    <div className="flex justify-between items-center mb-2 p-2 rounded-md px-4 bg-indigo-800 text-white shadow-inner shadow-neutral-800">
      <div className="capitalize w-full mr-2 text-white">
        {title} campaign has collected {collection} of ETH and will be expired after the span of {deadline !== 'number'? daysLeft(deadline):deadline} days
    </div>
    <div className="w-[70px] lg:w-[154px]">
      <img src={campaignImage} className=" h-9 lg:h-20"  style={{ borderRadius:"10%", width:"100%"}} alt="" />
    </div>
    </div>
  )
}

export default CampaignLine
