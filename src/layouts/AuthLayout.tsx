import React from 'react';
import { Outlet } from 'react-router-dom';
import { Paper } from '@mui/material';
import NavBar from '../components/NavBar';

const AuthLayout: React.FC = () => {
    return (
        <Paper>
            <NavBar accountVisible={false} backEnabled={true} />
            <Outlet />
        </Paper>
    );
};

export default AuthLayout;
