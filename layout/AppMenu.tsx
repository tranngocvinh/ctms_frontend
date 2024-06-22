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
            items: [{label: 'Home', icon: 'pi pi-fw pi-home', to: '/'}]
            // {label: 'Services & Information', to: '/uikit/sevieces'},
            // {label: 'About us', to: '/uikit/aboutus'},
            // {label: 'Online Business Suite', to: '/uikit/onlinebusiness'}]
        },
        {
            label: 'UI Components',
            items: [
                {
                    label: 'Categories',
                    icon: 'pi pi-fw pi-box',
                    items: [
                        {label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/uikit/charts'},
                        {label: 'Container', icon: 'pi pi-fw pi-align-left', to: '/uikit/container'},
                        {label: 'Trạng Thái Container', icon: 'pi pi-fw pi-slack', to: '/uikit/trangthaiCont'},
                        {label: 'Biến Động Container', icon: 'pi pi-fw pi-sliders-v', to: '/uikit/biendongCont'},
                        {
                            label: 'Đơn vị sửa chữa container',
                            icon: 'pi pi-fw pi-th-large',
                            to: '/uikit/container_supplier'
                        },
                        {
                            label: 'Mục Sửa Chữa Container',
                            icon: 'pi pi-fw pi-check-square',
                            to: '/uikit/mucsuachuaCont'
                        },
                        {label: 'Giá Sửa Chữa Container', icon: 'pi pi-fw pi-dollar', to: '/uikit/giasuachuaCont'},
                        {
                            label: 'Quản Lý Vệ Sinh Container',
                            icon: 'pi pi-fw pi-folder-open',
                            to: '/uikit/quanlyvesinhCont'
                        },
                        {
                            label: 'Bảng Giá Sửa Chữa,Vệ Sinh',
                            icon: 'pi pi-fw pi-wrench',
                            to: '/uikit/banggiasuachuaVSinh'
                        },
                        {
                            label: 'Báo Giá Sửa Chữa, Vệ Sinh',
                            icon: 'pi pi-fw pi-calendar-times',
                            to: '/uikit/baogiasuachuaVSinh'
                        }
                    ]
                },
                {
                    label: 'Order issued',
                    icon: 'pi pi-fw pi-tag',
                    items: [
                        {label: 'Cấp Container rỗng', icon: 'pi pi-fw pi-megaphone', to: '/uikit/capContRong'},
                        {label: 'Cấp Container chuyển vỏ', icon: 'pi pi-fw pi-send', to: '/uikit/capContchuyenvo'},
                        {label: 'Cấp Khống', icon: 'pi pi-fw pi-sort-amount-down', to: '/uikit/capKhong'},
                        {
                            label: 'Cấp Container rỗng cho Khách',
                            icon: 'pi pi-fw pi-inbox',
                            to: '/uikit/capControngchokhach'
                        },
                        {label: 'Hạ Hàng', icon: 'pi pi-fw pi-chevron-down', to: '/uikit/haHang'},
                        {label: 'Hạ Khống', icon: 'pi pi-fw pi-chevron-circle-down', to: '/uikit/haKhong'}
                    ]
                },
                {
                    label: 'Import-export and costs',
                    icon: 'pi pi-fw pi-sitemap',
                    items: [
                        {label: 'Hạ Container', icon: 'pi pi-fw pi-download', to: '/uikit/haCont'},
                        {label: 'Xuất Container lên tàu', icon: 'pi pi-fw pi-sign-in', to: '/uikit/xuatContlentau'},
                        {label: 'Nhập Tàu', icon: 'pi pi-fw pi-plus-circle', to: '/uikit/nhapTau'},
                        {label: 'Giao Hàng', icon: 'pi pi-fw pi-truck', to: '/uikit/giaoHang'},
                        {label: 'Trả Cước Container', icon: 'pi pi-fw pi-globe', to: '/uikit/traCuocCont'},
                        {label: 'Trả Rỗng chờ Vệ Sinh', icon: 'pi pi-fw pi-tag', to: '/uikit/traRongVeSinh'},
                        {label: 'Tính Phí DEM/DET', icon: 'pi pi-fw pi-money-bill', to: '/uikit/tinhphiDEM'},
                        {
                            label: 'Tổng Hợp Phí D/O, Điện Lạnh, Vệ Sinh, Sửa Chữa',
                            icon: 'pi pi-fw pi-inbox',
                            to: '/uikit/tonghopPhi'
                        }]
                },]
        }

                    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}

                {/*<Link href="https://blocks.primereact.org" target="_blank" style={{ cursor: 'pointer' }}>*/}
                {/*    <img alt="Prime Blocks" className="w-full mt-3" src={`/layout/images/banner-primeblocks${layoutConfig.colorScheme === 'light' ? '' : '-dark'}.png`} />*/}
                {/*</Link>*/}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
