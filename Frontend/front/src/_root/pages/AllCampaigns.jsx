import React, {useState, useEffect} from 'react'
import CampaignCard from '../../components/CampaignCard';
import { useStateContext } from '../../context/StateContext';
import { LucideLoaderCircle } from 'lucide-react';

const AllCampaigns = () => {
  const { getCampaigns, contract, address, isLoading } =useStateContext();
  const [Data, setData] = useState([])
const getDetail = async () =>{
  const data= await getCampaigns()
  setData(data)
}
useEffect(() => {
  if(contract) getDetail()
}, [address,contract])
  return (
    <div className={`flex rounded-xl p-2 gap-5 flex-wrap justify-center ${isLoading && 'h-screen'} ${Data && 'h-max'}`} style={{ background: 'linear-gradient(to top, rgba(82, 130, 224, 0.41), rgba(0, 0, 0, 0.8))', backdropFilter: 'blur(10px)' }}>
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
        <div className={`${isLoading && "hidden"} text-white text-2xl`}>
          No Campaigns are active at the moment
        </div>
      )}
    
    </div>
  )
}

export default AllCampaigns
