import { useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../../context/StateContext";
const Login= () => {
    const [username, setusername] = useState("thesam1");
    const [password, setpassword] = useState("mypassword");

    const { handleAuth } = useStateContext()

    const showToken = (msg) =>{
      console.log(msg)
    }
    const fetchBaseURL = async() => {     
          try {
            const response = await fetch('http://127.0.0.1:5000/api/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                username: username,
                password: password,
              }),
            });
            const data = await response.json();
            if (response.ok) {
              console.log('Login successful');
              handleAuth(username, password)
            } else {
            showToken(data.message) 
        } } catch (error) { 
          showToken(error); 
        } 
    }
   
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Log in to your account</h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="username" className="sr-only">
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder={username}
                    onChange={(e) => setusername(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder={password}

                    onChange={(e) => setpassword(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <button
                  type="button"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={fetchBaseURL}
                >
                  Log in
                </button>
              </div>
            </form>
            <span className="font-bold text-slate-700">Don't forget to Register your account! 
          <Link to="/register" className="text-xl text-blue-600 cursor-pointer"> Register Here</Link>
            </span>
          </div>
        </div>
      );
    }
export default Login;