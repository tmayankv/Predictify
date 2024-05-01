import React, { useState } from 'react';

const PlatformSettings = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [emailCampaign, setEmailCampaign] = useState(false);
  const [emailTransactions, setEmailTransactions] = useState(false);
  const [launchUpdates, setLaunchUpdates] = useState(false);
  const [productUpdates, setProductUpdates] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const [weeklyEmails, setWeeklyEmails] = useState(false);

  const toggleChange = (setter) => (event) => {
    setter(event.target.checked);
  };

  const spanClass="absolute left-0 top-center bg-white w-[21px] h-full transition-all duration-300 ease-in-out"
  const spanClass2="block rounded-full bg-gray-400 transition duration-300 ease-in-out mx-1 w-full h-full"

  return (
    <div className="container mx-auto p-4" > 
      <div className="flex flex-col bg-gray-800 text-white rounded-lg p-4" style={{ background: 'linear-gradient(to top, rgb(2, 0, 124, 0.4), rgba(0, 0, 0, 0.8))', backdropFilter: 'blur(10px)' }}>
        <h2 className="text-xl font-bold mb-4">FundWizer Settings</h2>

        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <label htmlFor="email-follow" className="text-sm mr-2">
              Email me when I Login 
            </label>
          <div className="relative inline-block w-10 h-6 rounded-lg shadow-lg">
            <input type="checkbox" id="email-follow" className="opacity-0 absolute cursor-pointer w-full h-full left-0 top-0 z-10" checked={loggedIn} onChange={toggleChange(setLoggedIn)} />
            <span className={spanClass2} style={{background:loggedIn? "#3b82f6":""}}>
              <span className={spanClass} style={{ transform: loggedIn ? 'translateX(130%)' : 'translateX(0)', borderRadius:"50%"}} />
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <label htmlFor="email-answer" className="text-sm mr-2">
            Email me when someone publish a Campaign
          </label>
          <div className="relative inline-block w-10 h-6 rounded-lg shadow-lg">
            <input type="checkbox" id="email-answer" className="opacity-0 absolute cursor-pointer w-full h-full left-0 top-0 z-10" checked={emailCampaign} onChange={toggleChange(setEmailCampaign)} />
            <span className={spanClass2} style={{background:emailCampaign? "#3b82f6":""}}>
              <span className={spanClass} style={{ transform: emailCampaign ? 'translateX(130%)' : 'translateX(0)', borderRadius:"50%"}} />
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <label htmlFor="email-mention" className="text-sm mr-2">
            Email me when Transaction is done
          </label>
          <div className="relative inline-block w-10 h-6 rounded-lg shadow-lg">
            <input type="checkbox" id="email-mention" className="opacity-0 absolute cursor-pointer w-full h-full left-0 top-0 z-10" checked={emailTransactions} onChange={toggleChange(setEmailTransactions)} />
            <span className={spanClass2} style={{background:emailTransactions? "#3b82f6":""}}>
              <span className={spanClass} style={{ transform: emailTransactions ? 'translateX(130%)' : 'translateX(0)', borderRadius:"50%" }} />
            </span>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-medium mt-6 mb-2">Application</h3>

<div className="flex flex-col space-y-2">
  <div className="flex items-center space-x-2">
    <label htmlFor="launch-updates" className="text-sm mr-2">
      New launches and projects
    </label>
    <div className="relative inline-block w-10 h-6 rounded-lg shadow-lg">
      <input type="checkbox" id="launch-updates" className="opacity-0 absolute cursor-pointer w-full h-full left-0 top-0 z-10" checked={launchUpdates} onChange={toggleChange(setLaunchUpdates)} />
      <span className={spanClass2} style={{background:launchUpdates? "#3b82f6":""}}>
        <span className={spanClass} style={{ transform: launchUpdates ? 'translateX(130%)' : 'translateX(0)', borderRadius:"50%" }} />
      </span>
    </div>
  </div>
  <div className="flex items-center space-x-2">
    <label htmlFor="product-updates" className="text-sm mr-2">
      Monthly Economics and Product Chnages
    </label>
    <div className="relative inline-block w-10 h-6 rounded-lg shadow-lg">
      <input type="checkbox" id="product-updates" className="opacity-0 absolute cursor-pointer w-full h-full left-0 top-0 z-10" checked={productUpdates} onChange={toggleChange(setProductUpdates)} />
      <span className={spanClass2} style={{background:productUpdates? "#3b82f6":""}}>
        <span className={spanClass} style={{ transform: productUpdates ? 'translateX(130%)' : 'translateX(0)', borderRadius:"50%" }} />
      </span>
    </div>
  </div>
  <div className="flex items-center space-x-2">
    <label htmlFor="newsletter" className="text-sm mr-2">
      Subscribe to newsletter for Daily Updates
    </label>
    <div className="relative inline-block w-10 h-6 rounded-lg shadow-lg">
      <input type="checkbox" id="newsletter" className="opacity-0 absolute cursor-pointer w-full h-full left-0 top-0 z-10" checked={newsletter} onChange={toggleChange(setNewsletter)} />
      <span className={spanClass2} style={{background:newsletter? "#3b82f6":""}}>
        <span className={spanClass} style={{ transform: newsletter ? 'translateX(130%)' : 'translateX(0)', borderRadius:"50%" }} />
      </span>
    </div>
  </div>
  <div className="flex items-center space-x-2">
    <label htmlFor="weekly-emails" className="text-sm mr-2">
      Receive mails weekly
    </label>
    <div className="relative inline-block w-10 h-6 rounded-lg shadow-lg">
      <input type="checkbox" id="weekly-emails" className="opacity-0 absolute cursor-pointer w-full h-full left-0 top-0 z-10" checked={weeklyEmails} onChange={toggleChange(setWeeklyEmails)} />
      <span className={spanClass2} style={{background:weeklyEmails? "#3b82f6":""}}>
        <span className={spanClass} style={{ transform: weeklyEmails ? 'translateX(130%)' : 'translateX(0)', borderRadius:"50%" }} />
      </span>
    </div>
  </div>

</div> 
</div> 
</div> 

)}

export default PlatformSettings;
