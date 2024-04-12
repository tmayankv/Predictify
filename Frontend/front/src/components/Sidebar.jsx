import { Link, useLocation } from "react-router-dom"
import { navlinks } from "../constants"
import { useStateContext } from "../context/StateContext"

const Sidebar = () => {
  const {pathname} = useLocation()
  const {showBar}=useStateContext()
  return (
    <div className={`${!showBar?'hidden':""} lg:flex flex-col justify-between text-center `}>
      <div className="flex flex-col gap-5 ">
       <p className="m-5 cursor-pointer">
        Logo
       </p>
       
      { navlinks.map((parts)=>{
        const isActive = parts.link === pathname
        return(
          <Link to={parts.link} className={` mx-3 p-3 rounded-lg gap-2 flex justify-start  ${isActive? 'bg-violet-800 text-white':'bg-slate-500 hovering-element'}   cursor-pointer capitalize`}>
        <p >
        <parts.icon />
          </p>
          <p className=" hidden lg:flex">
            {parts.name}
            </p>
        </Link>
        )
      }
      )
      }
      </div>

      <div className="cursor-pointer">Signout</div>
    </div>
  )
}

export default Sidebar