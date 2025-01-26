import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'; 
import CartPage from './pages/CartPage'; 
import Login from './pages/Login';
import Register from './pages/Register';

const App: React.FC = () => {
  return (
    <BrowserRouter> 
      <Routes> 
        <Route path="/" element={<HomePage />} /> 
        <Route path="/cart" element={<CartPage />} /> 
        <Route path="*" element={<div>Not Found</div>} />
        <Route path="/login" element={<Login onLoginSuccess={function (token: string, userId: number, name: string, email: string, userType: string): void {
          throw new Error('Function not implemented.');
        } } />} />
        <Route path="/register" element={<Register onRegisterSuccess={function (): void {
          throw new Error('Function not implemented.');
        } } />} />
      </Routes> 
    </BrowserRouter>
  );
};

export default App; 