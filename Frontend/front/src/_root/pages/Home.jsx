import { useState, useEffect} from "react";
import { useStateContext } from "../../context/StateContext"
import CampaignLine from "../../components/CampaignLine";
import { Link, useNavigate } from "react-router-dom";
import NewsBar from "../../components/NewsBar";
import Area from "../../components/charts/Area";
import { LucideCopy, LucideCopyCheck, Wallet2} from "lucide-react";
import { CustomButton, HomeBox, Loader } from "../../components";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const Home = () => {
  const { getUserCampaigns, contract, connect, address, isLoading, walletBalance, notifications, fetchCardsData, fetchExpenses, fetchIncome,} =useStateContext();
  const [Data, setData] = useState([])
  const [Data1, setData1] = useState([])
  const [Data2, setData2] = useState([])
  const [totalIncome, settotalIncome] = useState('')
  const [totalExpenses, settotalExpenses] = useState('')
  const [isCopied, setIsCopied] = useState(false)
  const navigate =useNavigate()
const getDetail = async () =>{
  const data= await getUserCampaigns()
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
useEffect(() => {
  if(contract) getDetail()
  fetchData();
  fetchData2();
  fetchCardsData();
  fetchExpenses();
  fetchIncome();
}, [address,contract])
const fetchData = async () => {
  try {
    const response = await fetch(`/api/graph/${localStorage.getItem('username')}`);
    if (!response.ok) {
      throw new Error('Failed to fetch graph data');
    }
    const data = await response.json();
    const formattedData = data.map(item => ({
      x: new Date(item.x.year, item.x.month - 1, item.x.day),
      y: item.y,
    }));
    formattedData.sort((a, b) => a.x - b.x);
    setData1(formattedData);

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const currentMonthData = formattedData.filter(item => item.x.getMonth() + 1 === currentMonth && item.x.getFullYear() === currentYear);
    const totalAmount = currentMonthData.reduce((total, item) => total + item.y, 0);
    settotalIncome(totalAmount)
  } catch (error) {
    console.error('Error fetching graph data:', error);
  }
};
const fetchData2 = async () => {
  try {
    const response = await fetch(`/api/expgraph/${localStorage.getItem('username')}`);
    if (!response.ok) {
      throw new Error('Failed to fetch graph data');
    }
    const data = await response.json();
    const formattedData = data.map(item => ({
      x: new Date(item.x.year, item.x.month - 1, item.x.day),
      y: item.y,
    }));
    formattedData.sort((a, b) => a.x - b.x);
    setData2(formattedData);
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const currentMonthData = formattedData.filter(item => item.x.getMonth() + 1 === currentMonth && item.x.getFullYear() === currentYear);
    const totalAmount = currentMonthData.reduce((total, item) => total + item.y, 0);
    settotalExpenses(totalAmount)
  } catch (error) {
    console.error('Error fetching graph data:', error);
  }
};
  return (
      <div className="flex flex-col gap-2 rounded-xl  xl:w-[85vw] max-[500px]:w-[75vw] w-[82vw] sm:ml-16 lg:ml-0 ml-5 "  style={{ background: 'linear-gradient(to top, rgba(82, 130, 224, 0.41), rgba(0, 0, 0, 0.8))', backdropFilter: 'blur(10px)' }}>
       {!isLoading ?
    <>
        <div className="flex gap-2 flex-shrink justify-evenly mx-3  mt-2 flex-col md:flex-row"> 
          <HomeBox title={"Wallet's Balance"} icon1={<Wallet2 size={18} />} msg={`${walletBalance} ETH`} />
          <HomeBox title={`${monthsArray[new Date().getMonth()]} Month's Income`} icon1={<Wallet2 size={18} />} msg={`Rs ${totalIncome}`} />
          <HomeBox title={`${monthsArray[new Date().getMonth()]} Month's Expenses`} icon1={<Wallet2 size={18} />} msg={`Rs ${totalExpenses}`} />
        </div>
        <div className="flex gap-2 mx-2 flex-col md:flex-row mt-2">
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
              <p>
             <CustomButton btnType={"button"} title={"Connect to Wallet"} handleClick={() => connect()} styles={" bg-blue-500"} />
                </p> 
              </div>) 
        }
          </div>
        </div>
        <div className="p-3 rounded-xl md:w-3/4  w-1/2 text-white " style={{background:"url(https://imgs.search.brave.com/17NJxqFtqCUOyGB8MT0pY6FgzAwOf1GCTZjfC9u9jDw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE1/OTAyODM2MDMzODUt/MTdmZmIzYTdmMjlm/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4elpX/RnlZMmg4TVRCOGZH/WnBibUZ1WTJWOFpX/NThNSHg4TUh4OGZE/QT0) center"}}>

          <div >
          </div>
        </div>
        <div className="p-3 rounded-xl md:w-3/4 w-full text-white " style={{ background: 'linear-gradient(to right, rgba(62, 100, 224, 0.21), rgba(0, 0, 0, 0.8))', backdropFilter: 'blur(10px)' }}>
  <h2 className="text-lg font-semibold mb-3">Recent Notifications</h2>
  <ul className="divide-y divide-gray-200">
    {notifications.slice(0,4).map((ele,i)=> (
      <li className="py-2" key={i}>
      <div className="flex items-center justify-between flex-wrap">
        <div className="flex-grow">
          <p className="text-sm text-white">{ele.title}</p>
          <p className="text-xs text-gray-400 truncate w-1/2">{ele.val}</p>
        </div>
        <span className="text-blue-500" onClick={()=> navigate('/notifications')}>View</span>
      </div>
    </li>
    ))}
  </ul>
</div>
        </div>
    <div className={`p-2 flex gap-2 justify-evenly rounded-md max-[850px]:flex-col flex-nowrap mt-1 h-full ${isLoading? 'flex-col h-screen':''}`}>
      <div className='p-2 '>
        <h1 className="text-center font-bold text-xl lg:text-2xl text-white ">
        Your Campaigns
        </h1>
        <div className="mt-3 md:w-full w-1/2 text-xs md:text-md ">
        {Data.length !==0 ? Data.slice(0,5)?.map((campaign) =>(
          <CampaignLine key={campaign.id} campaign={campaign} title={campaign.title} deadline={campaign.deadline} collection={campaign.amountCollected} campaignImage={campaign.image}/>
        ))
        :( 
          <SkeletonTheme baseColor="rgb(0,0,0,0.5)" highlightColor="rgba(62, 100, 224, 0.19)" height={60}>
    <p className="w-full">
      
      <Skeleton count={5} direction="rtl" className="lg:w-[500px] sm:w-[500px] md:w-[350px] w-[430px] max-[530px]:w-[260px]" />
    </p>
  </SkeletonTheme>  
        )}
      {!isLoading && <div className="flex flex-col mt-3 md:items-center text-white">
      Your Have {Data.length} Campaigns that are currently Live.
      <Link to="/all-campaigns" className="font-bold hover:underline">Get More Details- </Link>
      </div>}
      </div>
      </div>
      {!isLoading &&
      <div className="flex flex-col items-center w-full xl:w-1/2 gap-2">
        <Area Data1={Data1} Data2={Data2}/>
        <NewsBar />
      </div>}
    </div>
    </>
     :<Loader />
        } </div>)}
export default Home