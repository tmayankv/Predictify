import { useState, useEffect} from "react";
import { useStateContext } from "../../context/StateContext"
import CampaignLine from "../../components/CampaignLine";
import { Link } from "react-router-dom";
import NewsBar from "../../components/NewsBar";
import Area from "../../components/charts/Area";
import { LucideCopy, LucideCopyCheck, Wallet2} from "lucide-react";
import { CustomButton, HomeBox } from "../../components";
const Home = () => {
  const { getUserCampaigns, contract, connect, address, isLoading, walletBalance, isAuth} =useStateContext();
  const [Data, setData] = useState([])
  const [isCopied, setIsCopied] = useState(false)

const getDetail = async () =>{
  const data= await getUserCampaigns()
  console.log(data)
  setData(data)
}
const handleCopy =() =>{
  navigator.clipboard.writeText(address) 
            setIsCopied(!isCopied)
} 
const monthsArray = [
  'January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'
];
console.log(isCopied)
useEffect(() => {
  if(contract) getDetail()
}, [address,contract])

  return (
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 flex-shrink justify-evenly mx-3 flex-col md:flex-row"> 
          <HomeBox title={"Wallet's Balance"} icon1={<Wallet2 size={18} />} msg={`${walletBalance} ETH`} />
          <HomeBox title={`${monthsArray[new Date().getMonth()]} Month Income`} icon1={<Wallet2 size={18} />} msg={'Rs 125000'} />
          <HomeBox title={`${monthsArray[new Date().getMonth()]} Month Expenses`} icon1={<Wallet2 size={18} />} msg={''} />
        </div>
        <div className="flex gap-2 mx-2">
        <div className="p-3 flex flex-col gap-3 rounded-xl md:w-1/2 text-white inset-1 shadow-black shadow-lg" style={{background:"url(https://imgs.search.brave.com/NfXq1AqhEtWcwCxZp44UGveo_T5i6zaSmXJdSloUJb8/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAxLzI2LzU5LzE4/LzM2MF9GXzEyNjU5/MTg2M19lMkNLNEk5/YWZOOEpSVkZ2ZzFw/ZUwydFNFdWdjM1Fx/WC5qcGc) center no-repeat"}}>
         <div>
           Welcome Back,
          <div className="capitalize ml-16 text-2xl">{localStorage.getItem('username')}</div>
          </div>
          <div>Glad to see you here!
          <div>All Your records have been fetched</div>
          {(connect && address)?(
            <div> Here is your wallet address
          <div className="text-xs flex gap-2 mt-2 items-center"> {address} 
          <p className="cursor-pointer">
          {!isCopied ?
          (<LucideCopy onClick={() =>{ 
            handleCopy()
          }} />):(
          <LucideCopyCheck/>
          )           }
          </p>
          </div>
          </div>):(
              <div className="flex flex-col md:w-1/2 gap-2 mt-3"> Click Here to connect to Wallet
              
              <p className="w-1/2 ">
             <CustomButton btnType={"button"} title={"Connect to Wallet"} handleClick={() => connect()} styles={"bg-indigo-500"} />
                </p> 
              </div>)
          
        }
          </div>
        </div>
        <div className="p-3 rounded-xl md:w-3/4  w-1/2 bg-gradient-to-b from-indigo-900 to-black text-white">
          Welcome Back,
          <div></div>
        </div>
        </div>
    <div className={`p-2 flex gap-2 ${ Data?.length === 0  && 'justify-around'} rounded-md max-[850px]:flex-col flex-nowrap mt-1 h-full ${isLoading? 'flex-col h-screen':''}`}>
      
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
        <Area />
        <NewsBar />
      </div>}
    </div>
        </div>
  )
}

export default Home