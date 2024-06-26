/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import Link from 'next/link';
import { AppMenuItem } from '@/types';

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);

    const model: AppMenuItem[] = [
        {
            label: 'Home',
            items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
        },
        {
            label: 'UI Components',
            items: [

                { label: 'Loại container', icon: 'pi pi-fw pi-th-large', to: '/uikit/container' },
                { label: 'Quản lý tuyến đường', icon: 'pi pi-fw pi-chart-bar', to: '/uikit/tuyenduong' },
                { label: 'Quản lý lịch trình', icon: 'pi pi-fw pi-chart-bar', to: '/uikit/lichtrinh' },
                { label: 'Chi tiết tuyến đường', icon: 'pi pi-fw pi-chart-bar', to: '/uikit/tuyenduongchitiet' },
                { label: 'Quản lý tàu', icon: 'pi pi-fw pi-chart-bar', to: '/uikit/tau' },
                { label: 'Trạng Thái Container', icon: 'pi pi-fw pi-info', to: '/uikit/trangthaiCont' },
                { label: 'Đơn vị sửa chữa container', icon: 'pi pi-fw pi-th-large', to: '/uikit/container_supplier' },
                { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/uikit/charts' },
                { label: 'Biến Động Container', icon: 'pi pi-fw pi-sliders-v', to: '/uikit/biendongCont' },
                { label: 'Mục Sửa Chữa Container', icon: 'pi pi-fw pi-check-square', to: '/uikit/mucsuachuaCont' },
                { label: 'Giá Sửa Chữa Container', icon: 'pi pi-fw pi-dollar', to: '/uikit/giasuachuaCont' },
                { label: 'Quản Lý Vệ Sinh Container', icon: 'pi pi-fw pi-hammer', to: '/uikit/quanlyvesinhCont' },
                { label: 'Bảng Giá Sửa Chữa,Vệ Sinh', icon: 'pi pi-fw pi-wrench', to: '/uikit/banggiasuachuaVSinh' },
                { label: 'Báo Giá Sửa Chữa, Vệ Sinh', icon: 'pi pi-fw pi-calendar-times', to: '/uikit/baogiasuachuaVSinh' },
                { label: 'Cấp Container rỗng', icon: 'pi pi-fw pi-megaphone', to: '/uikit/capContRong' },
                { label: 'Cấp Container chuyển vỏ', icon: 'pi pi-fw pi-send', to: '/uikit/capContchuyenvo' },
                { label: 'Cấp Khống', icon: 'pi pi-fw pi-sort-amount-down', to: '/uikit/capKhong' },
                { label: 'Cấp Container rỗng cho Khách', icon: 'pi pi-fw pi-objects-column', to: '/uikit/capControngchokhach' },
                { label: 'Hạ Hàng', icon: 'pi pi-fw pi-chevron-down', to: '/uikit/haHang' },
                { label: 'Hạ Khống', icon: 'pi pi-fw pi-chevron-circle-down', to: '/uikit/haKhong' },
                { label: 'Hạ Container', icon: 'pi pi-fw pi-download', to: '/uikit/haCont' },
                { label: 'Xuất Container lên tàu', icon: 'pi pi-fw pi-sign-in', to: '/uikit/xuatContlentau' },
                { label: 'Nhập Tàu', icon: 'pi pi-fw pi-plus-circle', to: '/uikit/nhapTau' },
                { label: 'Giao Hàng', icon: 'pi pi-fw pi-truck', to: '/uikit/giaoHang' },
                { label: 'Trả Rỗng chờ Vệ Sinh', icon: 'pi pi-fw pi-tag', to: '/uikit/traRongVeSinh' },
                { label: 'Tính Phí DEM/DET', icon: 'pi pi-fw pi-calculato', to: '/uikit/tinhphiDEM' },
                { label: 'Tổng Hợp Phí D/O, Điện Lạnh, Vệ Sinh, Sửa Chữa', icon: 'pi pi-fw pi-inbox', to: '/uikit/tonghopPhi' }


            ]
        },
        {
            label: 'Prime Blocks',
            items: [
                { label: 'Free Blocks', icon: 'pi pi-fw pi-eye', to: '/blocks', badge: 'NEW' },
                { label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: 'https://blocks.primereact.org', target: '_blank' }
            ]
        },
        {
            label: 'Utilities',
            items: [
                { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', to: '/utilities/icons' },
                { label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: 'https://primeflex.org/', target: '_blank' }
            ]
        },
        {
            label: 'Pages',
            icon: 'pi pi-fw pi-briefcase',
            to: '/pages',
            items: [
                {
                    label: 'Landing',
                    icon: 'pi pi-fw pi-globe',
                    to: '/landing'
                },
                {
                    label: 'Auth',
                    icon: 'pi pi-fw pi-user',
                    items: [
                        {
                            label: 'Login',
                            icon: 'pi pi-fw pi-sign-in',
                            to: '/auth/login'
                        },
                        {
                            label: 'Error',
                            icon: 'pi pi-fw pi-times-circle',
                            to: '/auth/error'
                        },
                        {
                            label: 'Access Denied',
                            icon: 'pi pi-fw pi-lock',
                            to: '/auth/access'
                        }
                    ]
                },
                {
                    label: 'Crud',
                    icon: 'pi pi-fw pi-pencil',
                    to: '/pages/crud'
                },
                {
                    label: 'Timeline',
                    icon: 'pi pi-fw pi-calendar',
                    to: '/pages/timeline'
                },
                {
                    label: 'Not Found',
                    icon: 'pi pi-fw pi-exclamation-circle',
                    to: '/pages/notfound'
                },
                {
                    label: 'Empty',
                    icon: 'pi pi-fw pi-circle-off',
                    to: '/pages/empty'
                }
            ]
        },
        {
            label: 'Hierarchy',
            items: [
                {
                    label: 'Submenu 1',
                    icon: 'pi pi-fw pi-bookmark',
                    items: [
                        {
                            label: 'Submenu 1.1',
                            icon: 'pi pi-fw pi-bookmark',
                            items: [
                                { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
                                { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
                                { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' }
                            ]
                        },
                        {
                            label: 'Submenu 1.2',
                            icon: 'pi pi-fw pi-bookmark',
                            items: [{ label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }]
                        }
                    ]
                },
                {
                    label: 'Submenu 2',
                    icon: 'pi pi-fw pi-bookmark',
                    items: [
                        {
                            label: 'Submenu 2.1',
                            icon: 'pi pi-fw pi-bookmark',
                            items: [
                                { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
                                { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' }
                            ]
                        },
                        {
                            label: 'Submenu 2.2',
                            icon: 'pi pi-fw pi-bookmark',
                            items: [{ label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' }]
                        }
                    ]
                }
            ]
        },
        {
            label: 'Get Started',
            items: [
                {
                    label: 'Documentation',
                    icon: 'pi pi-fw pi-question',
                    to: '/documentation'
                },
                {
                    label: 'Figma',
                    url: 'https://www.dropbox.com/scl/fi/bhfwymnk8wu0g5530ceas/sakai-2023.fig?rlkey=u0c8n6xgn44db9t4zkd1brr3l&dl=0',
                    icon: 'pi pi-fw pi-pencil',
                    target: '_blank'
                },
                {
                    label: 'View Source',
                    icon: 'pi pi-fw pi-search',
                    url: 'https://github.com/primefaces/sakai-react',
                    target: '_blank'
                }
            ]
        }
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}

                <Link href="https://blocks.primereact.org" target="_blank" style={{ cursor: 'pointer' }}>
                    <img alt="Prime Blocks" className="w-full mt-3" src={`/layout/images/banner-primeblocks${layoutConfig.colorScheme === 'light' ? '' : '-dark'}.png`} />
                </Link>
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
