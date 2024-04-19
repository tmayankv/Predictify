import { useState, useEffect} from "react";
import { useStateContext } from "../../context/StateContext"
import CampaignLine from "../../components/CampaignLine";
import { Link } from "react-router-dom";
import NewsBar from "../../components/NewsBar";
import Area from "../../components/charts/Area";

const Home = () => {
  const { getUserCampaigns, contract, address, isLoading } =useStateContext();
  const [Data, setData] = useState([])
  console.log(address)
const getDetail = async () =>{
  const data= await getUserCampaigns()
  console.log(data)
  setData(data)
}
useEffect(() => {
  if(contract) getDetail()
}, [address,contract])

  return (
    <div className={`p-2 flex gap-2 ${ Data.length === 0  && 'justify-between'} rounded-md max-[815px]:flex-col flex-nowrap mt-1 h-full ${isLoading? 'flex-col h-screen':''} overflow-hidden`}>
      
      <div className="p-2">
        {!isLoading && <h1 className="text-center font-bold text-xl lg:text-2xl text-white italic">
        Your Campaigns
        </h1>}
        <div className="mt-3 w-full text-xs md:text-md">
        {!isLoading? Data.slice(0,5)?.map((campaign) =>(
          <CampaignLine key={campaign.id} title={campaign.title} deadline={campaign.deadline} collection={campaign.amountCollected} campaignImage={campaign.image}/>
        ))
        :( <div className="text-center text-white text-2xl">
          Loading.....
          </div>
        )}
      {!isLoading && <div className="flex flex-col md:items-center text-white">
      Your Have {Data.length} Campaigns that are currently Live.
      <Link to="/all-campaigns" className="font-bold hover:underline">Get More Details- </Link>
      </div>}
      </div>
      </div>
      {!isLoading &&
      <div className="flex flex-col items-center w-full xl:w-1/2 gap-2">
        <NewsBar />
        <Area />
      </div>}
    </div>
  )
}

export default Home