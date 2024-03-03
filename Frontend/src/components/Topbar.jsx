import { Link } from "react-router-dom"
const Topbar = () => {
  return (
    <div className="  flex md:hidden flex-col w-screen bg-slate-500 justify-center h-[50px]">
      <Link to='/'> 
            <img src="https://www.seoclerk.com/pics/677755-210axC1562182518.jpg"
            alt="Home"
            className="flex gap-5 rounded-full"
            width={5}
            height={3}
            />
          </Link>
    </div>
  )
}

export default Topbar