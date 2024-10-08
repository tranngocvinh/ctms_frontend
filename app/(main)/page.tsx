/* eslint-disable @next/next/no-img-element */
/* eslint react-hooks/rules-of-hooks: 0 */
'use client';
import {Button} from 'primereact/button';
import {
    CategoryScale,
    Chart as ChartJS,
    ChartData,
    ChartOptions,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from 'chart.js'; // Import necessary components
import {Line} from 'react-chartjs-2'; // Import Line from react-chartjs-2
import {Column} from 'primereact/column';
import {DataTable} from 'primereact/datatable';
import {Menu} from 'primereact/menu';
import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import {LayoutContext} from '@/layout/context/layoutcontext';
import {getEmptyContainerById, getEmptyContainers, isUpdateApproved, isUpdateReject} from "@/app/api/container";
import EmptyContainerDetailModal from './EmptyContainerDetailModal';
import Calendar from "@/app/(main)/uikit/Calendar";
import axios from "axios";
import {isManager, isStaff} from "../verifyRole";
import {useRouter} from 'next/navigation';
import {InputText} from "primereact/inputtext";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface LineChartProps {
    apiUrls: {
        deliveryUrl: string;
        detFeeUrl: string;
        repairCostUrl: string;
    };
    labels: string[];
    colors: {
        deliveryColor: string;
        detFeeColor: string;
        repairCostColor: string;
    };
}
const getAuthConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
});
const LineChart: React.FC<LineChartProps> = ({apiUrls, labels, colors}) => {
    const [lineData, setLineData] = useState<ChartData<'line'>>({
        labels: labels,
        datasets: []
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [deliveryResponse, detFeeResponse, repairCostResponse] = await Promise.all([
                    axios.get(apiUrls.deliveryUrl,getAuthConfig()),
                    axios.get(apiUrls.detFeeUrl,getAuthConfig()),
                    axios.get(apiUrls.repairCostUrl,getAuthConfig()),
                ]);

                const deliveryData = labels.map((_, index) => deliveryResponse.data[index + 1] || 0);
                const detFeeData = labels.map((_, index) => detFeeResponse.data[index + 1] || 0);
                const repairCostData = labels.map((_, index) => repairCostResponse.data[index + 1] || 0);

                setLineData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Phí giao hàng',
                            data: deliveryData,
                            fill: false,
                            backgroundColor: colors.deliveryColor,
                            borderColor: colors.deliveryColor,
                            tension: 0.4
                        },
                        {
                            label: 'Phí DET',
                            data: detFeeData,
                            fill: false,
                            backgroundColor: colors.detFeeColor,
                            borderColor: colors.detFeeColor,
                            tension: 0.4
                        },
                        {
                            label: 'Phí sửa chữa',
                            data: repairCostData,
                            fill: false,
                            backgroundColor: colors.repairCostColor,
                            borderColor: colors.repairCostColor,
                            tension: 0.4
                        }
                    ]
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [apiUrls, labels, colors]);

    return <Line data={lineData}/>;
};

interface Customer {
    username: string;
}

// Define an interface for the Product
interface Product {
    id: number;
    customer: Customer;
    requestTime: string;
    isApproved: boolean;
}

