import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'; 
import CartPage from './pages/CartPage'; 

const App: React.FC = () => {
  return (
    <BrowserRouter> 
      <Routes> 
        <Route path="/" element={<HomePage />} /> 
        <Route path="/cart" element={<CartPage />} /> 
      </Routes> 
    </BrowserRouter>
  );
};

export default App; 