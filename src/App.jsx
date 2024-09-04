import React,{ useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LoginPage from "./components/login/LoginPage";
import HomePage from "./components/home/HomePage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home/*" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
