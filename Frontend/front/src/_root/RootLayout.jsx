import { Outlet } from 'react-router-dom';
import  Topbar from '../components/Topbar';
import  Sidebar  from '../components/Sidebar';

const RootLayout = () => {
  return (
    <div className='w-full flex h-screen'>
      <div className="m-2 flex">
      <Sidebar />
      </div>
      <div className="mt-2 mr-1 w-full">
      <Topbar />
    <div className="mt-2">
      <Outlet />
    </div>
      </div>
  </div>
  )
}

export default RootLayout