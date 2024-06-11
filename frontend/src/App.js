import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Stocks from './pages/Stocks';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
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
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App