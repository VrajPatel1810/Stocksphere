import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Stocks from './pages/Stocks';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOtp from "./pages/VerifyOtp";
import ResetPassword from "./pages/ResetPassword";
import StockDetail from "./pages/StockDetail";
import Portfolio from './pages/Portfolio';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/stocks" element={<Stocks />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/verifyotp" element={<VerifyOtp />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/stocks/:symbol" element={<StockDetail />} />
            <Route path="/portfolio" element={<Portfolio />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App