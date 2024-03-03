import { Link, NavLink, useLocation} from "react-router-dom"
import { Home, LogOut } from "lucide-react"
const Sidebar = () => {
  const { pathname }= useLocation()
  const sidebar_components= {
    Home:{
      icon: <Home size={24} />,
      title: "Home",
      path: "/"
    },
    NewsFeed:{
      icon: <Home size={24} />,
      title: "News Feed",
      path: "/news-feed"
    },
    Portfolio:{
      icon: <Home size={24} />,
      title: "Portfolio",
      path: "/portfolio"
    },
    Contact:{
      icon: <Home size={24} />,
      title: "Contact",
      path: "/contact"
    }
    
  }
  return (
    <div className="hidden bg-black text-white md:flex min-w-[240px] h-full">
      <div className="flex flex-col gap-11 w-full justify-stretch">
          <Link to='/'> 
            <img src="https://www.seoclerk.com/pics/677755-210axC1562182518.jpg"
            alt="Home"
            className=" rounded-full"
            width={80}
            height={30}
            />
          </Link>
          <ul className="flex flex-col gap-4 w-full">
          {Object.entries(sidebar_components).map(([key, value]) => {
            const isActive = value.path === pathname
            return (
              <li key={key} className={`transition flex gap-6 rounded-xl text-slate-500 hover:text-white hover:bg-violet-700 ${isActive? 'text-slate-50 bg-violet-700':''}`}>
                <NavLink to={value.path} className="flex items-center gap-2 p-4 rounded-xl">
                  {value.icon}
                  <p className="">{value.title}</p>
                </NavLink>
              </li>
            )
          })}
            </ul>
            <div className="flex transition justify-center gap-4 text-lg py-3 rounded-2xl hover:bg-blue-600">
              <LogOut size={32} />
              Logout</div>
        </div>
    </div>
  )
}

export default Sidebar