import React from 'react';
import { Outlet } from 'react-router-dom';
import RootLayout from './RootLayout';

const AuthLayout: React.FC = () => {
    return (
        <RootLayout
            showNavBar={true}
            navBarProps={{
                accountVisible: false,
                backEnabled: true,
            }}
        >
            <Outlet />
        </RootLayout>
    );
};

export default AuthLayout;
