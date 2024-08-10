import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { InputText } from 'primereact/inputtext';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import UpdateContainerDrawer from "./UpdateContainerDrawer";
import Delete from "./DeleteContainer";
import CreateContainerDrawer from "./CreateContainerDrawer";

export default function Table({ containers, fetchContainers }) {
    const [filters, setFilters] = useState({
        containerTypeType: '',
        containerTypeName: '',
        length: '',
        width: '',
        height: '',
        volume: '',
        weight: '',
        loadCapacity: '',
        maxLoad: ''
    });

    const onFilterChange = (e, field) => {
        const value = e.target.value;
        setFilters({ ...filters, [field]: value });
    };

    const filteredContainers = containers.filter(container => {
        return (
            container.containerType.type.toLowerCase().includes(filters.containerTypeType.toLowerCase()) &&
            container.containerType.name.toLowerCase().includes(filters.containerTypeName.toLowerCase()) &&
            container.length.toString().includes(filters.length) &&
            container.width.toString().includes(filters.width) &&
            container.height.toString().includes(filters.height) &&
            container.volume.toString().includes(filters.volume) &&
            container.weight.toString().includes(filters.weight) &&
            container.loadCapacity.toString().includes(filters.loadCapacity) &&
            container.maxLoad.toString().includes(filters.maxLoad)
        );
    });

    const containerType_type = (rowData) => {
        return (
            <InputText type="text" value={rowData.containerType.type === "Normal" ? "Thường" : "Đông lạnh"} readOnly
                       style={{ width: '90px', height: '30px', borderRadius: '15px' }} />
        );
    };

    const containerType_name = (rowData) => {
        return (
            <InputText type="text" value={rowData.containerType.name} readOnly
                       style={{ width: '80px', height: '30px', borderRadius: '15px' }} />
        );
    };

    const wid = (rowData) => {
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <InputText type="text" value={rowData.width} readOnly
                           style={{ width: '55px', height: '30px', borderRadius: '15px', marginRight: '5px' }} />
                <span style={{ color: 'coral' }}>m</span>
            </div>
        );
    };

    const leng = (rowData) => {
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <InputText type="text" value={rowData.length} readOnly
                           style={{ width: '55px', height: '30px', borderRadius: '15px', marginRight: '5px' }} />
                <span style={{ color: 'coral' }}>m</span>
            </div>
        );
    };

    const hei = (rowData) => {
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <InputText type="text" value={rowData.height} readOnly
                           style={{ width: '55px', height: '30px', borderRadius: '15px', marginRight: '5px' }} />
                <span style={{ color: 'coral' }}>m</span>
            </div>
        );
    };

    const vol = (rowData) => {
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <InputText type="text" value={rowData.volume} readOnly
                           style={{ width: '60px', height: '30px', borderRadius: '15px', marginRight: '5px' }} />
                <span style={{ color: 'coral' }}>m³</span>
            </div>
        );
    };

    const wei = (rowData) => {
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <InputText type="text" value={rowData.weight} readOnly
                           style={{ width: '65px', height: '30px', borderRadius: '15px', marginRight: '5px' }} />
                <span style={{ color: 'coral' }}>kg</span>
            </div>
        );
    };

    const maxLoad = (rowData) => {
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <InputText type="text" value={rowData.maxLoad} readOnly
                           style={{ width: '70px', height: '30px', borderRadius: '15px', marginRight: '5px' }} />
                <span style={{ color: 'coral' }}>kg</span>
            </div>
        );
    };

    const loadCapacity = (rowData) => {
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <InputText type="text" value={rowData.loadCapacity} readOnly
                           style={{ width: '70px', height: '30px', borderRadius: '15px', marginRight: '5px' }} />
                <span style={{ color: 'coral' }}>kg</span>
            </div>
        );
    };

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">Loại Containers</span>
            <CreateContainerDrawer fetchContainers={fetchContainers} />
        </div>
    );

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
                <UpdateContainerDrawer
                    container={rowData} fetchContainers={fetchContainers} label="Sửa" severity="info"
                />
                <Delete container={rowData} fetchContainers={fetchContainers}/>
            </div>
        );
    };

    const footer = `Có ${filteredContainers.length} loại container.`;

    return (
        <div className="card">
            <DataTable value={filteredContainers} header={header} footer={footer} tableStyle={{ minWidth: '60rem' }}>
                <Column field="containerTypeType" header={renderHeaderWithIcon('pi pi-box', 'Loại', 'containerTypeType', 'Tìm kiếm')} body={containerType_type}></Column>
                <Column field="containerTypeName" header={renderHeaderWithIcon('pi pi-arrows-alt', 'Kích thước', 'containerTypeName', 'Tìm kiếm')} body={containerType_name}></Column>
                <Column field="length" header={renderHeaderWithIcon('pi pi-arrow-right', 'Dài', 'length', 'Tìm kiếm')} body={leng}></Column>
                <Column field="width" header={renderHeaderWithIcon('pi pi-arrow-right', 'Rộng', 'width', 'Tìm kiếm')} body={wid}></Column>
                <Column field="height" header={renderHeaderWithIcon('pi pi-arrow-up', 'Cao', 'height', 'Tìm kiếm')} body={hei}></Column>
                <Column field="volume" header={renderHeaderWithIcon('pi pi-chart-bar', 'Thể tích', 'volume', 'Tìm kiếm')} body={vol}></Column>
                <Column field="weight" header={renderHeaderWithIcon('pi pi-weight', 'Cân nặng', 'weight', 'Tìm kiếm')} body={wei}></Column>
                <Column field="loadCapacity" header={renderHeaderWithIcon('pi pi-box', 'Tải trọng chứa hàng', 'loadCapacity', 'Tìm kiếm')} body={loadCapacity}></Column>
                <Column field="maxLoad" header={renderHeaderWithIcon('pi pi-box', 'Tải trọng tối đa', 'maxLoad', 'Tìm kiếm')} body={maxLoad}></Column>
                <Column header="Thao tác" body={ActionButtons}></Column>
            </DataTable>
        </div>
    );
}
