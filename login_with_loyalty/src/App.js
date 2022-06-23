import { Routes, Route } from "react-router-dom";
import LoyaltyLogin from "./Components/LoyaltyLogin/LoyaltyLogin";
import LoyaltyRegister from "./Components/LoyaltyRegister/LoyaltyRegister";
import Login from "./Components/LoyatyProgram/Login";
import LoyaltyProgram from "./Components/LoyatyProgram/LoyaltyProgram";
import Register from "./Components/LoyatyProgram/Register";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoyaltyLogin />} />
        <Route path="/register" element={<LoyaltyRegister />} />
        <Route path="/loyalty" element={<LoyaltyProgram/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/loyalty-register" element={<Register/>}/>
      </Routes>
    </div>
  );
}

export default App;
