import { useState, useEffect } from "react";
function App() {
  const [username, setUsername] = useState('dsfsf');
  const [password, setPassword] = useState('asdasd');

  useEffect(() => {
    const fetchBaseURL = async () => {
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
          // Handle successful login, e.g., store the access token in state or local storage
          console.log('Login successful');
          console.log(data.access_token);
        } else {
          // Handle login error
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    };

    fetchBaseURL();
  }, []);
  return (
    <div>{username}</div>
  )
}

export default App