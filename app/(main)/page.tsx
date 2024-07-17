/* eslint-disable @next/next/no-img-element */
'use client';
import {Button} from 'primereact/button';
import {Chart} from 'primereact/chart';
import {Column} from 'primereact/column';
import {DataTable} from 'primereact/datatable';
import {Menu} from 'primereact/menu';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {ProductService} from '../../demo/service/ProductService';
import {LayoutContext} from '../../layout/context/layoutcontext';
import Link from 'next/link';
import {Demo} from '@/types';
import {ChartData, ChartOptions} from 'chart.js';

const lineData: ChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            backgroundColor: '#2f4860',
            borderColor: '#2f4860',
            tension: 0.4
        },
        {
            label: 'Second Dataset',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            backgroundColor: '#00bb7e',
            borderColor: '#00bb7e',
            tension: 0.4
        }
    ]
};

const Dashboard = () => {
    const [products, setProducts] = useState<Demo.Product[]>([]);
    const menu1 = useRef<Menu>(null);
    const menu2 = useRef<Menu>(null);
    const [lineOptions, setLineOptions] = useState<ChartOptions>({});
    const {layoutConfig} = useContext(LayoutContext);

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

    useEffect(() => {
        ProductService.getProductsSmall().then((data) => setProducts(data));
    }, []);

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

    return (
        <div className="h1"><img alt="picture" src="https://vimc.co/wp-content/uploads/2020/08/Slide-vimc-3.png"/><br/>
            About us<br/>
            <div className="h2">Our Company</div>
            <br/>
            <div className="left-column">
                Established in 1995 under the Prime Minister's Decision No. 250 / TTg with the mission of being
                the core and key enterprise of Vietnam's maritime industry. Over 29 years of establishment and
                development, VIMC is one of leading businesses in opening up cooperation, international integration,
                providing maritime services on a global scale, making an important contribution to the development
                of Vietnam's marine economy. VIMC changed to operate as a joint stock company from August 18,
                2020<br/><br/>
                Vietnamese name: Vietnam Maritime Corporation - Joint Stock Company<br/><br/>
                English name: Vietnam Maritime Corporation<br/><br/>
                International name: VIMC<br/><br/>
                Date of establishment: 29/04/1995<br/><br/>
                Address: Ocean Park Building - No.1 Dao Duy Anh, Phuong Mai, Dong Da, Hanoi
            </div>
            <div className="right-column">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/bQogMM1PEpM?si=ilQ260qK59bNktol" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen></iframe>
            </div>
        </div>
    );
};

export default Dashboard;
