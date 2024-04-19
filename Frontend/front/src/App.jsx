import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import RootLayout from "./_root/RootLayout"
import AuthLayout from "./_auth/AuthLayout"
import Register from "./_auth/forms/Register"
import Login from "./_auth/forms/Login"



import { Home, RetirementPlanner, Contact, AllCampaigns,IncomeComponent} from "./_root/pages/index"
import CreateCampaign from "./_root/pages/CreateCampaign"
CreateCampaign
const App = () => {

  return (
        <Routes>
            <Route element={<AuthLayout />}>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<RootLayout />} >
            <Route index element={< Home />} />
            <Route path="/all-campaigns" element={< AllCampaigns/>} />
            <Route path="/create-campaign" element={< CreateCampaign />} />
            <Route path="/contact" element={< Contact />} />
            <Route path="/retirement-planner" element={< RetirementPlanner />} />
            <Route path="/income-management" element={< IncomeComponent />} />
          </Route>
        </Routes>
  )
}

export default App