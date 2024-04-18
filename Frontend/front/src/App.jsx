import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import RootLayout from "./_root/RootLayout"
import AuthLayout from "./_auth/AuthLayout"
import Signup from "./_auth/forms/Signup"
import Login from "./_auth/forms/Login"



import { Home, RetirementPlanner, Contact, AllCampaigns } from "./_root/pages/index"
import CreateCampaign from "./_root/pages/CreateCampaign"
import { useStateContext } from "./context/StateContext"
CreateCampaign
const App = () => {
  const navigate = useNavigate()
  const {isAuth} = useStateContext()
  
  return (
        <Routes>
            <Route element={<AuthLayout />}>
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<RootLayout />} >
            <Route index element={< Home />} />
            <Route path="/all-campaigns" element={< AllCampaigns/>} />
            <Route path="/create-campaign" element={< CreateCampaign />} />
            <Route path="/contact" element={< Contact />} />
            <Route path="/retirement-planner" element={< RetirementPlanner />} />


          </Route>
        </Routes>
        
  )
}

export default App