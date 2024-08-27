import {classNames} from 'primereact/utils';
import React, {forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState} from 'react';
import {AppTopbarRef} from '@/types';
import {LayoutContext} from './context/layoutcontext';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import CircularProgress from '@mui/material/CircularProgress';
import {useRouter} from 'next/navigation';
import {isAdmin, isCustomer, isManager, isStaff} from "app/verifyRole";

interface User {
    name: string;
    roles: string;
}

const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
    const authToken = localStorage.getItem('authToken') ?? 'null';
    const jwtToken = localStorage.getItem('jwtToken') ?? 'null';
    const {layoutConfig, layoutState, onMenuToggle, showProfileSidebar} = useContext(LayoutContext);
    const menubuttonRef = useRef<HTMLButtonElement>(null);
    const topbarmenuRef = useRef<HTMLDivElement>(null);
    const topbarmenubuttonRef = useRef<HTMLButtonElement>(null);
    const [showMenu, setShowMenu] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
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

    const handleLogout = async () => {
        setLoading(true); // Show loading spinner
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
        setUser(null);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        setLoading(false);
        router.push('/auth/login');
        closeMenu();
    };

    const handleLogin = async () => {
        setLoading(true); // Show loading spinner

        // Simulate login process
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setLoading(false); // Hide loading spinner
        router.push('/auth/login'); // Redirect to login page
    };

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current,
    }));
    let role = (() => {
        if (isAdmin(jwtToken, authToken)) return 'ADMIN';
        if (isStaff(jwtToken, authToken)) return 'STAFF';
        if (isCustomer(jwtToken, authToken)) return 'CUSTOMER';
        if (isManager(jwtToken, authToken)) return 'MANAGER';
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
        window.location.reload();
        return '';
    })();

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
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <Link href="/dashboard" underline="none"
                              sx={{color: '#ed6c02;', mx: 2, fontWeight: 'bold', fontSize: 'medium'}}>
                            Xin chào
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
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        {loading ? (
                            <CircularProgress color="inherit" size={24}/>
                        ) : user ? (
                            <div>
                                <span>{user.name} ({role})
                                <Button variant="contained" color="warning" onClick={handleLogout}
                                        sx={{boxShadow: 'none', borderRadius: 2, ml: 2}}>
                                    <i className="pi pi-sign-out"></i>
                                </Button></span>
                            </div>
                        ) : (
                            <Button variant="contained" color="warning" startIcon={<i className="pi pi-user"></i>}
                                    onClick={handleLogin}>
                                Log In
                            </Button>
                        )}
                    </Box>
                </div>
            </div>
        </div>
    );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;
