import { Routes, Route } from "react-router-dom";
import LoyaltyLogin from "./Components/LoyaltyLogin/LoyaltyLogin";
import LoyaltyRegister from "./Components/LoyaltyRegister/LoyaltyRegister";
import Login from "./Components/LoyatyProgram/Login";
import LoyaltyProgram from "./Components/LoyatyProgram/LoyaltyProgram";
import Register from "./Components/LoyatyProgram/Register";
import HomePage from "./Pages/HomePage";
import jwt from "jsonwebtoken"
function App() {
  const profile = localStorage.getItem("profile")
  const parsedToken = JSON.parse(profile)
  // let token = parsedToken.token
  
  // console.log("localstoragetoken" ,parsedToken.token )
// const profile = {
//   // token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFhekBpbmZpbmkuY29tIiwiaWQiOiJhOGE1NmFhNS1hYTcwLTRhM2YtYjI1Yy1lNTgzNDNkNjMyNmIiLCJpYXQiOjE2NTYwNjM3ODAsImV4cCI6MTY1NjA2NzM4MH0.qfzu6IeL_HH_LA0l6QGbW_3v1WgEOXJdxEqhFgHqPXw"
// }
// const decodedToken = jwt.verify(profile.token, "test");

const logout =()=>{
  localStorage.removeItem("profile")
}
// console.log(decodedToken)

// if (decodedToken.exp * 1000 < new Date().getTime()) logout();
  return (
    <div>
      
      <Routes>
        <Route path="/" element={<HomePage/>} />
         <Route path="/login" element={ <LoyaltyLogin />} />
        <Route path="/login" element={profile ? <HomePage/> : <LoyaltyLogin /> } />
        <Route path="/register" element={ <LoyaltyRegister />} />
        <Route path="/loyalty" element={ <LoyaltyProgram/>}/>
        <Route path="/loyalty-login" element={ <Login/>}/>
        <Route path="/loyalty-register" element={<Register/>}/>
      </Routes>
    </div>
  );
}

export default App;
