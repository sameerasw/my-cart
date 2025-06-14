import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import NavBar from '../components/NavBar';

const MainLayout: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <NavBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    paddingTop: '100px',
                }}
            >
                <Outlet context={{ searchTerm }} />
            </Box>
        </Box>
    );
};

export default MainLayout;
