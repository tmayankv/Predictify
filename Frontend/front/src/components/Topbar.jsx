import { useStateContext } from "../context/StateContext";
import { BookUser, Unplug, Wallet2 } from "lucide-react";
import CustomButton from "./CustomButton";

const Topbar = () => {
  const { handleAuth, walletBalance, address, connect, disconnect, setWalletBalance} = useStateContext();
    const isAuth = localStorage.getItem('authentication')
    
  return (
    <div className=" flex flex-shrink justify-between items-center">


      {isAuth && <CustomButton btnType={"button"} title={"Logout"} handleClick={() => handleAuth()} styles={" bg-blue-500 p-2 hover:bg-blue-600"} />
      }
      <div className=" gap-3 justify-between hidden sm:flex">
      
      </div>
      {isAuth && (address && walletBalance ? (
        <div className="p-2 rounded-2xl flex items-center justify-between gap-3 text-white" style={{ background: 'rgba(22, 100, 224, 1)' }}>
          Disconnect Wallet
          <div className="p-1 bg-black text-blue-300 rounded-xl" onClick={() => {
            setWalletBalance("");
            disconnect();
          }}>
            <Unplug />
          </div>
        </div>
      ) : (
        <CustomButton btnType={"button"} title={"Connect to Wallet"} handleClick={() => connect()} styles={"p-2 hover:bg-blue-600"} />
      ))}
    </div>
  );
}

export default Topbar;

