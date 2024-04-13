import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Account from './pages/Account';
import { Component } from 'react';
import { useAuthContext } from './hooks/useAuthContext';
import MockTrading from './pages/MockTrading';
import Learn from './pages/Learn';

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/" />} />
            <Route path="/mock-trading" element={user ? <MockTrading /> : <Navigate to="/login" />} />
            <Route path="/account" element={user ? <Account /> : <Navigate to="/login" />} />
            <Route path="/learn" element={user ? <Learn/> : <Navigate to="/login" />} />
          </Routes>
      </BrowserRouter>  
    </div>
  );
}

export default App;
