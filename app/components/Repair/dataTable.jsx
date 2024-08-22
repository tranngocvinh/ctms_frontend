import React, {useEffect, useState} from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';

import { InputText } from "primereact/inputtext";
import UpdateContainerDrawer from "../ContainerCategories/UpdateContainerDrawer";
import Delete from "./DeleleRepair";
import UpdateRepairDrawer from "./UpdateRepairDrawer";
import axios from "axios";
import {getContainers} from "../../api/container_supplier";

export default function Table({ repair, fetchRepair }) {
    const [suppliers, setSuppliers] = useState([]);


    useEffect(() => {
        fetchAllSuppliers()
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
    const ActionButtons = (rowData) => {
        return (
            <div className="flex flex-wrap justify-content-center gap-1">
                {rowData.isRepair === 0  ? (

                <p>Đã sửa xong</p>

            ) : (
                <>
                    <UpdateRepairDrawer
                        repair={rowData} fetchRepair={fetchRepair} label="Sửa" severity="info"
                    />
                    <Delete repair={rowData} fetchRepair={fetchRepair} />
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
            <span className="text-xl text-900 font-bold">Danh sách các container đang sửa chữa</span>
        </div>
    );


    return (
        <div className="card">
            <DataTable value={repair} header={header}  tableStyle={{ minWidth: '60rem' }}>
                <Column field="containerCode" header={renderHeaderWithIcon('pi pi-box', 'Mã container')} body={name}></Column>
                <Column field="containerSupplierId" body={supplier} header={renderHeaderWithIcon('pi pi-arrows-alt', 'Đơn vị sửa chữa')} ></Column>
                <Column field="repairCode" header={renderHeaderWithIcon('pi pi-arrow-right', 'Giá sửa chữa')} body={repairCost} ></Column>
                <Column field="repairDate" header={renderHeaderWithIcon('pi pi-arrow-right', 'Ngày sửa chữa')} ></Column>
                <Column field="description" header={renderHeaderWithIcon('pi pi-arrow-up', 'Ghi chú')} ></Column>
                <Column header="Thao tác" body={ActionButtons}></Column>
            </DataTable>
        </div>
    );
}
