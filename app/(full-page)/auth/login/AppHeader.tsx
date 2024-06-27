/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';

const AppHeader: React.FC = () => {
    const [language, setLanguage] = useState('en');
    const [activeLink, setActiveLink] = useState('');

    const handleLanguageChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setLanguage(event.target.value as string);
    };

    return (
        <Box sx={{ width: '100%', fontFamily: 'Roboto, sans-serif' }}>
            <Box sx={{
                width: '100%',
                height: '60px',
                bgcolor: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 3,
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img alt="logo" src="/demo/images/login/TTTTW1.png" height="40" className="mr-2" />
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>VNE </Typography>
                </Box>
            </Box>

            <Box sx={{
                width: '100%',
                height: '45px',
                paddingLeft: '3rem',
                bgcolor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                py: 1,
                gap: 2,
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            }}>
            </Box>
        </Box>
    );
};

export default AppHeader;
