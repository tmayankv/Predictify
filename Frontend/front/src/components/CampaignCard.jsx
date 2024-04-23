import { daysLeft } from "../utils"
import { useNavigate } from 'react-router-dom'

const CampaignCard = ({campaign}) => {
    console.log(campaign)
    const navigate = useNavigate()
  return (
    <div className="text-white border-solid max-[300px]:text-sm border flex flex-col gap-4 border-gray-500 p-4 mb-1 rounded-xl w-[270px] max-[300px]:w-[180px]">
        <img src={campaign.image} className="rounded-t-3xl w-full h-[160px] max-[300px]:h-[100px]" alt="" />
        <div className="text-xl text-center font-bold truncate">{campaign.title}
        </div>

        <div className="truncate text-lg text-center text-gray-500">{campaign.description}</div>
        <div className="flex justify-between gap-3 max-[300px]:text-sm">
            <span className="rounded-2xl border-solid  text-center items-center p-4 flex flex-col">
                <span className="font-bold">
                    {daysLeft(campaign.deadline)}</span>
                <span className="text-slate-500 text-xs">Days Left</span>
            </span>
            <span className="rounded-2xl border-solid items-center justify-center p-4 flex flex-col">
                <span className="font-bold text-center">
                    {campaign.amountCollected} <span className="text-lg">ETH</span></span>
                <span className="text-slate-500 text-xs max-[300px]:hidden">Raised of {campaign.target} ETH</span>
            </span>
        </div>
            <div className="text-md flex truncate mt-1 text-gray-600 flex-col ">
                <div className="self-center">Created By:</div>
                    {campaign.owner}
                </div>
                <button className="bg-violet-700 text-md rounded-3xl p-3  max-[300px]:p-1 " onClick={()=>navigate(`/campaign-details/:${campaign.id}`, { state: campaign })}>Raise Funds</button>
    </div>
  )
}

export default CampaignCard