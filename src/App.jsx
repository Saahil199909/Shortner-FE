import React,{ useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import LoginPage from "./components/login/LoginPage";
import HomePage from "./components/home/HomePage";

function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user_shortner')
    setUser(JSON.parse(storedUser))
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage  setUser={setUser} user={user} />} />
        <Route path="/home/*" element={user ? <HomePage user={user} /> : <Navigate to='/'/>} />
        <Route path="*" element={<Navigate to='/'/>} />
      </Routes>
    </Router>
  );
}

export default App;
