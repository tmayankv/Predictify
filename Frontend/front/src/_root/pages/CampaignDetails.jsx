import React, { useEffect, useState } from 'react'
import CampaignBanner from '../components/CampaignBanner'
import { useLocation } from 'react-router-dom'
import { daysLeft } from '../utils'
import { useStateContext } from '../context/StateContext'
const CampaignDetails = () => {
  const { state }  = useLocation()
  const [amount, setamount] = useState("")
  const [Donators, setDonators] = useState([])
  const { donate, getDonations, contract, address} = useStateContext()
  
  console.log(state)
  const handleDonate = async() => {
    await donate(state.id,amount)

  }
  useEffect(() => {
    if(contract) fetchDonators();
  }, [contract, address])

  const fetchDonators = async () => {
    const data = await getDonations(state.id)
    setDonators(data);
  }
  Donators?.map((data) => {
    state.amountCollected =+ data.donation;
}
)
  
  return (
    <div className="flex flex-col gap-10 text-white items-center">
    <div className=" w-full bg-gradient-to-l from-blue-600 to-transparent rounded-2xl p-7 text-center">
      <span className="text-4xl font-bold rounded-xl bg-gradient-to-r from-black to-transparent p-2 px-16">
      CAMPAIGN DETAILS 
      </span>
      </div>
    <div className=' bg-gradient-to-r from-slate-300 to-transparent rounded-xl flex justify-between p-3 w-11/12'>
      <img src={state.image} className="rounded-t-xl w-1/2" alt="" />
      <div className="flex items-center mb-8 w-1/4"><CampaignBanner campaign={Donators.length} banner="peoples already donated to this campaign" /></div>
      <div className='flex flex-col gap-2 justify-evenly lg:mr-10 mr-0'>
        <CampaignBanner campaign= {daysLeft(state.deadline)} banner='Days Left'/>
        <CampaignBanner campaign= {state.amountCollected} banner=' ETH are Raised'/>
        <CampaignBanner campaign= {state.target} banner='To be Raised'/>

      </div>
    </div>
    <div className=' bg-gradient-to-r from-blue-800 to-transparent rounded-xl flex flex-col p-3 w-full'>
      <div className="text-3xl font-bold flex gap-5 flex-col uppercase">
        {state.title} :
      <div className="text-slate-400 text-xl"> {state.description}</div>
      <div>{state.amountCollected}
      <span className=" text-sm font-normal italic"> ETH are raised of {state.target} ETH </span></div>
      <div className="mt-5 text-xl">
        Campaign Raised By:
       <div className="text-center text-gray-400">
         {state.owner}
        </div>
      </div>
      <div className="flex gap-2 flex-col">
          <input type="number" className="bg-black rounded-xl p-2" value={amount} placeholder='0.15 ETH' onChange={(e) => setamount(e.target.value) }/>
      <button className=" bg-gradient-to-r from-transparent to-black rounded-2xl p-4 hover:bg-black transition-all duration-700" onClick={handleDonate}>Raise Fund</button>
      </div>
      </div>
    </div>

    </div>
  )
}

export default CampaignDetails