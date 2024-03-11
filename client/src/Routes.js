import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationForm from './components/Registration/RegistrationScreen';
import Home from './components/Home/HomeScreen';



function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<RegistrationForm />} />
        
      </Routes>
    </Router>
  );
}

export default AppRoutes;