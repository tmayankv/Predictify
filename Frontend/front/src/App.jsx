
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import RootLayout from "./_root/RootLayout"
import AuthLayout from "./_auth/AuthLayout"
import Register from "./_auth/forms/Register"
import Login from "./_auth/forms/Login"
 import { useEffect } from "react"
 import './App.css';
import { Home, Contact, AllCampaigns,IncomeComponent,LandPage, Profile, CreateCampaign, CampaignDetails, Billing, Expense} from "./_root/pages/index"
import Notifications from "./_root/pages/Notifications"

const App = () => {
  const navigate = useNavigate()
  useEffect(() =>{
    {localStorage.getItem('authentication') ==="false" && navigate('/login')}
  },[localStorage.getItem('authentication')])

  return (
        <Routes>
            <Route element={<AuthLayout />}>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<RootLayout />} >
          <Route index element={< LandPage />} />
            <Route path="/notifications" element={< Notifications />} />
            <Route path="/dashboard" element={< Home />} />
            <Route path="/all-campaigns" element={< AllCampaigns/>} />
            <Route path="/create-campaign" element={< CreateCampaign />} />
            <Route path="/campaign-details/:id" element={< CampaignDetails />} />
            <Route path="/contact" element={< Contact />} />
            <Route path="/expense" element={< Expense />} />
            <Route path="/income-management" element={< IncomeComponent />} />
            <Route path="/profile" element={< Profile />} />
            <Route path="/billing" element={< Billing />} />
            <Route path="/notifications" element={< Notifications />} />

            


          </Route>
      </Routes>
  )
}

export default App