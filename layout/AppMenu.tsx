/* eslint-disable @next/next/no-img-element */

import React, {useContext, useEffect, useState} from 'react';
import AppMenuitem from './AppMenuitem';
import {LayoutContext} from './context/layoutcontext';
import {MenuProvider} from './context/menucontext';
import {AppMenuItem} from '@/types';
// @ts-ignore
import {isAdmin, isCustomer, isManager, isStaff} from "/app/verifyRole";

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);
    const [model, setModel] = useState<AppMenuItem[]>([]);
    const jwtToken = localStorage.getItem('jwtToken');
    const authToken = localStorage.getItem('authToken');
    useEffect(() => {
        let menuItems: AppMenuItem[] = [];
        if (isAdmin(jwtToken,authToken)) {
            menuItems = [
                {
                    label: 'Home',
                    items: [{label: 'Home', icon: 'pi pi-fw pi-home', to: '/pages/landing'}]
                },
                {
                    label: 'Danh mục quản lý',
                    items: [
                        {
                            label: 'Container và lịch trình',
                            icon: 'pi pi-fw pi-box',
                            items: [
                                {label: 'Tạo tuyến', icon: 'pi pi-fw pi-chart-bar', to: '/uikit/tuyenduong'},
                                {label: 'Tạo tàu', icon: 'pi pi-fw pi-chart-bar', to: '/uikit/tau'},
                                {label: 'Loại container', icon: 'pi pi-fw pi-align-left', to: '/uikit/container'},

                                {
                                    label: 'Đơn vị sửa chữa container',
                                    icon: 'pi pi-fw pi-th-large',
                                    to: '/uikit/container_supplier'
                                }

                            ]
                        },

                        {
                            label: 'Quản lý tài khoản',
                            icon: 'pi pi-fw pi-sitemap',
                            items: [
                                {label: 'Thêm/sửa/xóa người dùng', icon: 'pi pi-fw pi-tag', to: '/uikit/user'},
                            ]
                        }
                        ]
                }

            ];

        } else if (isCustomer(jwtToken,authToken)) {
            menuItems = [
                {
                    label: 'Home',
                    items: [{label: 'Home', icon: 'pi pi-fw pi-home', to: '/pages/landing'}]

                },
                {
                    label: 'Danh mục quản lý',
                    items: [
                        {
                            label: 'Container và lịch trình',
                            icon: 'pi pi-fw pi-box',
                            items: [
                                {label: 'Trạng Thái Container', icon: 'pi pi-fw pi-slack', to: '/uikit/trangthaiCont'},
                                {label: 'Danh sách container đang sửa chữa', icon: 'pi pi-fw pi-th-large', to: '/uikit/containerDangSuaChua'}


                            ]
                        },
                        {
                            label: 'Thủ tục hàng hải',
                            icon: 'pi pi-fw pi-tag',
                            items: [
                                {label: 'Lệnh cấp container rỗng', icon: 'pi pi-fw pi-megaphone', to: '/uikit/capContRong'},
                                {label: 'Khai báo SI', icon: 'pi pi-fw pi-send', to: '/uikit/khaiBaoSI'},
                                {label: 'Lệnh hạ Hàng', icon: 'pi pi-fw pi-chevron-down', to: '/uikit/haHang'},
                            ]
                        },
                        {
                            label: 'Thủ tục tài chính',
                            icon: 'pi pi-fw pi-sitemap',
                            items: [
                                {label: 'Phí DET/DEM', icon: 'pi pi-fw pi-tag', to: '/uikit/tinhphiDET'},
                                {label: 'Phí sửa chữa container', icon: 'pi pi-fw pi-money-bill', to: '/uikit/tinhPhiSuaContainer'},
                                {label: 'Phí giao hàng', icon: 'pi pi-fw pi-money-bill', to: '/uikit/tinhPhiGiaoHang'},
                            ]
                        },


                    ]

                }
            ];
        } else if (isStaff(jwtToken,authToken)) {
            menuItems = [
                {
                    label: 'Home',
                    items: [{label: 'Home', icon: 'pi pi-fw pi-home', to: '/'}]

                },
                {
                    label: 'Danh mục quản lý',
                    items: [
                        {
                            label: 'Container và lịch trình',
                            icon: 'pi pi-fw pi-box',
                            items: [
                                {label: 'Trạng Thái Container', icon: 'pi pi-fw pi-slack', to: '/uikit/trangthaiCont'},
                                {label: 'Danh sách container đang sửa chữa', icon: 'pi pi-fw pi-th-large', to: '/uikit/containerDangSuaChua'}


                            ]
                        },
                        {
                            label: 'Thủ tục tài chính',
                            icon: 'pi pi-fw pi-sitemap',
                            items: [
                                {label: 'Phí DET', icon: 'pi pi-fw pi-tag', to: '/uikit/tinhphiDET'},
                                {label: 'Phí sửa chữa container', icon: 'pi pi-fw pi-money-bill', to: '/uikit/tinhPhiSuaContainer'},
                                {label: 'Phí giao hàng', icon: 'pi pi-fw pi-money-bill', to: '/uikit/tinhPhiGiaoHang'},
                            ]
                        },


                    ]

                }
            ];
        } else if (isManager(jwtToken,authToken)) {
            menuItems = [
                {
                    label: 'Home',
                    items: [{label: 'Home', icon: 'pi pi-fw pi-home', to: '/'}]

                },
                {
                    label: 'Danh mục quản lý',
                    items: [
                        {
                            label: 'Container và lịch trình',
                            icon: 'pi pi-fw pi-box',
                            items: [
                                {label: 'Tạo lịch trình', icon: 'pi pi-fw pi-sliders-v', to: '/uikit/lichtrinh'},
                                {label: 'Trạng Thái Container', icon: 'pi pi-fw pi-slack', to: '/uikit/trangthaiCont'},

                            ]
                        },
                        {
                            label: 'Thủ tục hàng hải',
                            icon: 'pi pi-fw pi-tag',
                            items: [
                                {label: 'Khai báo SI', icon: 'pi pi-fw pi-send', to: '/uikit/khaiBaoSI'},
                                {label: 'Lệnh hạ Hàng', icon: 'pi pi-fw pi-chevron-down', to: '/uikit/haHang'},
                                {label: 'Lệnh giao Hàng', icon: 'pi pi-fw pi-chevron-down', to: '/uikit/giaoHang'},
                            ]
                        },
                        {
                            label: 'Thủ tục tài chính',
                            icon: 'pi pi-fw pi-sitemap',
                            items: [
                                {label: 'Phí DET', icon: 'pi pi-fw pi-tag', to: '/uikit/tinhphiDET'},
                                {label: 'Phí sửa chữa container', icon: 'pi pi-fw pi-money-bill', to: '/uikit/tinhPhiSuaContainer'},
                                {label: 'Phí giao hàng', icon: 'pi pi-fw pi-money-bill', to: '/uikit/tinhPhiGiaoHang'},
                            ]
                        },


                    ]

                }
            ];
        }

        setModel(menuItems);
    }, [authToken, jwtToken]);

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}

            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
