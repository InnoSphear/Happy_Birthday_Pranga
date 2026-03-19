import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from "./pages/Login";
import Home from "./pages/Home";
import Memories from "./pages/Memories";
import MyLove from "./pages/MyLove";
import Quotes from "./pages/Quotes";
import { useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="w-screen min-h-screen bg-[#090909] text-white selection:bg-[#d4af37] selection:text-black font-sans">
        <Routes>
          <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          {/* We will route protect other pages simply checking state in components or relying on the session */}
          <Route path="/home" element={<Home isAuthenticated={isAuthenticated} />} />
          <Route path="/memories" element={<Memories isAuthenticated={isAuthenticated} />} />
          <Route path="/mylove" element={<MyLove isAuthenticated={isAuthenticated} />} />
          <Route path="/quotes" element={<Quotes isAuthenticated={isAuthenticated} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
