'use client'
import withAuth from '@/app/components/withAuth';
import Layout from 'layout/layout';

const ProtectedLayout = withAuth(Layout);

export default ProtectedLayout;
