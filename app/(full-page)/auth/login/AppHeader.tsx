'use client'
import React from 'react';
import {AppBar, Toolbar, Typography, Box, IconButton} from '@mui/material';
import {Phone, Facebook, Google, GitHub} from '@mui/icons-material';

const AppHeader = () => {
    return (
        <>
            <AppBar position="static" color="default" style={{height: "5rem"}}>
                <Toolbar>
                    <Box sx={{display: 'flex', alignItems: 'center', flexGrow: 1}}>
                        <Box className="flex-shrink-0">
                            <img src="/demo/images/login/test.png" alt='img'
                                 className="mr-5 py-1 px-3 object-cover rounded-lg" style={{ width: '120px', height: '70px' }}/>
                        </Box>
                        <Typography variant="h6" color="inherit" fontWeight="bold" >
                            Vietnam Container Management
                        </Typography>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <Typography variant="body1" color="inherit" sx={{mr: 2}}>
                            Connect With Us
                        </Typography>
                        <IconButton color="inherit" href="tel:123456789">
                            <Phone/>
                        </IconButton>
                        <IconButton color="inherit" href="fax:123456789">
                            <Google/>
                        </IconButton>
                        <IconButton color="inherit" href="https://www.facebook.com">
                            <Facebook/>
                        </IconButton>
                        <IconButton color="inherit" href="#">
                            <GitHub/>
                        </IconButton>
                        <Box sx={{width: 20, height: 20, bgcolor: 'red', borderRadius: '50%', ml: 1}}/>
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default AppHeader;
