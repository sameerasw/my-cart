import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
    palette: {
        primary: {
            main: '#339977',
        },
        secondary: {
            main: '#115544',
        },
        background: {
            default: '#ddffee',
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
        h5: {
            fontWeight: 600,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                },
            },
        },
    },
});

const RootLayout: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
                <Outlet />
            </Box>
        </ThemeProvider>
    );
};

export default RootLayout;
