import React, {useEffect, useState} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from 'primereact/button';

import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import Delete from "app/components/Delivery/DeleleRepair";
import {Dialog} from "primereact/dialog";

export default function Table({ delivery, fetchDelivery }) {
    const [suppliers, setSuppliers] = useState([]);
    const [userRole,setUserRole] = useState() ;
    const [paymentInfo, setPaymentInfo] = useState({}); // State to hold payment info
    const [dialogVisible, setDialogVisible] = useState(false);

    useEffect(() => {
        const userRole = localStorage.getItem('userRole');
        setUserRole(userRole)
    },[])






    // const name = (rowData) => {
    //     return (
    //         <div style={{ display: 'flex', alignItems: 'center' }}>
    //             <InputText type="text" value={rowData.name} readOnly
    //                        style={{ width: '125px', height: '30px', borderRadius: '15px', marginRight: '5px' }} />
    //         </div>
    //     );
    // };
    //
    // const company = (rowData) => {
    //     return (
    //         <div style={{ display: 'flex', alignItems: 'center' }}>
    //             <InputText type="text" value={rowData.company} readOnly
    //                        style={{ width: '150px', height: '30px', borderRadius: '15px', marginRight: '5px' }} />
    //         </div>
    //     );
    // };
    //
    // const capacity = (rowData) => {
    //     return (
    //         <div style={{ display: 'flex', alignItems: 'center' }}>
    //             <InputText type="text" value={rowData.capacity} readOnly
    //                        style={{ width: '70px', height: '30px', borderRadius: '15px', marginRight: '5px' }} />
    //             <span style={{ color: 'coral' }}>kg</span>
    //         </div>
    //     );
    // };
    //
    // const registrationNumber = (rowData) => {
    //     return (
    //         <div style={{ display: 'flex', alignItems: 'center' }}>
    //             <InputText type="text" value={rowData.registrationNumber} readOnly
    //                        style={{ width: '100px', height: '30px', borderRadius: '15px', marginRight: '5px' }} />
    //         </div>
    //     );
    // };
    //
    // const yearBuilt = (rowData) => {
    //     return (
    //         <div style={{ display: 'flex', alignItems: 'center' }}>
    //             <InputText type="text" value={rowData.yearBuilt} readOnly
    //                        style={{ width: '70px', height: '30px', borderRadius: '15px', marginRight: '5px' }} />
    //         </div>
    //     );
    // };
    //
    // const status = (rowData) => {
    //     let status_name;
    //     if (rowData.status === "Đang hoạt động") {
    //         status_name = "Hoạt động";
    //     }
    //     if (rowData.status === "Đang bảo trì") {
    //         status_name = "Bảo trì";
    //     }
    //
    //     return (
    //         <div style={{ display: 'flex', alignItems: 'center' }}>
    //             <InputText type="text" value={status_name} readOnly
    //                        style={{ width: '100px', height: '30px', borderRadius: '15px', marginRight: '5px' }} />
    //         </div>
    //     );
    // };
    //
    // // Custom header templates
    const renderHeaderWithIcon = (icon, title ) => {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <i className={`pi ${icon}`} style={{ marginRight: '5px' }}></i>
                    {title}
                </div>

            </div>
        );
    };
    const handlePaymentClick = (rowData) => {
        // Populate payment info with relevant data
        const paymentInfo = {
            accountNumber: "0326260456",
            accountName: "TRAN NGOC VINH",
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
                {rowData.isPay === 1  ? (

                <p>Đã Thanh toán</p>

            ) : (
                <>

                    {userRole === 'CUSTOMER' ? (
                        <Button label="Thanh Toán" onClick={() => handlePaymentClick(rowData)} className="p-button-success" />
                    ) : (

                        <Delete delivery={rowData} fetchDelivery={fetchDelivery} />
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
    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">Danh sách phí giao hàng</span>
        </div>
    );


    return (
        <div className="card">
            <DataTable value={delivery} header={header}  tableStyle={{ minWidth: '60rem' }}>
                <Column field="orderNumber" header={renderHeaderWithIcon('pi pi-box', 'Mã đơn hàng')} ></Column>
                <Column field="orderDate" body={orderToDate} header={renderHeaderWithIcon('pi pi-arrows-alt', 'Ngày đặt lệnh ')} ></Column>
                <Column field="deliveryDate" body={deliveryToDate}  header={renderHeaderWithIcon('pi pi-arrow-right', 'Ngày giao hàng dự kiến')}  ></Column>
                <Column field="totalAmount" body={totalAmount} header={renderHeaderWithIcon('pi pi-arrow-right', 'Giá tiền')} ></Column>
                <Column body={ActionButtons}></Column>
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
                    <p><strong>Số tiền:</strong> {paymentInfo.totalAmount ? paymentInfo.totalAmount.toLocaleString() +' VNĐ' : 'N/A'}</p>
                    <p><strong>Mô tả:</strong> {paymentInfo.description || 'N/A'}</p>
                </div>
            </Dialog>
        </div>
    );
}
