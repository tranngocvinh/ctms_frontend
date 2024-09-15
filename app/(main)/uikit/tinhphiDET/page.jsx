/* eslint react-hooks/rules-of-hooks: 0 */
"use client"
import React, {useEffect, useMemo, useState} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import axios from 'axios';
import Delete from "../../../components/phiDET/DeleleRepair";
import {isCustomer, isManager, isStaff} from "../../../verifyRole";

export default function DropOrdersTable() {
    const jwtToken = localStorage.getItem('jwtToken');
    const authToken = localStorage.getItem('authToken');
    if (!isManager(jwtToken, authToken) && !isCustomer(jwtToken, authToken) && !isStaff(jwtToken, authToken)) {
        return <p>Trang này không tồn tại</p>;
    }

    const [dropOrders, setDropOrders] = useState([]);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [paymentInfo, setPaymentInfo] = useState({});
    const [customerNames, setCustomerNames] = useState({});
    const [userRole, setUserRole] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const role = isCustomer(jwtToken, authToken) ? 'CUSTOMER' : '';
        setUserRole(role);
    }, []);

    useEffect(() => {
        fetchDropOrders();
    }, []);

    const getAuthConfig = () => ({
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
        }
    });

    const fetchDropOrders = async () => {
        try {
            const response = await axios.get(`https://auth.g42.biz/api/drop-orders`, getAuthConfig());
            const orders = response.data;
            setDropOrders(orders);

            const customerNamesMap = {};
            for (const order of orders) {
                const siResponse = await fetchSI(order.si);
                const siData = siResponse.data;

                const containerResponse = await fetchEmptyContainer(siData.emptyContainerId);
                const containerData = containerResponse.data;

                customerNamesMap[order.id] = containerData.customer ? containerData.customer.name : 'Unknown';
            }
            setCustomerNames(customerNamesMap);

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

    const actionBodyTemplate = (rowData) => (
        <div className="flex flex-wrap justify-content-center gap-1">
            {rowData.isPay === 1 ? (
                <p>Đã thanh toán</p>
            ) : (
                <>
                    {userRole === 'CUSTOMER' ? (
                        <Button label="Thanh Toán" onClick={() => handlePaymentClick(rowData)} className="p-button-success" />
                    ) : (
                        <Delete repair={rowData} fetchDropOrders={fetchDropOrders} />
                    )}
                </>
            )}
        </div>
    );

    const formatDetFee = (detFee) => detFee.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

    const formatDate = (rowData) => new Date(rowData.dropDate).toLocaleString();

    const getCustomer = (rowData) => <div>{customerNames[rowData.id] || 'Loading...'}</div>;

    const filteredDropOrders = useMemo(() => {
        if (!searchQuery) return dropOrders;

        return dropOrders.filter(order => order.id.toString().includes(searchQuery));
    }, [searchQuery, dropOrders]);

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">Thanh toán phí lưu kho (DET)</span>
            <InputText
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm theo Mã lệnh"
                style={{ width: '300px' }}
            />
        </div>
    );

    return (
        <div className="card">
            <DataTable value={filteredDropOrders} paginator rows={20} header={header}>
                <Column field="id" header="Mã lệnh" />
                <Column field="si" header="Khách hàng" body={getCustomer} />
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
