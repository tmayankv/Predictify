import { Link, useLocation } from "react-router-dom"
import { navlinks } from "../constants"
import { useStateContext } from "../context/StateContext"
import { FWlogo } from "../assets"
const Sidebar = () => {
  const {pathname} = useLocation()
  const {showBar}=useStateContext()
    return (
    <div className={`${!showBar?'hidden':""} flex flex-col justify-between text-center w-[43px] lg:w-[180px] z-50`}>
      <div className="flex flex-col gap-2 fixed md:items-center">
       <Link to="/dashboard" className="my-5 md:m-5 cursor-pointer">
        <img src={FWlogo} alt="" className="w-12"/>
       </Link>
       
      { navlinks.map((parts)=>{
        const isActive = parts.link === pathname
        return(
          <Link to={parts.link} key={parts.name} className={`p-2 rounded-lg text-xs lg:hover:bg-slate-800 hover:bg-blue-600 text-white group flex max-[300px]:w-[40px] gap-2 justify-start  ${isActive? 'lg:bg-slate-800 bg-blue-600':''}  sm:w-[50px] lg:w-full cursor-pointer transition capitalize items-center`}>
        <p className={`p-1 rounded-md font-bold lg:group-hover:text-blue-500 transition-all ${isActive? ' lg:text-blue-500 bg-blue-600 lg:bg-transparent':''}`}>
        <parts.icon size={25} />
          </p>
          <p className="lg:flex hidden font-bold">
            {parts.name}
            </p>
        </Link>
        )})}
      </div>
    </div>
  )
}

export default Sidebar