import React, {useEffect, useMemo, useState} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from 'primereact/button';

import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import Delete from "app/components/Delivery/DeleleRepair";
import {Dialog} from "primereact/dialog";
import {isCustomer, isManager, isStaff} from "../../verifyRole";
import {InputText} from "primereact/inputtext";

export default function Table({delivery, fetchDelivery}) {
    const [suppliers, setSuppliers] = useState([]);
    const [userRole, setUserRole] = useState();
    const [paymentInfo, setPaymentInfo] = useState({}); // State to hold payment info
    const [dialogVisible, setDialogVisible] = useState(false);
    const jwtToken = localStorage.getItem('jwtToken');
    const authToken = localStorage.getItem('authToken');
    const [searchQuery, setSearchQuery] = useState('');
    useEffect(() => {
        let role = '';
        if (isManager(jwtToken, authToken)) {
            role = 'MANAGER';
        } else if (isCustomer(jwtToken, authToken)) {
            role = 'CUSTOMER';
        } else if (isStaff(jwtToken, authToken)) {
            role = 'STAFF';
        }
        setUserRole(role);
    }, [jwtToken, authToken])

    const renderHeaderWithIcon = (icon, title) => {
        return (
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <i className={`pi ${icon}`} style={{marginRight: '5px'}}></i>
                    {title}
                </div>

            </div>
        );
    };
    const handlePaymentClick = (rowData) => {
        const paymentInfo = {
            accountNumber: "123456789",
            accountName: "Cong TY VIMC",
            bankName: "Vietcombank",
            totalAmount: rowData.totalAmount,
            description: `Thanh toán phí giao hàng số #${rowData.id} ngày ${rowData.orderDate}`
        };
        setPaymentInfo(paymentInfo);
        setDialogVisible(true);
    };

    const ActionButtons = (rowData) => {
        return (
            <div className="flex flex-wrap justify-content-center gap-1">
                {rowData.isPay === 1 ? (
                    <p>Đã Thanh toán</p>
                ) : (
                    <>
                        {isCustomer(jwtToken, authToken) ? (
                            <Button label="Thanh Toán" onClick={() => handlePaymentClick(rowData)}
                                    className="p-button-success"/>
                        ) : (
                            <Delete delivery={rowData} fetchDelivery={fetchDelivery}/>
                        )
                        }
                    </>
                )}
            </div>
        );
    };

    const totalAmount = (rowData) => {
        return <p>{rowData.totalAmount.toLocaleString('en-US')} VNĐ</p>
    }

    const orderToDate = (rowData) => {
        return new Date(rowData.orderDate).toLocaleString()

    }

    const deliveryToDate = (rowData) => {
        return new Date(rowData.deliveryDate).toLocaleString()
    }
    const filteredDeliveries = useMemo(() => {
        if (!searchQuery) return delivery;

        return delivery.filter(item => item.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [searchQuery, delivery]);
    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">Danh sách phí giao hàng</span>
            <InputText
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm Mã đơn hàng"
                style={{ width: '300px' }}
            />
        </div>
    );

    return (
        <div className="card">
            <DataTable value={filteredDeliveries} header={header} tableStyle={{minWidth: '60rem'}}>
                <Column field="orderNumber" header={renderHeaderWithIcon('pi pi-box', 'Mã đơn hàng')}></Column>
                <Column field="orderDate" body={orderToDate}
                        header={renderHeaderWithIcon('pi pi-arrows-alt', 'Ngày đặt lệnh ')}></Column>
                <Column field="deliveryDate" body={deliveryToDate}
                        header={renderHeaderWithIcon('pi pi-arrow-right', 'Ngày giao hàng dự kiến')}></Column>
                <Column field="totalAmount" body={totalAmount}
                        header={renderHeaderWithIcon('pi pi-arrow-right', 'Giá tiền')}></Column>
                <Column body={ActionButtons}></Column>
            </DataTable>

            <Dialog
                header="Thông tin Thanh Toán"
                visible={dialogVisible}
                style={{width: '50vw', height: '50vh'}}
                modal
                onHide={() => setDialogVisible(false)}
                footer={
                    <div>
                        <Button label="Close" icon="pi pi-times" onClick={() => setDialogVisible(false)}
                                className="p-button-text"/>
                    </div>
                }
            >
                <div>
                    <p><strong>Số tài khoản:</strong> {paymentInfo.accountNumber || 'N/A'}</p>
                    <p><strong>Tên tài khoản:</strong> {paymentInfo.accountName || 'N/A'}</p>
                    <p><strong>Ngân hàng:</strong> {paymentInfo.bankName || 'N/A'}</p>
                    <p><strong>Số
                        tiền:</strong> {paymentInfo.totalAmount ? paymentInfo.totalAmount.toLocaleString() + ' VNĐ' : 'N/A'}
                    </p>
                    <p><strong>Mô tả:</strong> {paymentInfo.description || 'N/A'}</p>
                </div>
            </Dialog>
        </div>
    );
}
