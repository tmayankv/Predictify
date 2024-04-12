import { useState, useEffect} from "react";
import { useStateContext } from "../../context/StateContext"
import CampaignLine from "../../components/CampaignLine";
import { Link } from "react-router-dom";
import NewsBar from "../../components/NewsBar";
import Area from "../../components/charts/Area";

const Home = () => {
  const { getCampaigns, contract, address, isAuth, isLoading } =useStateContext();
  const [Data, setData] = useState([])
const getDetail = async () =>{
  const data= await getCampaigns()
  console.log(data)
  setData(data)
}
useEffect(() => {
  if(contract) getDetail()
}, [address,contract])

  return (
    <div className={`bg-slate-500 p-2 flex rounded-2xl justify-center md:flex-wrap mt-1  h-[200vh]`}>
      
      <div className="p-2 sm:text-lg text-xl md:w-full">
        <h1 className="text-center font-bold lg:text-2xl italic underline">
        Your Campaigns
        </h1>
        <div className="mt-3 w-[60%] md:w-full">
        {!isLoading? Data.slice(0,5)?.map((campaign) =>(
          <CampaignLine key={campaign.id} title={campaign.title} deadline={campaign.deadline} collection={campaign.amountCollected} campaignImage={campaign.image}/>
        ))
        :( <div className="text-center text-2xl">
          Loading
          </div>
        )
      }
      {!isLoading && <div className="flex flex-col md:items-center">
      Your Have {Data.length} Campaigns that are currently Live.
      <Link to="/all-campaigns" className="text-green-500 font-bold underline">Get More Details-</Link>
      </div>}
      </div>
      </div>
      <div className="flex flex-col">
        <NewsBar />
    <Area />
      </div>
    </div>
  )
}

export default Home