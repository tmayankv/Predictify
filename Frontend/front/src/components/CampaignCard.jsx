import { useEffect } from "react"
import { daysLeft } from "../utils"
import { useNavigate } from 'react-router-dom'

const CampaignCard = ({campaign}) => {
    console.log(campaign)
    const navigate = useNavigate()
  return (
    <div className="text-white border-solid border flex flex-col gap-4 border-gray-500 p-4 rounded-xl w-[370px] max-lg:w-[430px] ">
        <img src={campaign.image} className="rounded-t-3xl w-full h-[260px]" alt="" />
        <div className="text-3xl text-center font-bold truncate">{campaign.title}
        </div>

        <div className="truncate text-xl text-center text-gray-500">{campaign.description}</div>
        <div className="flex justify-between">
            <span className="rounded-2xl shadow-slate-700 shadow-md border-solid items-center p-4 flex flex-col">
                <span className="text-3xl font-bold">
                    {daysLeft(campaign.deadline)}</span>
                <span className="text-slate-500">Days Left</span>
            </span>
            <span className="rounded-2xl shadow-slate-700 shadow-md border-solid items-center p-4 flex flex-col">
                <span className="text-3xl font-bold">
                    {campaign.amountCollected} <span className="text-lg">ETH</span></span>
                <span className="text-slate-500 ">Raised of {campaign.target} ETH</span>
            </span>
        </div>
            <div className="text-lg flex truncate mt-1 text-gray-600 flex-col ">
                <div className="self-center">Created By:</div>
                    {campaign.owner}
                </div>
                <button className="bg-blue-500 text-2xl rounded-3xl p-3" onClick={()=>navigate(`/campaign-details/:${campaign.id}`, { state: campaign })}>Raise Funds</button>
    </div>
  )
}

export default CampaignCard