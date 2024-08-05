'use client'
import withAuth from '@/app/components/withAuth';
import Layout from './Layout';

const ProtectedLayout = withAuth(Layout);

export default ProtectedLayout;
