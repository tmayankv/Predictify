import { BrowserRouter, Routes, Route } from "react-router-dom"
import RootLayout from "./_root/RootLayout"
import AuthLayout from "./_auth/AuthLayout"
import Signup from "./_auth/forms/Signup"
import Login from "./_auth/forms/Login"



import { Home, NewsFeed, Portfolio, Contact } from "./_root/pages/index"
import CreateCampaign from "./_root/pages/CreateCampaign"
CreateCampaign
const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Route>

          <Route element={<RootLayout />} >
            <Route index element={< Home />} />
            <Route path="/news-feed" element={< NewsFeed />} />
            <Route path="/create-campaign" element={< CreateCampaign />} />
            <Route path="/contact" element={< Contact />} />

          </Route>
        </Routes>
        
    </BrowserRouter>
  )
}

export default App