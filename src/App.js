import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Dashboard from './pages/dashboard';
import User from './pages/user';
import useToken from './components/useToken';
import usePerms from './components/usePerms';

import './App.css';
import Judge from './pages/manage/judge';
import STA from './pages/manage/sta';


function App() {
  const {token, setToken} = useToken();
  const {perms, setPerms} = usePerms();

  if(!token){
    return <Login setToken={setToken} />
  }
  
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard token={token} setToken={setToken} perms={perms} setPerms={setPerms}/>} />
          <Route path="/manage/judge" element={<Judge token={token} setToken={setToken} perms={perms}/>} />
          <Route path="/manage/sta" element={<STA token={token} setToken={setToken} perms={perms} />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
