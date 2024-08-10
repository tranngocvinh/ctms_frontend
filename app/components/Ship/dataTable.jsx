import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';

import { InputText } from "primereact/inputtext";
import UpdateContainerDrawer from "../ContainerCategories/UpdateContainerDrawer";
import Delete from "../Ship/DeleleShip";
import UpdateShipDrawer from "./UpdateShipDrawer";
import CreateShipDrawer from "./CreateShipDrawer";

export default function Table({ ships, fetchShips }) {
    const [filters, setFilters] = useState({
        name: '',
        company: '',
        capacity: '',
        registrationNumber: '',
        yearBuilt: '',
        status: ''
    });

    const onFilterChange = (e, field) => {
        const value = e.target.value;
        setFilters({ ...filters, [field]: value });
    };

    const filteredShips = ships.filter(ship => {
        return (
            ship.name.toLowerCase().includes(filters.name.toLowerCase()) &&
            ship.company.toLowerCase().includes(filters.company.toLowerCase()) &&
            ship.capacity.toString().includes(filters.capacity) &&
            ship.registrationNumber.toString().includes(filters.registrationNumber) &&
            ship.yearBuilt.toString().includes(filters.yearBuilt) &&
            ship.status.toLowerCase().includes(filters.status.toLowerCase())
        );
    });

    const name = (rowData) => {
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <InputText type="text" value={rowData.name} readOnly
                           style={{ width: '125px', height: '30px', borderRadius: '15px', marginRight: '5px' }} />
            </div>
        );
    };

    const company = (rowData) => {
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <InputText type="text" value={rowData.company} readOnly
                           style={{ width: '150px', height: '30px', borderRadius: '15px', marginRight: '5px' }} />
            </div>
        );
    };

    const capacity = (rowData) => {
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <InputText type="text" value={rowData.capacity} readOnly
                           style={{ width: '70px', height: '30px', borderRadius: '15px', marginRight: '5px' }} />
                <span style={{ color: 'coral' }}>kg</span>
            </div>
        );
    };

    const registrationNumber = (rowData) => {
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <InputText type="text" value={rowData.registrationNumber} readOnly
                           style={{ width: '100px', height: '30px', borderRadius: '15px', marginRight: '5px' }} />
            </div>
        );
    };

    const yearBuilt = (rowData) => {
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <InputText type="text" value={rowData.yearBuilt} readOnly
                           style={{ width: '70px', height: '30px', borderRadius: '15px', marginRight: '5px' }} />
            </div>
        );
    };

    const status = (rowData) => {
        let status_name;
        if (rowData.status === "Đang hoạt động") {
            status_name = "Hoạt động";
        }
        if (rowData.status === "Đang bảo trì") {
            status_name = "Bảo trì";
        }

        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <InputText type="text" value={status_name} readOnly
                           style={{ width: '100px', height: '30px', borderRadius: '15px', marginRight: '5px' }} />
            </div>
        );
    };

    // Custom header templates
    const renderHeaderWithIcon = (icon, title, filterKey, placeholder) => {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <i className={`pi ${icon}`} style={{ marginRight: '5px' }}></i>
                    {title}
                </div>
                <InputText
                    value={filters[filterKey]}
                    onChange={(e) => onFilterChange(e, filterKey)}
                    style={{ marginTop: '5px', width: '100%' }}
                    placeholder={placeholder}
                />
            </div>
        );
    };

    const ActionButtons = (rowData) => {
        return (
            <div className="flex flex-wrap justify-content-center gap-1">
                <UpdateShipDrawer
                    ships={rowData} fetchShips={fetchShips} label="Sửa" severity="info"
                />
                <Delete ships={rowData} fetchShips={fetchShips} />
            </div>
        );
    };

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">Thêm tàu</span>
            <CreateShipDrawer fetchShips={fetchShips} />
        </div>
    );

    const footer = `Có ${filteredShips.length} tàu.`;

    return (
        <div className="card">
            <DataTable value={filteredShips} header={header} footer={footer} tableStyle={{ minWidth: '60rem' }}>
                <Column field="name" header={renderHeaderWithIcon('pi pi-box', 'Tên', 'name', 'Tìm kiếm tên')} body={name}></Column>
                <Column field="company" header={renderHeaderWithIcon('pi pi-arrows-alt', 'Công ty', 'company', 'Tìm kiếm công ty')} body={company}></Column>
                <Column field="capacity" header={renderHeaderWithIcon('pi pi-arrow-right', 'Trọng tải', 'capacity', 'Tìm kiếm trọng tải')} body={capacity}></Column>
                <Column field="registrationNumber" header={renderHeaderWithIcon('pi pi-arrow-right', 'Số đăng ký', 'registrationNumber', 'Tìm kiếm số đăng ký')} body={registrationNumber}></Column>
                <Column field="yearBuilt" header={renderHeaderWithIcon('pi pi-arrow-up', 'Năm xây dựng', 'yearBuilt', 'Tìm kiếm năm xây dựng')} body={yearBuilt}></Column>
                <Column field="status" header={renderHeaderWithIcon('pi pi-chart-bar', 'Trạng Thái', 'status', 'Tìm kiếm trạng thái')} body={status}></Column>
                <Column header="Thao tác" body={ActionButtons}></Column>
            </DataTable>
        </div>
    );
}
