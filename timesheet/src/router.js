// router.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Worker from './pages/Worker';
import { UserProvider } from './context/usercontext';

export default function AppRouter() {
  return (
    // Wrap the entire Router with UserProvider
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/worker" element={<Worker />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}
