import React, {useMemo, useEffect, useState} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Dropdown} from 'primereact/dropdown';
import {InputText} from 'primereact/inputtext';

import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import Delete from './DeleleRepair';
import UpdateRepairDrawer from './UpdateRepairDrawer';
import {getContainers} from '../../api/container_supplier';
import {isStaff} from "../../verifyRole";

export default function Table({repair, fetchRepair}) {
    const [suppliers, setSuppliers] = useState([]);
    const [searchType, setSearchType] = useState('containerCode');
    const [searchQuery, setSearchQuery] = useState('');

    const searchTypes = [
        {label: 'Mã container', value: 'containerCode'},
        {label: 'Đơn vị sửa chữa', value: 'containerSupplierId'},
        {label: 'Giá sửa chữa', value: 'repairCode'},
        {label: 'Ngày sửa chữa', value: 'repairDate'},
    ];

    useEffect(() => {
        fetchAllSuppliers();
    }, []);

    const fetchAllSuppliers = async () => {
        try {
            getContainers()
                .then((res) => setSuppliers(res.data))
                .catch((err) => console.log(err));
        } catch (error) {
            console.error('Error fetching cargo types:', error);
        }
    };

    const supplier = (rowData) => {
        const supplierName = suppliers.find((p) => p.supplierId === rowData.containerSupplierId);
        return supplierName ? supplierName.name : null;
    };

    const filteredRepair = useMemo(() => {
        if (!searchQuery) return repair;
        return repair.filter((item) => {
            let fieldValue;
            if (searchType === 'containerSupplierId') {
                const supplierData = suppliers.find(s => s.supplierId === item.containerSupplierId);
                fieldValue = supplierData ? supplierData.name : '';
            } else {
                fieldValue = item[searchType] || '';
            }
            return fieldValue.toString().toLowerCase().includes(searchQuery.toLowerCase());
        });
    }, [searchType, searchQuery, repair, suppliers]);

    const ActionButtons = (rowData) => {
        let content;
        const jwtToken = localStorage.getItem('jwtToken');
        const authToken = localStorage.getItem('authToken');

        if (rowData.isRepair === 0) {
            content = <p>Đã sửa xong</p>;
        } else {
            if (isStaff(jwtToken, authToken)) {
                content = (
                    <>
                        <UpdateRepairDrawer repair={rowData} fetchRepair={fetchRepair} label="Sửa" severity="info"/>
                        <Delete repair={rowData} fetchRepair={fetchRepair}/>
                    </>
                );
            } else {
                content = <p>Đang sửa</p>;
            }
        }

        return (
            <div className="flex flex-wrap justify-content-center gap-1">
                {content}
            </div>
        );
    };

    const repairCost = (rowData) => {
        const repairCodeNumber = Number(rowData.repairCode);
        return <p>{!isNaN(repairCodeNumber) ? repairCodeNumber.toLocaleString('vi-VN') : rowData.repairCode}</p>;
    };

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">Danh sách các container đang sửa chữa</span>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Dropdown
                    value={searchType}
                    options={searchTypes}
                    onChange={(e) => setSearchType(e.value)}
                    optionLabel="label"
                    placeholder="Chọn loại tìm kiếm"
                    style={{width: '200px', marginRight: '10px'}}
                />
                <InputText
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm kiếm"
                    style={{width: '300px'}}
                />
            </div>
        </div>
    );

    return (
        <div className="card">
            <DataTable value={filteredRepair} header={header} tableStyle={{minWidth: '60rem'}} showGridlines>
                <Column field="containerCode" header="Mã container"></Column>
                <Column field="containerSupplierId" body={supplier} header="Đơn vị sửa chữa"></Column>
                <Column field="repairCode" header="Giá sửa chữa" body={repairCost}></Column>
                <Column field="repairDate" header="Ngày sửa chữa"></Column>
                <Column field="description" header="Ghi chú"></Column>
                <Column header="Thao tác" body={ActionButtons}></Column>
            </DataTable>
        </div>
    );
}
