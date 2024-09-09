/* eslint react-hooks/rules-of-hooks: 0 */
"use client"
import React, {useEffect, useState} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import axios from 'axios';
import Delete from "../../../components/phiDET/DeleleRepair";
import {isCustomer, isManager, isStaff} from "../../../verifyRole";

export default function DropOrdersTable() {
    const jwtToken = localStorage.getItem('jwtToken');
    const authToken = localStorage.getItem('authToken');
    if(!isManager(jwtToken, authToken) && !isCustomer(jwtToken, authToken) && !isStaff(jwtToken, authToken)){
        return <p>Trang này không tồn tại</p>;
    }
    const [dropOrders, setDropOrders] = useState([]);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [paymentInfo, setPaymentInfo] = useState({});
    const [customerNames, setCustomerNames] = useState({});
    const [userRole,setUserRole] = useState() ;


    useEffect(() => {
        const userRole = isCustomer(jwtToken, authToken) ? 'CUSTOMER' : '';
        setUserRole(userRole)
    },[])
    useEffect(() => {
        fetchDropOrders();
    }, []);
    const getAuthConfig = () => ({
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
        }
    })
    const fetchDropOrders = async () => {
        try {
            const response = await axios.get(`https://auth.g42.biz/api/drop-orders`,getAuthConfig());
            const orders = response.data;
            setDropOrders(orders);

            // Fetch customer names for each order
            const customerNames = {};
            for (const order of orders) {
                const siResponse = await fetchSI(order.si);
                const siData = siResponse.data;

                const containerResponse = await fetchEmptyContainer(siData.emptyContainerId);
                const containerData = containerResponse.data;

                if (containerData.customer) {
                    customerNames[order.id] = containerData.customer.name;
                } else {
                    customerNames[order.id] = 'Unknown';
                }
            }
            setCustomerNames(customerNames);

        } catch (error) {
            console.error('Error fetching drop orders:', error);
        }
    };

    const fetchSI = async (id) => {
        try {
            return await axios.get(`https://auth.g42.biz/api/si/${id}`);
        } catch (error) {
            console.error('Error fetching SI:', error);
        }
    };

    const fetchEmptyContainer = async (id) => {
        try {
            return await axios.get(`https://auth.g42.biz/api/containers/allocate/ship/${id}`);
        } catch (error) {
            console.error('Error fetching empty container:', error);
        }
    };

    const handlePaymentClick = (rowData) => {
        // Populate payment info with relevant data
        const paymentInfo = {
            accountNumber: "0326260456",
            accountName: "TRAN NGOC VINH",
            bankName: "Vietcombank",
            detFee: rowData.detFee,
            description: `Thanh toán phí lưu kho cho lệnh hạ hàng số #${rowData.id}`
        };
        setPaymentInfo(paymentInfo);
        setDialogVisible(true);
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="flex flex-wrap justify-content-center gap-1">
                {rowData.isPay === 1  ? (

                    <p>Đã thanh toán</p>

                ) : (
                    <>
                        {userRole === 'CUSTOMER' ? (
                            <Button label="Thanh Toán" onClick={() => handlePaymentClick(rowData)} className="p-button-success" />
                        ) : (

                            <Delete repair={rowData} fetchDropOrders={fetchDropOrders()} />
                        )
                        }
                    </>
                )}
            </div>

        );
    };

    const formatDetFee = (detFee) => {
        return detFee.toLocaleString('en-US', { style: 'currency', currency: 'VND' });
    };

    const formatDate = (rowData) => {
        return new Date(rowData.dropDate).toLocaleString();
    };

    const getCustomer = (rowData) => {
        return <div>{customerNames[rowData.id] || 'Loading...'}</div>;
    }

    return (
        <div className="card">
            <h2>Thanh toán phí lưu kho (DET)</h2>
            <DataTable value={dropOrders} paginator rows={10} responsiveLayout="scroll">
                <Column field="id" header="ID" />
                <Column field="si" header="Khách hàng" body={getCustomer}/>
                <Column field="dropDate" header="Ngày Hạ Hàng" body={formatDate} />
                <Column field="dropLocation" header="Địa Điểm Hạ Hàng" />
                <Column field="detFee" header="Phí DET" body={(rowData) => formatDetFee(rowData.detFee)} />
                <Column body={actionBodyTemplate} header="Thanh Toán" />
            </DataTable>

            <Dialog
                header="Thông tin Thanh Toán"
                visible={dialogVisible}
                style={{ width: '50vw', height: '50vh' }}
                modal
                onHide={() => setDialogVisible(false)}
                footer={
                    <div>
                        <Button label="Close" icon="pi pi-times" onClick={() => setDialogVisible(false)} className="p-button-text" />
                    </div>
                }
            >
                <div>
                    <p><strong>Số tài khoản:</strong> {paymentInfo.accountNumber || 'N/A'}</p>
                    <p><strong>Tên tài khoản:</strong> {paymentInfo.accountName || 'N/A'}</p>
                    <p><strong>Ngân hàng:</strong> {paymentInfo.bankName || 'N/A'}</p>
                    <p><strong>Số tiền:</strong> {paymentInfo.detFee ? formatDetFee(paymentInfo.detFee) : 'N/A'}</p>
                    <p><strong>Mô tả:</strong> {paymentInfo.description || 'N/A'}</p>
                </div>
            </Dialog>

        </div>
    );
}
