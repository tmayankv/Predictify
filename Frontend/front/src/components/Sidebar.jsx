import { Link, useLocation } from "react-router-dom"
import { navlinks } from "../constants"
import { useStateContext } from "../context/StateContext"

const Sidebar = () => {
  const {pathname} = useLocation()
  const {showBar}=useStateContext()
  return (
    <div className={`${!showBar?'hidden':""} flex flex-col justify-between text-center w-[50px] lg:w-[180px] mr-1`}>
      <div className="flex flex-col gap-5 fixed">
       <p className="my-5 md:m-5 cursor-pointer">
        Logo
       </p>
       
      { navlinks.map((parts)=>{
        const isActive = parts.link === pathname
        return(
          <Link to={parts.link} key={parts.name} className={`p-2 rounded-lg text-xs lg:hover:bg-slate-800 hover:bg-violet-600 text-white group flex max-[300px]:w-[40px] gap-2 justify-center  ${isActive? 'lg:bg-slate-800 bg-violet-600':''}  sm:w-[50px] lg:w-full cursor-pointer transition capitalize items-center`}>
        <p className={`p-2 rounded-md font-bold lg:group-hover:text-violet-500 transition-all ${isActive? ' lg:text-violet-500 bg-violet-600 lg:bg-transparent':''}`}>
        <parts.icon size={25}/>
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