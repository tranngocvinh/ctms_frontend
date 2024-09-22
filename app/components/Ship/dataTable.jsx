import React, {useMemo, useState} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {InputText} from 'primereact/inputtext';
import {Dropdown} from 'primereact/dropdown';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import Delete from "../Ship/DeleleShip";
import UpdateShipDrawer from "./UpdateShipDrawer";
import CreateShipDrawer from "./CreateShipDrawer";
import {Chip} from "primereact/chip";
import './custom_ship.css';
import {InputIcon} from "primereact/inputicon";
import {IconField} from "primereact/iconfield";

export default function Table({ships, fetchShips, showToast}) {
    const [searchType, setSearchType] = useState('name');
    const [searchQuery, setSearchQuery] = useState('');
    const spanValueStyle = {
        width: '90px',
        textAlign: 'center'
    };
    const searchTypes = [
        {label: 'Tên', value: 'name'},
        {label: 'Công ty', value: 'company'},
        {label: 'Trọng tải', value: 'capacity'},
        {label: 'Số đăng ký', value: 'registrationNumber'},
        {label: 'Năm xây dựng', value: 'yearBuilt'},
        {label: 'Trạng thái', value: 'status'}
    ];

    const filteredShips = useMemo(() => {
        if (!searchQuery) return ships;

        return ships.filter(ship => {
            let fieldValue = ship[searchType] || '';
            return fieldValue.toString().toLowerCase().includes(searchQuery.toLowerCase());
        });
    }, [searchType, searchQuery, ships]);

    const name = (rowData) => (
        <div style={{display: 'flex', alignItems: 'center'}}>
            <span style={spanValueStyle}>{rowData.name}</span>
        </div>
    );

    const company = (rowData) => (
        <div style={{display: 'flex', alignItems: 'center'}}>
            <span style={spanValueStyle}>{rowData.company}</span>
        </div>
    );

    const capacity = (rowData) => (
        <div style={{display: 'flex', alignItems: 'center'}}>
            <span style={spanValueStyle}>{rowData.capacity}</span>
        </div>
    );

    const registrationNumber = (rowData) => (
        <div style={{display: 'flex', alignItems: 'center'}}>
            <span style={spanValueStyle}>{rowData.registrationNumber}</span>
        </div>
    );

    const yearBuilt = (rowData) => (
        <div style={{display: 'flex', alignItems: 'center'}}>
            <span style={spanValueStyle}>{rowData.yearBuilt}</span>
        </div>
    );

    const status = (rowData) => {
        let status_name;
        if (rowData.status === "Đang hoạt động") {
            status_name = "Hoạt động";
        } else if (rowData.status === "Đang bảo trì") {
            status_name = "Bảo trì";
        }

        return (
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Chip
                    label={status_name}
                    style={{fontSize: '12px'}}
                    icon={status_name === "Bảo trì" ? "pi pi-wrench" : "pi pi-truck"}
                    severity="warning"
                    className="tao-tau"
                />
            </div>
        );
    };

    const renderHeaderWithIcon = (title) => (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                {title}
            </div>
        </div>
    );

    const ActionButtons = (rowData) => (
        <div className="flex flex-wrap justify-content-center gap-1">
            <UpdateShipDrawer
                ships={rowData} fetchShips={fetchShips} showToast={showToast} label="Sửa"
            />
            <Delete ships={rowData} fetchShips={fetchShips} showToast={showToast}/>
        </div>

    );

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">Thêm tàu</span>
            <CreateShipDrawer fetchShips={fetchShips} showToast={showToast}/>
        </div>
    );

    const footer = `Có ${filteredShips.length} tàu.`;

    return (
        <div className="card">
            <div className="p-d-flex p-ai-center p-jc-between p-mb-2">
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Dropdown
                        value={searchType}
                        options={searchTypes}
                        onChange={(e) => setSearchType(e.value)}
                        optionLabel="label"
                        placeholder="Chọn loại tìm kiếm"
                        style={{width: '200px', marginRight: '10px'}}
                    />
                    <IconField iconPosition="right">
                        <InputIcon className="pi pi-search"> </InputIcon>
                        <InputText
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Tìm kiếm"
                            style={{width: '300px'}}
                        />
                    </IconField>
                </div>
            </div>

            <DataTable value={filteredShips} header={header} footer={footer} tableStyle={{minWidth: '60rem'}} paginator
                       rows={20} showGridlines className="custom-datatable">
                <Column field="name" header={renderHeaderWithIcon('Tên')} body={name}></Column>
                <Column field="company" header={renderHeaderWithIcon('Công ty')} body={company}></Column>
                <Column field="capacity" header={renderHeaderWithIcon('Trọng tải')} body={capacity}></Column>
                <Column field="registrationNumber" header={renderHeaderWithIcon('Số đăng ký')}
                        body={registrationNumber}></Column>
                <Column field="yearBuilt" header={renderHeaderWithIcon('Năm')} body={yearBuilt}></Column>
                <Column field="status" header={renderHeaderWithIcon('Trạng Thái')} body={status}></Column>
                <Column header="Thao tác" body={ActionButtons}></Column>
            </DataTable>
        </div>
    );
}
