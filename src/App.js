import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Dashboard from './pages/dashboard';
import User from './pages/user';
import useToken from './components/useToken';

import './App.css';

function App() {
  const {token, setToken} = useToken();

  if(!token){
    return <Login setToken={setToken} />
  }
  
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard token={token} setToken={setToken} />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
