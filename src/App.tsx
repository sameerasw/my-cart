import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'; 
import CartPage from './pages/CartPage'; 
import Login from './pages/Login';
import Register from './pages/Register';
import { Box } from '@mui/material';
import NavBar from './components/NavBar';

const App: React.FC = () => {

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      <BrowserRouter> 
        <NavBar />
        <Routes> 
          <Route path="/" element={<HomePage />} /> 
          <Route path="/cart" element={<CartPage />} /> 
          <Route path="*" element={<div>Not Found</div>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes> 
      </BrowserRouter>
    </Box>
  );
};

export default App;