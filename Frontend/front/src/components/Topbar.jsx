import { useStateContext } from "../context/StateContext";
import { BookUser, Unplug, Wallet2 } from "lucide-react";
import CustomButton from "./CustomButton";

const Topbar = () => {
  const { isAuth, handleAuth, walletBalance, address, connect, disconnect, setWalletBalance} = useStateContext();
  console.log(isAuth, walletBalance, address);

  return (
    <div className="bg-gray-700 p-2 rounded-xl flex w-full max-[350px]:justify-center justify-between items-center">
      {isAuth && <CustomButton btnType={"button"} title={"Logout"} handleClick={() => handleAuth()} styles={"bg-violet-600 hover:bg-slate-300 hover:text-violet-700 hover:text-black"} />
      }
      {isAuth && (address && walletBalance ? (
        <div className="bg-violet-400 p-2 rounded-2xl flex items-center justify-between gap-3">
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1">
              <Wallet2 size={19} />
              {String(walletBalance).slice(0,6)} ETH
            </div>
            <div className="sm:text-xs font-light">
              <div className="flex items-center gap-1 truncate">
                <BookUser size={17} />
                {address.slice(0,9)}....
              </div>
            </div>
          </div>
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
