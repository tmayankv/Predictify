import { useState, useEffect} from "react";
import { useStateContext } from "../../context/StateContext"

const Home = () => {
  const { getCampaigns, contract, address } =useStateContext();
  const [Data, setData] = useState([])
  const [isLoading, setisLoading] = useState(true)

const getDetail = async () =>{
  setisLoading(true)
  const data= await getCampaigns()
  console.log(data)
  setisLoading(false)
  setData(data)
}
useEffect(() => {
  if(contract) getDetail()
}, [address,contract])

  return (
    <div className="flex bg-slate-500 p-2 rounded-2xl mt-1 w-full home-height">
      
      <div className=" bg-slate-200 rounded-xl h-[50%] p-2">
        <h1 className="text-center font-bold text-xl italic">
        Your Campaigns
        </h1>
        
      </div>
    </div>
  )
}

export default Home