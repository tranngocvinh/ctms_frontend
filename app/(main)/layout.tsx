import { Metadata } from 'next';
import ProtectedLayout from '../../layout/ProtectedLayout';

interface AppLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: 'Hệ thống quản lý containers - VIMC',
    description: 'Quản lý xuất nhập container, tuyến tàu, sản phẩm của nhóm đồ án G42',
    robots: { index: false, follow: false },
    viewport: { initialScale: 1, width: 'device-width' },
    openGraph: {
        type: 'website',
        title: 'Hệ thống quản lý containers - VIMC',
        url: 'https://g42.biz/',
        description: 'Quản lý xuất nhập container, tuyến tàu, sản phẩm của nhóm đồ án G42',
        images: [''],
        ttl: 604800
    },
    icons: {
        icon: '/favicon.ico'
    }
};

export default function AppLayout({ children }: AppLayoutProps) {
    return <ProtectedLayout>{children}</ProtectedLayout>;
}
