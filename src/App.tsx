import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'; 
import CartPage from './pages/CartPage'; 
import Login from './pages/Login';
import Register from './pages/Register';
import { useDispatch } from 'react-redux';
import { initializeCart } from './store/cartSlice';
import { Box } from '@mui/material';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    console.log("Loading data from local storage", storedCart);
    if (storedCart) {
      dispatch(initializeCart(JSON.parse(storedCart)));
    }
  }, [dispatch]);

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
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
    </Box>
  );
};

export default App;