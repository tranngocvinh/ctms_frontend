import React, { useState, useMemo } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import UpdateContainerDrawer from "./UpdateContainerDrawer";
import Delete from "./DeleteContainer";
import CreateContainerDrawer from "./CreateContainerDrawer";

export default function Table({ containers, fetchContainers, showToast }) {
    const [searchType, setSearchType] = useState('containerTypeType');
    const [searchQuery, setSearchQuery] = useState('');

    const searchTypes = [
        { label: 'Loại', value: 'containerTypeType' },
        { label: 'Kích thước', value: 'containerTypeName' },
        { label: 'Dài', value: 'length' },
        { label: 'Rộng', value: 'width' },
        { label: 'Cao', value: 'height' },
        { label: 'Thể tích', value: 'volume' },
        { label: 'Cân nặng', value: 'weight' },
        { label: 'Tải trọng chứa hàng', value: 'loadCapacity' },
        { label: 'Tải trọng tối đa', value: 'maxLoad' }
    ];

    const filteredContainers = useMemo(() => {
        if (!searchQuery) return containers;

        return containers.filter(container => {
            let fieldValue = '';
            if (searchType === 'containerTypeType') {
                fieldValue = container.containerType?.type || '';
            } else if (searchType === 'containerTypeName') {
                fieldValue = container.containerType?.name || '';
            } else {
                fieldValue = container[searchType] || '';
            }
            return fieldValue.toString().toLowerCase().includes(searchQuery.toLowerCase());
        });
    }, [searchType, searchQuery, containers]);
    const spanValueStyle = {
        width: '90px',
        height: '30px',
        textAlign: 'center'
    };
    const containerType_type = (rowData) => (
        <span style={spanValueStyle}>{rowData.containerType.type === "Normal" ? "Thường" : "Đông lạnh"}</span>
    );

    const containerType_name = (rowData) => (
        <span style={spanValueStyle}>{rowData.containerType.name}</span>
    );

    const wid = (rowData) => (
        <div style={{display: 'flex', alignItems: 'left'}}>
            <span style={spanValueStyle}>{rowData.width}</span>
            <span style={{color: 'coral'}}>m</span>
        </div>
);

const leng = (rowData) => (
    <div style={{display: 'flex', alignItems: 'center'}}>
        <span style={spanValueStyle}>{rowData.length}</span><span style={{color: 'coral'}}>m</span>
    </div>
);

    const hei = (rowData) => (
        <div style={{display: 'flex', alignItems: 'center'}}>
            <span style={spanValueStyle}>{rowData.height}</span>
            <span style={{color: 'coral'}}>m</span>
        </div>
    );

    const vol = (rowData) => (
        <div style={{display: 'flex', alignItems: 'center'}}>
            <span style={spanValueStyle}>{rowData.volume}</span><span style={{color: 'coral'}}>m³</span>
        </div>
    );

    const wei = (rowData) => (
        <div style={{display: 'flex', alignItems: 'center'}}>
            <span style={spanValueStyle}>{rowData.weight}</span><span style={{color: 'coral'}}>kg</span>
        </div>
    );

    const maxLoad = (rowData) => (
        <div style={{display: 'flex', alignItems: 'center'}}>
            <span style={spanValueStyle}>{rowData.maxLoad}</span>
            <span style={{color: 'coral'}}>kg</span>
        </div>
    );

    const loadCapacity = (rowData) => (
        <div style={{display: 'flex', alignItems: 'center'}}>
            <span style={spanValueStyle}>{rowData.loadCapacity}</span>
            <span style={{color: 'coral'}}>kg</span>
        </div>
    );

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">Loại Containers</span>
            <CreateContainerDrawer fetchContainers={fetchContainers} showToast={showToast} />
        </div>
    );

    const renderHeaderWithIcon = (icon, title, filterKey, placeholder) => (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <i className={`pi ${icon}`} style={{ marginRight: '5px' }}></i>
                {title}
            </div>
        </div>
    );

    const ActionButtons = (rowData) => (
        <div className="flex flex-wrap justify-content-center gap-1">
            <UpdateContainerDrawer
                container={rowData} fetchContainers={fetchContainers} showToast={showToast} label="Sửa" severity="info"
            />
            <Delete container={rowData} fetchContainers={fetchContainers} showToast={showToast}/>
        </div>
    );

    const footer = `Có ${filteredContainers.length} loại container.`;

    return (
        <div className="card">
            <div className="p-d-flex p-ai-center p-jc-between p-mb-2">
                <Dropdown
                    value={searchType}
                    options={searchTypes}
                    onChange={(e) => setSearchType(e.value)}
                    optionLabel="label"
                    placeholder="Chọn loại tìm kiếm"
                    style={{ width: '200px', marginRight: '10px' }}
                />
                <InputText
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm kiếm"
                    style={{ width: '300px' }}
                />
            </div>
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
