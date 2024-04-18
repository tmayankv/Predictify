import React, {useState, useEffect} from 'react'
import CampaignCard from '../../components/CampaignCard';
import { useStateContext } from '../../context/StateContext';
import { LucideLoaderCircle } from 'lucide-react';

const AllCampaigns = () => {
  const { getCampaigns, contract, address, isLoading } =useStateContext();
  const [Data, setData] = useState([])
  const [bothCond, setBothCond] = useState([])
  

  console.log(address)
const getDetail = async () =>{
  const data= await getCampaigns()
  console.log(data)
  setData(data)
}
useEffect(() => {
  if(contract) getDetail()
}, [address,contract])
console.log(Data)

  return (
    <div className={`flex gap-5 flex-wrap justify-center ${isLoading && 'h-screen'} ${Data && 'h-screen'}`}>
      {isLoading &&
      <div className="text-white text-2xl">
        <LucideLoaderCircle />
      </div>
}
{Data.length >0? (
        Data.map((campaign) => (
          <CampaignCard campaign={campaign} key={campaign.id} />
        ))
      ) : (
        <div className="text-white text-2xl">
          No Campaigns are active at the moment
        </div>
      )}
    
    </div>
  )
}

export default AllCampaigns
