/* eslint-disable @next/next/no-img-element */
'use client';
import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Menu } from 'primereact/menu';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ProductService } from '../../demo/service/ProductService';
import { LayoutContext } from '../../layout/context/layoutcontext';
import Link from 'next/link';
import { Demo } from '@/types';
import {isUpdateApproved} from '/ctms-frontend/app/api/container';
import {getEmptyContainers} from '/ctms-frontend/app/api/container';
import {getEmptyContainerById} from '/ctms-frontend/app/api/container';

import EmptyContainerDetailModal from './EmptyContainerDetailModal';

import { ChartData, ChartOptions } from 'chart.js';
import Calendar from "@/app/(main)/uikit/Calendar";

const lineData: ChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Phí sửa chữa container',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            backgroundColor: '#2f4860',
            borderColor: '#2f4860',
            tension: 0.4
        },
        {
            label: 'Phí DET',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            backgroundColor: '#00bb7e',
            borderColor: '#00bb7e',
            tension: 0.4
        }
    ]
};

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const menu1 = useRef<Menu>(null);
    const menu2 = useRef<Menu>(null);
    const [lineOptions, setLineOptions] = useState<ChartOptions>({});
    const { layoutConfig } = useContext(LayoutContext);
    const [selectedContainer, setSelectedContainer] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [totalDetFee, setTotalDetFee] = useState(0);
    const [totalPaidRepairCost, setTotalPaidRepairCost] = useState(0);
    const [totalCusTomer, setTotalCusTomer] = useState(0);

    const getAuthConfig = () => ({
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
        }
    })
    useEffect(() => {
        fetch('http://localhost:8080/api/drop-orders/detfee/sum')
            .then(response => response.json())
            .then(data => setTotalDetFee(data))
            .catch(error => console.error('Error fetching det fee sum:', error));
    }, []);

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/repair/cost/paid')
            .then(response => response.json())
            .then(data => setTotalPaidRepairCost(data))
            .catch(error => console.error('Error fetching paid repair cost:', error));
    }, []);

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/customers/count')
            .then(response => response.json())
            .then(data => setTotalCusTomer(data))
            .catch(error => console.error('Error fetching paid repair cost:', error));
    },[]);


    const applyLightTheme = () => {
        const lineOptions: ChartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        setLineOptions(lineOptions);
    };

    const applyDarkTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)'
                    }
                },
                y: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)'
                    }
                }
            }
        };

        setLineOptions(lineOptions);
    };

    const fetchEmptyContainers = () => {
        getEmptyContainers().then(res => {
            setProducts(res.data)
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            console.log("finish")
        })
    }
    useEffect(() => {
       fetchEmptyContainers()
    }, []);

    const handleViewDetails = (value: number) => {
        // Fetch container details by ID
        getEmptyContainerById(value)
            .then(res => {
                setSelectedContainer(res.data);
                setIsModalVisible(true);
            })
            .catch(err => {
                console.error("Error fetching container details:", err);
            });
    };

    const updateIsApproved = (value: number) => {
        isUpdateApproved(value).then(res =>{
            fetchEmptyContainers() ;

        })

    }
    useEffect(() => {
        if (layoutConfig.colorScheme === 'light') {
            applyLightTheme();
        } else {
            applyDarkTheme();
        }
    }, [layoutConfig.colorScheme]);

    const formatCurrency = (value: number) => {
        return value?.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
    };

    const formatTime = (value: Date) => {
        return new Date(value).toLocaleString()
    }

    const view = (value: number) => {
        return <Button icon="pi pi-search" text onClick={() => handleViewDetails(value)}  />
    }

    const isApproved = (value: number) => {
        return <Button icon="pi pi-check" text onClick={() => updateIsApproved(value)}/>
    }


    // @ts-ignore
    return (
        <div className="grid">
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Tổng số tiền phí DET</span>
                            <div className="text-900 font-medium text-xl">{totalDetFee.toLocaleString()} VNĐ</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-shopping-cart text-blue-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">24 new </span>
                    <span className="text-500">since last visit</span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Tổng số tiền phí sửa chữa container</span>
                            <div className="text-900 font-medium text-xl">{totalPaidRepairCost.toLocaleString()} VNĐ</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-map-marker text-orange-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">%52+ </span>
                    <span className="text-500">since last week</span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Tổng chi phí giao hàng</span>
                            <div className="text-900 font-medium text-xl">28441</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-inbox text-cyan-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">520 </span>
                    <span className="text-500">newly registered</span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Số lượng người dùng</span>
                            <div className="text-900 font-medium text-xl">{totalCusTomer}</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-comment text-purple-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">85 </span>
                    <span className="text-500">responded</span>
                </div>
            </div>

{/*Phê duyệt lệnh cấp rỗng*/}
            <div className="col-12 xl:col-6">
                <div className="card">
                    <h5>Lệnh cấp container rỗng</h5>
                    <DataTable value={products} rows={5} paginator responsiveLayout="scroll">
                        <Column field="customer.username" header="Khách hàng" sortable style={{ width: '35%' }} />
                        <Column header="Thời gian" sortable style={{ width: '35%' }} body={(data) => formatTime(data.requestTime)}/>
                        <Column field="isApproved" header="Duyệt" sortable style={{ width: '15%' }}
                                body={(data) => (
                                    isApproved(data.id)
                                    // <>
                                    //     <i ><Button icon="pi pi-check" text /></i>
                                    //
                                    // </>
                                )}
                        />
                        <Column
                            header="View"
                            style={{ width: '15%' }}
                            body={(data) => view(data.id)}
                        />
                    </DataTable>
                </div>
                <div className="card">
                    <h5>Lịch hôm nay</h5>
                    <div className="flex justify-content-center align-items-center">
                        <Calendar />
                    </div>
                </div>
            </div>

            <div className="col-12 xl:col-6">
                <div className="card">
                    <h5>Sales Overview</h5>
                    <Chart type="line" data={lineData} options={lineOptions} />
                </div>

                <div className="card">
                    <div className="flex align-items-center justify-content-between mb-4">
                        <h5>Notifications</h5>
                        <div>
                            <Button type="button" icon="pi pi-ellipsis-v" rounded text className="p-button-plain" onClick={(event) => menu2.current?.toggle(event)} />
                            <Menu
                                ref={menu2}
                                popup
                                model={[
                                    { label: 'Add New', icon: 'pi pi-fw pi-plus' },
                                    { label: 'Remove', icon: 'pi pi-fw pi-minus' }
                                ]}
                            />
                        </div>
                    </div>

                    <span className="block text-600 font-medium mb-3">TODAY</span>
                    <ul className="p-0 mx-0 mt-0 mb-4 list-none">
                        <li className="flex align-items-center py-2 border-bottom-1 surface-border">
                            <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
                                <i className="pi pi-dollar text-xl text-blue-500" />
                            </div>
                            <span className="text-900 line-height-3">
                                Richard Jones
                                <span className="text-700">
                                    {' '}
                                    has purchased a blue t-shirt for <span className="text-blue-500">79$</span>
                                </span>
                            </span>
                        </li>
                        <li className="flex align-items-center py-2">
                            <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-orange-100 border-circle mr-3 flex-shrink-0">
                                <i className="pi pi-download text-xl text-orange-500" />
                            </div>
                            <span className="text-700 line-height-3">
                                Your request for withdrawal of <span className="text-blue-500 font-medium">2500$</span> has been initiated.
                            </span>
                        </li>
                    </ul>

                    <span className="block text-600 font-medium mb-3">YESTERDAY</span>
                    <ul className="p-0 m-0 list-none">
                        <li className="flex align-items-center py-2 border-bottom-1 surface-border">
                            <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
                                <i className="pi pi-dollar text-xl text-blue-500" />
                            </div>
                            <span className="text-900 line-height-3">
                                Keyser Wick
                                <span className="text-700">
                                    {' '}
                                    has purchased a black jacket for <span className="text-blue-500">59$</span>
                                </span>
                            </span>
                        </li>
                        <li className="flex align-items-center py-2 border-bottom-1 surface-border">
                            <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-pink-100 border-circle mr-3 flex-shrink-0">
                                <i className="pi pi-question text-xl text-pink-500" />
                            </div>
                            <span className="text-900 line-height-3">
                                Jane Davis
                                <span className="text-700"> has posted a new questions about your product.</span>
                            </span>
                        </li>
                    </ul>
                </div>
                <div
                    className="px-4 py-5 shadow-2 flex flex-column md:flex-row md:align-items-center justify-content-between mb-3"
                    style={{
                        borderRadius: '1rem',
                        background: 'linear-gradient(0deg, rgba(0, 123, 255, 0.5), rgba(0, 123, 255, 0.5)), linear-gradient(92.54deg, #1C80CF 47.88%, #FFFFFF 100.01%)'
                    }}
                >
                    <div>
                        <div className="text-blue-100 font-medium text-xl mt-2 mb-3">TAKE THE NEXT STEP</div>
                        <div className="text-white font-medium text-5xl">Try PrimeBlocks</div>
                    </div>
                    <div className="mt-4 mr-auto md:mt-0 md:mr-0">
                        <Link href="https://blocks.primereact.org" className="p-button font-bold px-5 py-3 p-button-warning p-button-rounded p-button-raised">
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>

            <EmptyContainerDetailModal
                visible={isModalVisible}
                onHide={() => setIsModalVisible(false)}
                emptyContainer={selectedContainer}
            />
        </div>
    );
};

export default Dashboard;
