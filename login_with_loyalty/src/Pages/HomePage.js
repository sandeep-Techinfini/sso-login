import React from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
 const navigate = useNavigate()
  const logoutHandler = ()=>{
    localStorage.removeItem("profile")
    navigate("/login")

  }
  return (
    <div>
        <h1>Home Page</h1>
        <button onClick={logoutHandler}>Logout</button>
    </div>
  )
}

export default HomePage
