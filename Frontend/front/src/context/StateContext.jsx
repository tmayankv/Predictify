import React, { useContext, createContext, useState, useEffect } from 'react';

import { useAddress, useContract, useContractWrite, useMetamask, useDisconnect} from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';
import { daysLeft } from '../utils';

const StateContext = createContext();


export const StateContextProvider = ({ children }) => {
  const [isAuth, setisAuth] = useState(false);
  const { contract } = useContract('0xBBE125E0f383ced5EA2b264D445797C63153BBcf');
  const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');
  const [isLoading, setisLoading] = useState(true)
  const [showBar, setshowBar] = useState(true)
  const[walletBalance, setWalletBalance] = useState("")
  const [notifications, setNotification] = useState([]);
  
  
  const address = useAddress();
  const connect = useMetamask()
  const navigate= useNavigate()
  const disconnect = useDisconnect()
  console.log(localStorage.getItem("authentication"))
  console.log(isAuth)
  const fetchCardsData = async () => {
      try {
        const response = await fetch(`/api/cards/${localStorage.getItem('username')}`);
        if (!response.ok) {
          throw new Error('Failed to fetch cards data');
        }
        const data = await response.json();
        const notifications = data.map((card) => ({
          title: "A New " + card.cardtype + " of Card Number ",
          val: card.cardnumber + " was added to the records that ",
          msg: 'is currently holding Rs ' + card.balance  
        }));
    
        setNotification(notifications);
      } catch (error) {
        console.error('Error fetching cards:', error);
        setError('Error fetching cards. Please try again.');
      }
    };
    
    const fetchExpenses = async() =>{
        try {
            const response = await fetch(`/api/exp/${localStorage.getItem('username')}`);
            if (!response.ok) {
                throw new Error('Failed to fetch income data');
              }
              const data = await response.json();
              const newNotifications = data.user_expense.map((ele) => ({
                  title: "On " + new Date(ele.year, ele.month, ele.day),
                  val: "Rs " + ele.amount + " Expense was added for category",
                  msg: ele.category,
                }));
                      
                setNotification((prevNotifications) => [...prevNotifications, ...newNotifications]);      
              } catch (error) {
                      console.error('Error fetching income data:', error);
                  }
              }
const fetchIncome = async() =>{
  try {
      const response = await fetch(`/api/income/${localStorage.getItem('username')}`);
      if (!response.ok) {
        throw new Error('Failed to fetch income data');
      }
      const data = await response.json();
      
      const newNotifications = data.user_income.map((ele) => ({
          title: "On " + new Date(ele.year, ele.month, ele.day),
          val: "another Rs  Income of " + ele.amount + " was added through the medium of ",
          msg: ele.recurring,
        }));
              
        setNotification((prevNotifications) => [...prevNotifications, ...newNotifications]);
    } catch (error) {
        console.error('Error fetching income data:', error);
    }

}

  const [logInfo, setLogInfo] = useState({
    username: "",
    password:""
  })
  

  useEffect(() => {
    localStorage.setItem('authentication', false)
    // if(!localStorage) localStorage.setItem('authentication', false)
    if (localStorage.getItem('authentication') === false){
        navigate('/login')
      }
    const fetchBalance = async () => {
      if (address) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const balance = await provider.getBalance(address);
          const etherBalance = ethers.utils.formatEther(balance);
          setWalletBalance(parseFloat(etherBalance));
        } catch (error) {
          console.error('Error fetching wallet balance:', error);
        }
      }
    };
    fetchBalance();
  }, [address], localStorage.getItem('authentication'));

  const handleLogInfo = (user, pass) =>{
    setLogInfo({username:user, password:pass})
  }
  const handleAuth = (user, pass) =>{
    setisAuth(!isAuth);
    if(isAuth){
    localStorage.setItem('authentication', true);
    localStorage.setItem('username', user)
    localStorage.setItem('password', pass)
      navigate('/')
    }
    else{
      disconnect();
    localStorage.setItem('authentication', false)
    localStorage.removeItem('username')
    localStorage.removeItem('password')
    localStorage.setItem('username', user)
    localStorage.setItem('password', pass)
      navigate('/login');
    }
  }

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign({
                args: [
                    address, // owner
                    form.title, // title
                    form.description, // description
                    form.target,
                    new Date(form.deadline).getTime(), // deadline,
                    form.image,
                ],
            });

    } catch (error) {
      console.log("contract call failure", error)
    }
  }
  const getCampaigns = async () =>{
      try {
        setisLoading(true)
        const data = await contract.call('getCampaigns');
        const parsedData=  data.map((campaign,i) => {
          return {
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target),
            deadline: campaign.deadline.toNumber(),
            image: campaign.image,
            amountCollected: ethers.utils.formatEther(campaign.amountcollected),
            id: i
          }
        })
        const datenow= new Date()
        const filterData=  parsedData.filter(item => !daysLeft(item.deadline).startsWith('-'))
        setisLoading(false)
        return filterData
      } catch (error) {
        console.log(error);
      }
  }

  const getUserCampaigns = async () =>{
    const allCampaigns = await getCampaigns();

    return allCampaigns;
}

  const getDonations = async (id) => {
    try{

      const donations = await contract.call('getDonators', [id]);
      const numberOfDonations = donations[0].length;
      
      const parsedDonations = [];
      
      for(let i = 0; i < numberOfDonations; i++) {
        parsedDonations.push({
          donator: donations[0][i],
          donation: ethers.utils.formatEther(donations[1][i].toString())
        })
      }
      return parsedDonations;
    }
    catch(error) {
      console.log(error);
    }
  }
  const donate = async (id, amount) => {
      const data = await contract.call('donateToCampaigns', [id], {value:ethers.utils.parseEther(amount)});

      return data
  }

  return (
    <StateContext.Provider
      value={{ 
        address,
        contract,
        isLoading,
        createCampaign: publishCampaign,
        getCampaigns,
        donate,
        getDonations,
         connect,
         isAuth,
         handleAuth,
         getUserCampaigns,
         showBar,
         setshowBar,
         walletBalance,
         disconnect,
         setWalletBalance,
         handleLogInfo,
         logInfo,
         fetchCardsData,
         fetchExpenses,
         fetchIncome,
         notifications,
      }}
    >  
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);