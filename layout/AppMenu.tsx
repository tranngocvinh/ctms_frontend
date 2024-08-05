/* eslint-disable @next/next/no-img-element */

import React, { useContext, useEffect, useState } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import Link from 'next/link';
import { AppMenuItem } from '@/types';

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);
    const [model, setModel] = useState<AppMenuItem[]>([]);

    useEffect(() => {
        const userRole = localStorage.getItem('userRole');
        let menuItems: AppMenuItem[] = [];

        if (userRole === 'ADMIN') {
            menuItems = [
                {
                    label: 'Home',
                    items: [{label: 'Home', icon: 'pi pi-fw pi-home', to: '/'}]
                    // {label: 'Services & Information', to: '/uikit/sevieces'},
                    // {label: 'About us', to: '/uikit/aboutus'},
                    // {label: 'Online Business Suite', to: '/uikit/onlinebusiness'}]
                },
                {
                    label: 'Danh mục quản lý',
                    items: [
                        {
                            label: 'Container và lịch trình',
                            icon: 'pi pi-fw pi-box',
                            items: [
                                {label: 'Tạo tuyến', icon: 'pi pi-fw pi-chart-bar', to: '/uikit/tuyenduong'},
                                {label: 'Container', icon: 'pi pi-fw pi-align-left', to: '/uikit/container'},
                                {label: 'Trạng Thái Container', icon: 'pi pi-fw pi-slack', to: '/uikit/trangthaiCont'},
                                {label: 'Tạo lịch trình', icon: 'pi pi-fw pi-sliders-v', to: '/uikit/lichtrinh'},
                                {
                                    label: 'Đơn vị sửa chữa container',
                                    icon: 'pi pi-fw pi-th-large',
                                    to: '/uikit/container_supplier'
                                }

                            ]
                        },
                        {
                            label: 'Thủ tục hàng hải',
                            icon: 'pi pi-fw pi-tag',
                            items: [
                                {label: 'Lệnh cấp container rỗng', icon: 'pi pi-fw pi-megaphone', to: '/uikit/capContRong'},
                                {label: 'Khai báo SI', icon: 'pi pi-fw pi-send', to: '/uikit/khaiBaoSI'},
                                {label: 'Lệnh hạ Hàng', icon: 'pi pi-fw pi-chevron-down', to: '/uikit/haHang'},
                                {label: 'Lệnh giao hàng', icon: 'pi pi-fw pi-chevron-circle-down', to: '/uikit/giaoHang'}
                            ]
                        },
                        {
                            label: 'Thủ tục tài chính',
                            icon: 'pi pi-fw pi-sitemap',
                            items: [
                                {label: 'Hạ Container', icon: 'pi pi-fw pi-download', to: '/uikit/haHang'},
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

        } else if (userRole === 'customer') {
            menuItems = [
                {
                    label: 'Home',
                    items: [{ label: 'Home', icon: 'pi pi-fw pi-home', to: '/' }]
                },
                {
                    label: 'Customer Services',
                    items: [{ label: 'Orders', icon: 'pi pi-fw pi-shopping-cart', to: '/customer/orders' }]
                }
            ];
        } else if (userRole === 'shipping_company') {
            menuItems = [
                {
                    label: 'Home',
                    items: [{ label: 'Home', icon: 'pi pi-fw pi-home', to: '/' }]
                },
                {
                    label: 'Shipping Services',
                    items: [{ label: 'Manage Ships', icon: 'pi pi-fw pi-ship', to: '/shipping/ships' }]
                }
            ];
        } else if (userRole === 'transport_unit') {
            menuItems = [
                {
                    label: 'Home',
                    items: [{ label: 'Home', icon: 'pi pi-fw pi-home', to: '/' }]
                },
                {
                    label: 'Transport Services',
                    items: [{ label: 'Manage Transport', icon: 'pi pi-fw pi-truck', to: '/transport/manage' }]
                }
            ];
        }

        setModel(menuItems);
    }, []);

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}

                {/* Bạn có thể thêm các liên kết khác vào đây */}
                {/*<Link href="https://blocks.primereact.org" target="_blank" style={{ cursor: 'pointer' }}>*/}
                {/*    <img alt="Prime Blocks" className="w-full mt-3" src={`/layout/images/banner-primeblocks${layoutConfig.colorScheme === 'light' ? '' : '-dark'}.png`} />*/}
                {/*</Link>*/}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
