import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import RootLayout from './RootLayout';

const MainLayout: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return (
        <RootLayout
            showNavBar={true}
            navBarProps={{
                searchTerm,
                onSearchChange: handleSearchChange,
                accountVisible: true,
                backEnabled: false,
            }}
        >
            <Outlet context={{ searchTerm }} />
        </RootLayout>
    );
};

export default MainLayout;
