import { Outlet } from 'react-router-dom';
import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import Bottombar from '../components/Bottombar';

const RootLayout = () => {
  return (
    <div className='w-full md:flex h-screen'>
      <Sidebar />
      <Topbar />
    <div className="flex flex-1">
      <Outlet />
    </div>
    <Bottombar />
  </div>
  )
}

export default RootLayout