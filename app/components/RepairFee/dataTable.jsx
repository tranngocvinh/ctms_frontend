import React, {useEffect, useState} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from 'primereact/button';

import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import Delete from "/app/components/RepairFee/DeleleRepair";
import {getContainers} from "../../api/container_supplier";
import {Dialog} from "primereact/dialog";
import {handlePayment} from "../../api/repair";
import './repair.css';

export default function Table({ repair, fetchRepair }) {
    const [suppliers, setSuppliers] = useState([]);
    const [paymentInfo, setPaymentInfo] = useState({}); // State to hold payment info
    const [dialogVisible, setDialogVisible] = useState(false);
    const [userRole,setUserRole] = useState() ;

    useEffect(() => {
        const userRole = localStorage.getItem('userRole');
        setUserRole(userRole)
        fetchAllSuppliers()
    },[])



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

    const fetchAllSuppliers = async () => {
        try {
           getContainers().then(res =>{
               setSuppliers(res.data)
           }).catch(err =>{
               console.log(err)
           })
        } catch (error) {
            console.error('Error fetching cargo types:', error);
        }
    };

    const supplier = (rowData) => {
        const supplierName = suppliers.find(p => p.supplierId === rowData.containerSupplierId)
        return supplierName ? supplierName.name : null
    }
    const handlePaymentClick = (rowData) => {
        const paymentInfo = {
            accountNumber: "0326260456",
            accountName: "TRAN NGOC VINH",
            bankName: "Vietcombank",
            detFee: rowData.detFee,
            description: `Thanh toán phí sửa chữa container số #${rowData.id} ngày ${rowData.repairDate}`
        };
        setPaymentInfo(paymentInfo);
        setDialogVisible(true);
    };

    const handlePaymentSuccess = (rowData) => {
        handlePayment(rowData.id).then(r => {

        })
    }
    const ActionButtons = (rowData) => {
        return (
            <div className="flex flex-wrap justify-content-center gap-1">
                {rowData.isPayment === 1  ? (
                <p>Đã thanh toán</p>

            ) : (
                <>
                    {userRole === 'CUSTOMER' ? (
                        <i className="pi pi-money-bill" onClick={() => handlePaymentClick(rowData)} style={{fontSize: '1rem', marginRight: '10px', marginLeft: '10px', color:'green'}}/>
                    ) : (

                        <Delete repair={rowData} fetchRepair={fetchRepair} />
                        )
                    }
                </>
        )}
            </div>
        );
    };


    const repairCost = (rowData) => {
        return <p>{rowData.repairCode.toLocaleString('en-US')}</p>
    }
    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">Thanh toán phí sửa chữa container</span>
        </div>
    );




    return (
        <div className="card">
            <DataTable value={repair} header={header}  tableStyle={{ minWidth: '60rem' }} showGridlines className="custom-datatable">
                <Column field="containerCode" header={renderHeaderWithIcon('', 'Mã container')} body={name}></Column>
                <Column field="containerSupplierId" body={supplier} header={renderHeaderWithIcon('', 'Đơn vị sửa chữa')} ></Column>
                <Column field="repairCode" header={renderHeaderWithIcon('', 'Giá sửa chữa')} body={repairCost} ></Column>
                <Column field="repairDate" header={renderHeaderWithIcon('', 'Ngày sửa chữa')} ></Column>
                <Column field="description" header={renderHeaderWithIcon('', 'Ghi chú')} ></Column>
                <Column header="Thao tác" body={ActionButtons}></Column>
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
                    <p><strong>Số tiền:</strong> {paymentInfo.detFee ? paymentInfo.detFee.toLocaleString() + ' VNĐ' : 'N/A'}</p>
                    <p><strong>Mô tả:</strong> {paymentInfo.description || 'N/A'}</p>
                </div>
            </Dialog>
        </div>
    );
}
