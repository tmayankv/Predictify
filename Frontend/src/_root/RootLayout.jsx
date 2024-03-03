import { Outlet } from 'react-router-dom';
import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
const RootLayout = () => {
  return (
    <div className='w-full md:flex h-screen'>
      <Sidebar />
      <Topbar />
    <div>
      <Outlet />
    </div>
  </div>
  )
}

export default RootLayout