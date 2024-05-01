import React from 'react'
import { TECarousel, TECarouselItem } from "tw-elements-react";
import { img1 } from '../../assets';
import { Link } from 'react-router-dom';
const LandPage = () => {
  return (
    
<div className='text-white flex flex-col items-center justify-center'>
        <h1 className='text-center text-3xl mx-6 p-2 rounded-lg ' style={{ background: 'linear-gradient(to right, rgba(0, 100, 224, 0.81), rgba(0, 0, 0, 0.8))', backdropFilter: 'blur(10px)' }}>
        Welcome to FundWiser
        </h1>
<div className='w-[90%]'>
<TECarousel
        showControls
        showIndicators
        crossfade
        ride="carousel"
        prevBtnIcon={
          <>
            <span className="inline-block text-black h-8 w-8 [&>svg]:h-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </span>
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Previous
            </span>
          </>
        }
        nextBtnIcon={
          <>
            <span className="inline-block text-black h-8 w-8 [&>svg]:h-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </span>
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Next
            </span>
          </>
        }
        theme={{
          indicator:
            "mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-black bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none",
        }}
      > <div className="relative w-full overflow-hidden after:clear-both after:block after:content-[''] scale-90">
          <TECarouselItem
            itemID={1}
            className="relative float-left -mr-[100%] hidden w-full !transform-none transition-opacity duration-[600ms] ease-in-out motion-reduce:transition-none"
          >
            <img
              src={img1}
              className="block w-full h-[600px]"
              alt="..."
            />
            <div className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-black md:block">
              <h5 className="text-xl">First slide label</h5>
              <p>
                Some representative placeholder content for the first slide.
              </p>
            </div>
          </TECarouselItem>
          <TECarouselItem
            itemID={2}
            className="relative float-left -mr-[100%] hidden w-full !transform-none opacity-0 transition-opacity duration-[600ms] ease-in-out motion-reduce:transition-none"
          >
            <img
              src="https://imgs.search.brave.com/cQXfgM14sewffxmuHOVp2Zuds8ph4Djo-gTw5zo0zF0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQ4/ODgzNDA4NC9waG90/by9jcm93ZGZ1bmRp/bmctcGlnZ3ktYmFu/ay1hbmQtaGFuZHMt/b2YtZmF0aGVyLXBs/YW5uaW5nLWZpbmFu/Y2Utc2F2aW5ncy1v/ci1vbmxpbmUtYmFu/a2luZy13aXRoLWEu/d2VicD9iPTEmcz0x/NzA2NjdhJnc9MCZr/PTIwJmM9RS1GZ19Q/Z2lZdFRKdlZDSzNr/UTFDcmIzVU0ySHdy/VmV1UUUxNlY1alFp/Yz0"
              className="block w-full h-[600px]"

              alt="..."
            />
            <div className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-black md:block">
              <h5 className="text-xl">Second slide label</h5>
              <p>
                Some representative placeholder content for the second slide.
              </p>
            </div>
          </TECarouselItem>
          <TECarouselItem
            itemID={3}
            className="relative float-left -mr-[100%] hidden w-full !transform-none opacity-0 transition-opacity duration-[600ms] ease-in-out motion-reduce:transition-none"
          >
            <img
              src="https://imgs.search.brave.com/9EqvO-hi73UA9cZ-reo5NCO8-ZSHIij9T16gXPLm-AA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9k/aWdpdGFsLXRhYmxl/dC13aXRoLWFubnVh/bC1zdHJhdGVneS1i/YWNrZ3JvdW5kXzEw/OTgtMzQ0Ni5qcGc_/c2l6ZT02MjYmZXh0/PWpwZw"
              className="block w-full h-[600px]"
              alt="..."
            />
            <div className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-black md:block">
              <h5 className="text-xl">Third slide label</h5>
              <p>
                Some representative placeholder content for the third slide.
              </p>
            </div>
          </TECarouselItem>
        </div>
      </TECarousel>
<hr className='mt-4 mx-5' />
        <div className="my-2 flex flex-col gap-5  mt-5" >
                <h1 className="text-center text-2xl flex justify-center"> Application  &nbsp; <p className="text-blue-500">Services </p> </h1>
                        <div className="flex md:flex-row flex-col justify-center items-center gap-5" >
                        <div className="rounded-xl md:w-1/3 flex flex-col items-center p-2" style={{ background: ' rgba(128, 128, 128, 0.11)'}}>

                            <img src="https://imgs.search.brave.com/gXXA6xcylx_Q9_CRwlKNqo44thypvvzI9shOwHfyA7c/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTM2/OTU3OTczNy9waG90/by9mdW5kaW5nLWZp/bmFuY2luZy1idXNp/bmVzcy1wcm9qZWN0/LndlYnA_Yj0xJnM9/MTcwNjY3YSZ3PTAm/az0yMCZjPTRURWE4/cjV0Mmh0RlVqdE5i/U0REdERoVWlMa0pz/d2w0OXBtbEphOHhq/WTQ9" alt="" />
                            <h2 className='p-2 self-start'>
                                 Crowd Funding
                                </h2>
                                <p> It allows us to create realtime campaigns and raise funds according to the willingness of user.the Transaction is possible by the ETH from User's Metamask wallet</p>
                                <Link to= "/all-campaigns" className="bg-blue-500 p-2 rounded-xl">
                                    <div>Visit Now</div>
                                </Link>
                            </div>
                            
                            <div className="rounded-xl  md:w-1/3 flex flex-col items-center p-2" style={{ background: ' rgba(128, 128, 128, 0.11)'}}>
                        
                            <img src="https://imgs.search.brave.com/ptcOnBrlkzb58pfg1KrR-ey_W5uvS8_-9NJy4XZ20zA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzAzLzY2Lzkz/LzM2MF9GXzIwMzY2/OTM4N19tN0l2WGxr/VjBGUXdBNjlYcHQ4/QXdsQWRPNUloMDVN/Yy5qcGc"
                             alt="" />
                            <h2 className='p-2 self-start'>
                                 Income Management
                                </h2>
                                <p> It will track of Your Income in realtime. you just need to follow the simple rules in the income form. It will represent the income on a graph and table</p>
                                <Link to= "/income-management" className="bg-blue-500 p-2 rounded-xl">
                                    <div>Visit Now</div>
                                </Link>
                                </div>
                            <div className="rounded-xl md:w-1/3 flex flex-col items-center p-2" style={{ background: ' rgba(128, 128, 128, 0.11)'}}>

                            <img src="https://imgs.search.brave.com/VSzalD6KoeUeyXFjg1yezzGVu7VdfNUVdm3aoNlrcfU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDgzNzkz/MzEuanBn" alt="" />
                            <h2 className='p-2 self-start'>
                                 Expense Management
                                </h2>
                                <p> It will track of Your expenses in realtime. you just need to follow the simple rules in the expense form. It will represent the expenses on a graph and table</p>
                                <Link to= "/expense" className="bg-blue-500 p-2 rounded-xl">
                                    <div>Visit Now</div>
                                </Link>
                            </div>
        </div>
        </div>
        <div className='text-lg flex mt-5 flex-col items-center gap-2 rounded-lg p-2'  style={{ background: 'rgba(128, 128, 128, 0.1)'}}>
            <h1 className='text-center text-2xl font-semibold flex'> <p className="text-blue-500">Know Us &nbsp; </p> Better</h1>
            <div className='text-lg flex items-center gap-2 rounded-lg p-2 flex-wrap md:flex-nowrap'>

            <div>
                <img src="https://imgs.search.brave.com/uQORMyC0gnmcJ79f_mChooIilPrBTBmBYsp9_oKE54s/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/Y3ByaW1lLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyMC8x/MC9hcmNoZXJibG9n/dHlwZXMtZmluYW5j/aWFsLWFwcGxpY2F0/aW9ucy1zb2Z0d2Fy/ZS1hbmQtY29tbW9u/LWRldmVsb3BtZW50/LWNoYWxsZW5nZXMu/anBlZw" className='h-[100%]' alt="" />
            </div>
            <div className='flex w-full flex-col'>
            <div  className='text-lg font-light text-gray-300'>
        This whole web based application deals with the following services mentioned above and much more.As being the newcomer this application will be Reaching new heights if it is used with proper techniques and features. This application will be able to be used with any number of different services and features available on this website  including the visualization, analytics, realtime payments and even security measures. So why Wait Jump direct to the Dashboard page
            </div>
            <Link to= "/dashboard" className="bg-blue-500 p-2 mt-2 text-sm text-center rounded-xl self-center">
                                    <div >Jump to Dashboard</div>
                                </Link>
            </div>
            </div>
        </div>

            </div>
 
    </div>
  )
}

export default LandPage
