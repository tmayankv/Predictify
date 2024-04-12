import { useStateContext } from "../context/StateContext"

const Topbar = () => {
  const {isAuth, handleAuth} = useStateContext()
  return (
    <div className="bg-gray-700 p-3 rounded-xl flex w-full justify-between">
      Topbar
      <div onClick={()=> handleAuth()}>{isAuth? `signOut` :"signin"}</div>
      </div>
  )
}

export default Topbar