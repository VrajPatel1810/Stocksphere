import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Stocks from './pages/Stocks';
// import Home from './pages/Home';
// import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            {/* <Route path="/" element={<Login />} /> */}
            <Route path="/" element={<Signup />} />
            {/* <Route path="/" element={<Stocks />} /> */}
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App