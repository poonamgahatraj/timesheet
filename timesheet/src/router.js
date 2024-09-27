// router.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Worker from './pages/Worker';

export default function AppRouter() {
  return (
    <Router>
      <Routes>
      
        <Route path="/" element={<Login />} />

       
        <Route path="/admin" element={<Admin />} />

      
        <Route path="/worker" element={<Worker />} />

    
      </Routes>
    </Router>
  );
}
