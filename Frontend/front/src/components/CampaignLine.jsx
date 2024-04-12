import { daysLeft } from "../utils"
const CampaignLine = ({title, deadline, collection, campaignImage}) => {
  return (
    <div className="flex justify-between items-center mb-2 p-2 rounded-xl px-4 bg-violet-900 text-white shadow-inner shadow-neutral-800">
      <div className="capitalize w-full mr-2">
        {title} campaign has collected {collection} of ETH and will be expired after the span of {deadline !== 'number'? daysLeft(deadline):deadline} days
    </div>
    <div className="w-[70px] lg:w-[154px]">
      <img src={campaignImage}  style={{ borderRadius:"20%", boxShadow:"3px 1px 10px black"}} alt="" />
    </div>
    </div>
  )
}

export default CampaignLine
