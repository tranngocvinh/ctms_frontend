'use client'
import withAuth from '@/app/components/withAuth';
import Layout from './layout';

const ProtectedLayout = withAuth(Layout);

export default ProtectedLayout;
