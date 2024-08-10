import { classNames } from 'primereact/utils';
import React, { forwardRef, useContext, useImperativeHandle, useRef, useState, useEffect } from 'react';
import { AppTopbarRef } from '@/types';
import { LayoutContext } from './context/layoutcontext';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import _default from "chart.js/dist/core/core.interaction";
import SearchIcon from "@mui/icons-material/Search";
import { InputBase, MenuItem, Select } from "@mui/material";
import { useRouter } from 'next/navigation';

const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
    const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
    const menubuttonRef = useRef<HTMLButtonElement>(null);
    const topbarmenuRef = useRef<HTMLDivElement>(null);
    const topbarmenubuttonRef = useRef<HTMLButtonElement>(null);
    const [showMenu, setShowMenu] = useState(false);
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const closeMenu = () => {
        setShowMenu(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('user');
        setUser(null);
        router.push('/auth/login')
        console.log('User logged out');
        closeMenu();
    };

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current,
    }));

    return (
        <div className={"layout-topbar-main"}>
            <div className="layout-topbar">
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
                    <i className="pi pi-bars" />
                </button>

                <button
                    ref={topbarmenubuttonRef}
                    type="button"
                    className="p-link layout-topbar-menu-button layout-topbar-button"
                    onClick={showProfileSidebar}
                    aria-label="Show Profile Sidebar"
                >
                    <i className="pi pi-ellipsis-v" />
                </button>

                <div
                    ref={topbarmenuRef}
                    className={classNames('layout-topbar-menu', {
                        'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible,
                    })}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Link href="/dashboard" underline="none" sx={{ color: '#ed6c02;', mx: 2, fontWeight: 'bold', fontSize: 'medium' }}>
                            XIN CHAO
                        </Link>
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
                        {user ? (
                            <div>
                                <span>{user.roles}</span>
                                <Button variant="contained" color="warning" onClick={handleLogout} sx={{boxShadow: 'none', borderRadius: 2, ml: 2 }}>
                                    Log Out
                                </Button>
                            </div>
                        ) : (
                            <Button variant="contained" color="warning" startIcon={<i className="pi pi-user"></i>} sx={{boxShadow: 'none', borderRadius: 2 }}>
                                Log In
                            </Button>
                        )}
                    </Box>
                </div>

            </div>{/* Box sẽ được đặt ở hàng thứ hai nếu sử dụng Grid Layout */}


        </div>
    );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;
