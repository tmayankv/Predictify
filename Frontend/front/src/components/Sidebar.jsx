import { Link, useLocation } from "react-router-dom"
import { navlinks } from "../constants"
import { useStateContext } from "../context/StateContext"

const Sidebar = () => {
  const {pathname} = useLocation()
  const {showBar}=useStateContext()
  return (
    <div className={`${!showBar?'hidden':""} flex flex-col justify-between text-center `}>
      <div className="flex flex-col gap-5 ">
       <p className="my-5 md:m-5 cursor-pointer">
        Logo
       </p>
       
      { navlinks.map((parts)=>{
        const isActive = parts.link === pathname
        return(
          <Link to={parts.link} key={parts.name} className={`p-3 rounded-lg text-xs hover:bg-violet-600 text-white bor-side flex max-[300px]:w-[40px] gap-2 justify-center  ${isActive? 'bg-violet-700 ':''} sm:w-[50px] lg:w-full cursor-pointer capitalize items-center`}>
        <p>
        <parts.icon />
          </p>
          <p className="lg:flex hidden">
            {parts.name}
            </p>
        </Link>
        )})}
      </div>
    </div>
  )
}

export default Sidebar