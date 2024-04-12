import React, { useContext, createContext, useState } from 'react';

import { useAddress, useContract, useContractWrite, useMetamask } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';

const StateContext = createContext();


export const StateContextProvider = ({ children }) => {
  const [isAuth, setisAuth] = useState(false);
  const { contract } = useContract('0xBBE125E0f383ced5EA2b264D445797C63153BBcf');
  const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');
  const [isLoading, setisLoading] = useState(true)
  const [showBar, setshowBar] = useState(true)

  const address = useAddress();
  const connect = useMetamask()
  const navigate= useNavigate()
  const handleAuth = () =>{
    setisAuth(!isAuth);
    isAuth? navigate('/'): navigate('/sign-up');

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

      console.log("contract call success", data)
    } catch (error) {
      console.log("contract call failure", error)
    }
  }
  const getCampaigns = async () =>{
      try {
        setisLoading(true)
        const data = await contract.call('getCampaigns');
        console.log(data)
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
        setisLoading(false)
        console.log(parsedData)
        return parsedData
      } catch (error) {
        console.log(error);
      }
  }

  const getUserCampaigns = async () =>{
    try {
      setisLoading(true)
      const data = await contract.call('getCampaigns');
      setisLoading(false)
      console.log(data)
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

      console.log(parsedData)
      return parsedData
    } catch (error) {
      console.log(error);
    }
}

  const getDonations = async (id) => {
    try{

      const donations = await contract.call('getDonators', [id]);
      const numberOfDonations = donations[0].length;
      console.log(donations)
      
      const parsedDonations = [];
      
      for(let i = 0; i < numberOfDonations; i++) {
        parsedDonations.push({
          donator: donations[0][i],
          donation: ethers.utils.formatEther(donations[1][i].toString())
        })
      }
      console.log(parsedDonations)
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
         setshowBar
      }}
    >  
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);