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
  const [logInfo, setLogInfo] = useState({
    username: "",
    password:""
  })

  const address = useAddress();
  const connect = useMetamask()
  const navigate= useNavigate()
  const disconnect = useDisconnect()

  useEffect(() => {
    if(!localStorage) localStorage.setItem('authentication', false)
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
    console.log(user)
    console.log(pass)
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
        console.log(daysLeft(parsedData.deadline))
        console.log(typeof daysLeft(parsedData.deadline))
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
         logInfo
      }}
    >  
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);