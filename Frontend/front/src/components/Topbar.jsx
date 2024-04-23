import { useStateContext } from "../context/StateContext";
import { BookUser, Unplug, Wallet2 } from "lucide-react";
import CustomButton from "./CustomButton";
import { toplinks } from "../constants/index1";
import { Link } from "react-router-dom";

const Topbar = () => {
  const { handleAuth, walletBalance, address, connect, disconnect, setWalletBalance} = useStateContext();
    const isAuth = localStorage.getItem('authentication')
    
  return (
    <div className=" flex flex-shrink justify-between items-center">


      {isAuth && <CustomButton btnType={"button"} title={"Logout"} handleClick={() => handleAuth()} styles={" bg-violet-600 hover:bg-slate-300 hover:text-violet-700 hover:text-black"} />
      }
      <div className=" gap-3 justify-between hidden sm:flex">
      {toplinks.map((parts) =>(
        <Link to={parts.link} key={parts.name} className={`p-3 rounded-lg text-xs hover:bg-slate-700 group text-white flex max-[300px]:w-[40px] gap-2 justify-center sm:w-[40px] lg:w-full cursor-pointer transition-all capitalize items-center`}>
        <p className="p-2  rounded-md text-white group-hover:bg-violet-600 transition-all ">
        <parts.icon size={16} />
          </p>
          <p className="lg:flex hidden">
            {parts.name}
            </p>
        </Link>
      ))}
      </div>
      {isAuth && (address && walletBalance ? (
        <div className="bg-violet-700 p-2 rounded-2xl flex items-center justify-between gap-3 text-white">
          Disconnect Wallet
          <div className="p-1 bg-black text-violet-300 rounded-xl" onClick={() => {
            setWalletBalance("");
            disconnect();
          }}>
            <Unplug />
          </div>
        </div>
      ) : (
        <CustomButton btnType={"button"} title={"Connect to Wallet"} handleClick={() => connect()} styles={"bg-violet-700"} />
      ))}
    </div>
  );
}

export default Topbar;