const Dashboard = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const menu1 = useRef<Menu>(null);
    const menu2 = useRef<Menu>(null);
    const [lineOptions, setLineOptions] = useState<ChartOptions>({});
    const {layoutConfig} = useContext(LayoutContext);
    const [selectedContainer, setSelectedContainer] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [totalDetFee, setTotalDetFee] = useState(0);
    const [totalPaidRepairCost, setTotalPaidRepairCost] = useState(0);
    const [totalCusTomer, setTotalCusTomer] = useState(0);
    const [totalDelivery, setTotalDelivery] = useState(0);
    const jwtToken = localStorage.getItem('jwtToken');
    const authToken = localStorage.getItem('authToken');
    const [searchCustomerQuery, setSearchCustomerQuery] = useState('');
    const router = useRouter();
    const toast = useRef<Toast>(null); // Toast ref

    if (!isManager(jwtToken, authToken) && !isStaff(jwtToken, authToken)) {
        router.push('/pages/landing');
        return null;
    }
    const getAuthConfig = () => ({
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
    });
    useEffect(() => {
        fetch(`https://auth.g42.biz/api/drop-orders/detfee/sum`, getAuthConfig())
            .then(response => response.json())
            .then(data => setTotalDetFee(data))
            .catch(error => console.error('Error fetching det fee sum:', error));
    }, []);

    useEffect(() => {
        fetch(`https://auth.g42.biz/api/v1/repair/cost/paid`, getAuthConfig())
            .then(response => response.json())
            .then(data => setTotalPaidRepairCost(data))
            .catch(error => console.error('Error fetching paid repair cost:', error));
    }, []);

    useEffect(() => {
        fetch(`https://auth.g42.biz/api/v1/customers/count`, getAuthConfig())
            .then(response => response.json())
            .then(data => setTotalCusTomer(data))
            .catch(error => console.error('Error fetching customer count:', error));
    }, []);

    useEffect(() => {
        fetch(`https://auth.g42.biz/api/delivery-orders/cost/paid`, getAuthConfig())
            .then(response => response.json())
            .then(data => setTotalDelivery(data))
            .catch(error => console.error('Error fetching delivery cost:', error));
    }, []);

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
            setProducts(res.data);
        }).catch(err => {
            console.error('Error fetching empty containers:', err);
        });
    };

    useEffect(() => {
        fetchEmptyContainers();
    }, []);

    const handleViewDetails = (value: number) => {
        getEmptyContainerById(value)
            .then(res => {
                setSelectedContainer(res.data);
                setIsModalVisible(true);
            })
            .catch(err => {
                console.error("Error fetching container details:", err);
            });
    };



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
        return new Date(value).toLocaleString();
    };

    const view = (value: number) => {
        return <Button icon="pi pi-search" text onClick={() => handleViewDetails(value)}/>;
    };

    const filteredProducts = useMemo(() => {
        if (!searchCustomerQuery) return products;

        return products.filter((product) => {
            const customer = product.customer as { username: string };
            return customer.username.toLowerCase().includes(searchCustomerQuery.toLowerCase());
        });
    }, [searchCustomerQuery, products]);
    const updateIsApproved = (value: number) => {
        isUpdateApproved(value)
            .then(() => {
                fetchEmptyContainers();
                toast.current?.show({ severity: 'success', summary: 'Thành công', detail: 'Lệnh cấp rỗng đã được phê duyệt', life: 3000 });
            })
            .catch((err) => {
                console.error("Error updating approval status:", err);
                toast.current?.show({ severity: 'error', summary: 'Thất bại', detail: 'Phê duyệt lệnh cấp rỗng thất bại', life: 3000 });
            });
    };

    const updateIsReject = (value: number) => {
        isUpdateReject(value)
            .then(() => {
                fetchEmptyContainers();
                toast.current?.show({ severity: 'success', summary: 'Thành công', detail: 'Lệnh cấp rỗng đã được từ chối', life: 3000 });
            })
            .catch((err) => {
                console.error("Error rejecting approval status:", err);
                toast.current?.show({ severity: 'error', summary: 'Thất bại', detail: 'Từ chối lệnh cấp rỗng thất bại', life: 3000 });
            });
    };

    const confirmApproval = (value: number) => {
        confirmDialog({
            message: 'Bạn có chắc muốn phê duyệt lệnh cấp rỗng ?',
            header: 'Phê duyệt cấp rỗng',
            icon: 'pi pi-exclamation-triangle',
            accept: () => updateIsApproved(value),  // Thực hiện nếu người dùng nhấn xác nhận
            reject: () => console.log('Approval canceled')
        });
    };

    const confirmRejection = (value: number) => {
        confirmDialog({
            message: 'Bạn có chắc muốn từ chối lệnh cấp rỗng này?',
            header: 'Từ chối lệnh cấp rỗng',
            icon: 'pi pi-exclamation-triangle',
            accept: () => updateIsReject(value),  // Thực hiện nếu người dùng nhấn xác nhận
            reject: () => console.log('Rejection canceled')
        });
    };

    const isApproved = (value: number) => {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <i className="pi pi-times" style={{ cursor: 'pointer', fontSize: '20px' }} onClick={() => confirmRejection(value)} />
                <i className="pi pi-check" style={{ cursor: 'pointer', fontSize: '20px' }} onClick={() => confirmApproval(value)} />
            </div>
        );
    };


    return (
        <div>
            <Toast ref={toast} />

            <ConfirmDialog />

    <div className="grid">
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Tổng số tiền phí DET</span>
                            <div className="text-900 font-medium text-xl">{totalDetFee.toLocaleString()} VNĐ</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-blue-100 border-round"
                             style={{width: '2.5rem', height: '2.5rem'}}>
                            <i className="pi pi-shopping-cart text-blue-500 text-xl"/>
                        </div>
                    </div>

                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Tổng số tiền phí sửa chữa container</span>
                            <div className="text-900 font-medium text-xl">{totalPaidRepairCost.toLocaleString()} VNĐ
                            </div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-orange-100 border-round"
                             style={{width: '2.5rem', height: '2.5rem'}}>
                            <i className="pi pi-map-marker text-orange-500 text-xl"/>
                        </div>
                    </div>

                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Tổng chi phí giao hàng</span>
                            <div className="text-900 font-medium text-xl">{totalDelivery.toLocaleString()} VNĐ</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-cyan-100 border-round"
                             style={{width: '2.5rem', height: '2.5rem'}}>
                            <i className="pi pi-inbox text-cyan-500 text-xl"/>
                        </div>
                    </div>

                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Số lượng người dùng</span>
                            <div className="text-900 font-medium text-xl">{totalCusTomer}</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-purple-100 border-round"
                             style={{width: '2.5rem', height: '2.5rem'}}>
                            <i className="pi pi-comment text-purple-500 text-xl"/>
                        </div>
                    </div>

                </div>
            </div>

            {/*Phê duyệt lệnh cấp rỗng*/}
            <div className="col-12 xl:col-6">
                <div className="card">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <h5>Lệnh cấp container rỗng</h5>
                        <InputText
                            value={searchCustomerQuery}
                            onChange={(e) => setSearchCustomerQuery(e.target.value)}
                            placeholder="Tìm kiếm Khách hàng"
                            style={{width: '300px'}}
                        />
                    </div>
                    <DataTable value={filteredProducts} rows={5} paginator responsiveLayout="scroll">
                        <Column field="customer.username" header="Khách hàng" sortable style={{width: '35%'}}/>
                        <Column header="Thời gian" sortable style={{width: '35%'}}
                                body={(data) => formatTime(data.requestTime)}/>
                        <Column field="isApproved" header="Duyệt" sortable style={{width: '15%'}}
                                body={(data) => isApproved(data.id)}/>
                        <Column header="View" style={{width: '15%'}} body={(data) => view(data.id)}/>
                    </DataTable>
                </div>
                <div className="card">
                    {/*<h5>Lịch hôm nay</h5>*/}
                    <div className="flex justify-content-center align-items-center">
                        <Calendar/>
                    </div>
                </div>
            </div>

            <div className="col-12 xl:col-6">
                <LineChart
                    apiUrls={{
                        deliveryUrl: `https://auth.g42.biz/api/delivery-orders/total-amounts-by-month`,
                        detFeeUrl: `https://auth.g42.biz/api/drop-orders/detfee-count`,
                        repairCostUrl: `https://auth.g42.biz/api/v1/repair/repaircost-count`
                    }}
                    labels={['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']}
                    colors={{
                        deliveryColor: '#2f4860',
                        detFeeColor: '#00bb7e',
                        repairCostColor: '#ffb400'
                    }}
                />
            </div>

            <EmptyContainerDetailModal
                visible={isModalVisible}
                onHide={() => setIsModalVisible(false)}
                emptyContainer={selectedContainer}
            />
        </div>
        </div>
    );
};

export default Dashboard;
