import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { CampaignBanner } from '../../components'
import { daysLeft } from '../../utils'
import { useStateContext } from '../../context/StateContext'
const CampaignDetails = () => {
  const { state }  = useLocation()
  const [amount, setamount] = useState("")
  const [Donators, setDonators] = useState([])
  const { donate, getDonations, contract, address, showBar} = useStateContext()
  
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
    <div className={`flex flex-col gap-8 text-white items-center ${showBar ? 'lg:w-[75vw] xl:w-[84vw] w-[90vw] max-[470px]:w-[80vw]' : 'md:w-[95vw] xl:w-[98vw]'} justify-center`}>
    <div className=" w-full bg-gradient-to-l from-violet-600 to-transparent rounded-2xl p-7 text-center">
      <span className="lg:text-2xl text-md font-bold rounded-xl bg-gradient-to-r from-black to-transparent p-2">
      CAMPAIGN DETAILS 
      </span>
      </div>
    <div className=' bg-gradient-to-r from-slate-300 to-transparent rounded-xl flex justify-between w-11/12 md:flex-row flex-col items-center p-2'>
      <img src={state.image} className="rounded-t-xl w-1/2" alt="" />
      <div className="flex items-center justify-center mb-8 w-1/4"><CampaignBanner campaign={Donators.length} banner= {Donators.length >1 ? "peoples has already donated to this campaign" : "person has already donated to this campaign"} /></div>
      <div className='flex flex-col gap-2 justify-evenly lg:mr-10 mr-0'>
        <CampaignBanner campaign= {daysLeft(state.deadline)} banner='Days Left'/>
        <CampaignBanner campaign= {state.amountCollected} banner=' ETH are Raised'/>
        <CampaignBanner campaign= {state.target} banner='To be Raised'/>

      </div>
    </div>
    <div className=' bg-gradient-to-r from-violet-800 to-transparent rounded-xl flex flex-col p-7 w-full text-sm'>
      <div className="text-lg font-bold flex gap-5 flex-col uppercase">
        {state.title} :
      <div className="text-slate-400 lg:text-xl text-sm"> {state.description}</div>
      <div className="text-2xl">{state.amountCollected}
      <span className=" text-sm font-normal italic"> ETH are raised of {state.target} ETH </span></div>
      <div className="mt-5">
        Campaign Raised By:
       <div className=" ml-12 text-sm md:text-2xl text-gray-400 max-[450px]:truncate">
         {state.owner}
        </div>
      </div>
      <div className="flex gap-2 flex-col">
          <input type="number" className="bg-black rounded-xl p-1 scale-100 max-[450px]:scale-90" value={amount} placeholder='0.15 ETH' onChange={(e) => setamount(e.target.value) }/>
      <button className=" bg-gradient-to-r from-transparent to-black rounded-2xl p-2 md:p-4 hover:bg-black transition-all duration-700" onClick={handleDonate}>Raise Fund</button>
      </div>
      </div>
    </div>

    </div>
  )
}

export default CampaignDetails