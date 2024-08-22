'use client'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const withAuth = (WrappedComponent) => {
    // eslint-disable-next-line react/display-name
    return (props) => {
        const router = useRouter();
        const isAuthenticated = typeof window !== 'undefined' && localStorage.getItem('jwtToken');

        useEffect(() => {
            if (!isAuthenticated) {

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
