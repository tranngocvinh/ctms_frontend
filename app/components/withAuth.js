'use client'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const withAuth = (WrappedComponent) => {
    return (props) => {
        const router = useRouter();
        const isAuthenticated = typeof window !== 'undefined' && localStorage.getItem('jwtToken');

        useEffect(() => {
            if (!isAuthenticated) {
                alert("Vui lòng đăng nhập để tiếp tục")
                router.replace('/auth/login');
            }
        }, [isAuthenticated]);

        if (!isAuthenticated) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
