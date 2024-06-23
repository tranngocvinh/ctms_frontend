import React from 'react';
import { Box, Typography, Button, Link, InputBase, Select, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/ExitToApp'; // Import Logout icon
import { styled } from '@mui/system';

const AppHeader: React.FC = () => {
    const Search = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: theme.shape.borderRadius,
        marginLeft: 'auto',
        padding: '0 10px',
    }));

    return (
        <Box sx={{ width: '100%', fontFamily: 'Roboto, sans-serif' , position: 'fixed'}}>
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
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Link href="/dashboard" underline="none" sx={{ color: 'black', mx: 2 }}>DashBoard</Link>
                    <Button variant="contained" color="primary" startIcon={<LogoutIcon />}
                            sx={{ boxShadow: 'none', borderRadius: 2 }}>
                        Log In
                    </Button>
                </Box>
            </Box>

            <Box sx={{
                width: '100%',
                paddingLeft: '3rem',
                bgcolor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                py: 1,
                gap: 2,
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            }}>
                {['Home', 'Services & Information', 'Our Company', 'Online Business Suite'].map((link, index) => (
                    <React.Fragment key={link}>
                        <Link href={`#${link.toLowerCase().replace(/ /g, '-')}`} underline="none">
                            <Button
                                sx={{
                                    color: 'white',
                                    '&:hover': {
                                        textDecoration: 'underline',
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    }
                                }}
                            >
                                {link}
                            </Button>
                        </Link>
                        {index < 3 && (
                            <Box
                                component="span"
                                sx={{
                                    height: '30px',
                                    width: '1px',
                                    bgcolor: 'white',
                                    mx: 2,
                                }}
                            />
                        )}
                    </React.Fragment>
                ))}
                <Search>
                    <SearchIcon />
                    <InputBase
                        placeholder="Search...."
                        inputProps={{ 'aria-label': 'search' }}
                        sx={{ ml: 1, flex: 1, color: 'inherit' }}
                    />
                </Search>
                <Box
                    component="span"
                    sx={{
                        height: '30px',
                        width: '1px',
                        bgcolor: 'white',
                        mx: 2,
                    }}
                />
                <Select
                    value="en" // Assuming 'en' is the default language
                    // onChange={handleLanguageChange}
                    sx={{ color: 'white', '& .MuiSelect-icon': { color: 'white' } }}
                >
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="vi">Tiếng Việt</MenuItem>
                    <MenuItem value="fr">Français</MenuItem>
                </Select>
            </Box>
        </Box>
    );
};

export default AppHeader;
