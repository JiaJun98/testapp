import React from 'react'
import { useNavigate} from 'react-router-dom';
import { useAuth  } from "./Auth"
const Home = () => {
  const auth = useAuth()
  const navigate = useNavigate()
  const handleLogout = () => {
    auth.logout()
    navigate("/home")
  }
  return (
    <div>
      Welcome {auth.user}
      <button onClick = {handleLogout}> Logout </button>
    </div>
    
  )
}

export default Home