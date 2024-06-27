import { classNames } from 'primereact/utils';
import React, { forwardRef, useContext, useImperativeHandle, useRef, useState } from 'react';
import { AppTopbarRef } from '@/types';
import { LayoutContext } from './context/layoutcontext';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import _default from "chart.js/dist/core/core.interaction";
import SearchIcon from "@mui/icons-material/Search";
import {InputBase, MenuItem, Select} from "@mui/material";


const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
    const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
    const menubuttonRef = useRef<HTMLButtonElement>(null);
    const topbarmenuRef = useRef<HTMLDivElement>(null);
    const topbarmenubuttonRef = useRef<HTMLButtonElement>(null);
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const closeMenu = () => {
        setShowMenu(false);
    };

    const handleLogout = () => {
        console.log('User logged out');
        closeMenu();
    };

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current,
    }));

    return (
        <Box sx={{zIndex:1000,
            width: '100%',
            position: 'sticky',
            top: 0}}>
        <div className="layout-topbar" >
            <div className="layout-topbar-logo">
                <img src={`/layout/images/TTTTW1.png`}
                     width="150px"
                     height="40px"
                     alt="logo"
                />
                <span>VIE</span>
            </div>

            <button
                ref={menubuttonRef}
                type="button"
                className="p-link layout-menu-button layout-topbar-button"
                onClick={onMenuToggle}
                aria-label="Toggle Menu"
            >
                <i className="pi pi-bars"/>
            </button>



            <button
                ref={topbarmenubuttonRef}
                type="button"
                className="p-link layout-topbar-menu-button layout-topbar-button"
                onClick={showProfileSidebar}
                aria-label="Show Profile Sidebar"
            >
                <i className="pi pi-ellipsis-v"/>
            </button>

            <div
                ref={topbarmenuRef}
                className={classNames('layout-topbar-menu', {
                    'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible,
                })}
            >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Link href="/dashboard" underline="none" sx={{ color: '#ed6c02;', mx: 2, fontWeight: 'bold',
                        fontSize: 'medium' }}>We're hiring</Link>
                </Box>
                <Box
                    component="span"
                    sx={{
                        height: '30px',
                        width: '2px',
                        bgcolor: 'black',
                        mx: 2,
                        marginLeft: 0
                    }}
                />
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button variant="contained" color="warning" startIcon={
                        <i className="pi pi-user"></i>}
                            sx={{boxShadow: 'none', borderRadius: 2 }}>
                        Log In
                    </Button>
                </Box>
            </div>

        </div>{/* Box sẽ được đặt ở hàng thứ hai nếu sử dụng Grid Layout */}
            <Box
                className="layout-topbar-box" sx={{width: '100%', paddingLeft: '2rem',
                bgcolor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                py: 1,
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            }}>
                {['Home', 'Services & Information', 'Our Company', 'Online Business Suite'].map((link, index) => (
                    <React.Fragment key={link}>
                        <Link href={`#${link.toLowerCase().replace(/ /g, '-')}`} underline="none">
                            <Button
                                sx={{color: 'white', '&:hover': {
                                        textDecoration: 'underline',
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    },}}>
                                {link}
                            </Button>
                        </Link>
                        {index < 3 && (<Box component="span" sx={{height: '30px', width: '1px', bgcolor: 'white', mx: 2,}}/>
                        )}
                    </React.Fragment>
                ))}
                <div
                    className="layout-topbar-second-right"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginLeft: 'auto', // Đẩy div sang bên phải
                        marginRight: '1%'  // Khoảng cách từ cạnh phải của màn hình
                    }}>
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
                        sx={{color: 'white', '& .MuiSelect-icon': {color: 'white'}}}
                    >
                        <MenuItem value="en">English</MenuItem>
                        <MenuItem value="vi">Tiếng Việt</MenuItem>
                        <MenuItem value="fr">Français</MenuItem>
                    </Select>
                </div>
            </Box>

        </Box>
    );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;
