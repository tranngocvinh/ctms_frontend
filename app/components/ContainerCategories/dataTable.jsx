import React, {useMemo, useState} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {InputText} from 'primereact/inputtext';
import {Dropdown} from 'primereact/dropdown';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import UpdateContainerDrawer from "./UpdateContainerDrawer";
import Delete from "./DeleteContainer";
import CreateContainerDrawer from "./CreateContainerDrawer";
import {IconField} from "primereact/iconfield";
import {InputIcon} from "primereact/inputicon";
import {Inplace, InplaceContent, InplaceDisplay} from "primereact/inplace";
import './update_cont_form.css';

export default function Table({containers, fetchContainers, showToast}) {
    const [searchType, setSearchType] = useState('containerTypeType');
    const [searchQuery, setSearchQuery] = useState('');

    const searchTypes = [
        {label: 'Kích thước', value: 'containerTypeType'},
        {label: 'Dài', value: 'length'},
        {label: 'Rộng', value: 'width'},
        {label: 'Cao', value: 'height'},
        {label: 'Thể tích', value: 'volume'},
        {label: 'Cân nặng', value: 'weight'},
        {label: 'Tải trọng chứa hàng', value: 'loadCapacity'},
        {label: 'Tải trọng tối đa', value: 'maxLoad'},
        {label: 'Loại', value: 'containerTypeName'},
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
            <span style={spanValueStyle}>{rowData.containerType.type}</span>

        )
    ;

    const containerType_name = (rowData) => (
        <span style={spanValueStyle}>{rowData.containerType.name}</span>
    );

    const wid = (rowData) => (
        <div style={{display: 'flex', alignItems: 'left'}}>
            <span style={spanValueStyle}>
  {rowData?.width ? rowData.width.toLocaleString('vi-VN', {minimumFractionDigits: 3}) : '0'}
</span>
        </div>
    );

    const leng = (rowData) => (
        <div style={{display: 'flex', alignItems: 'center'}}>
        <span style={spanValueStyle}>
  {rowData?.length ? rowData.length.toLocaleString('vi-VN', {minimumFractionDigits: 3}) : '0'}
</span></div>
    );

    const hei = (rowData) => (
        <div style={{display: 'flex', alignItems: 'center'}}>
            <span style={spanValueStyle}>
  {rowData?.height ? rowData.height.toLocaleString('vi-VN', {minimumFractionDigits: 3}) : '0'}
</span>
        </div>
    );

    const vol = (rowData) => (
        <div style={{display: 'flex', alignItems: 'center'}}>
            <span style={spanValueStyle}>
            {rowData?.volume ? rowData.volume.toLocaleString('vi-VN', {maximumFractionDigits: 1}) : '0'}
            </span>
        </div>
    );

    const wei = (rowData) => (
        <div style={{display: 'flex', alignItems: 'center'}}>
            <span style={spanValueStyle}>
            {rowData?.weight ? rowData.weight.toLocaleString('vi-VN', {maximumFractionDigits: 2}) : '0'}
            </span>
        </div>
    );

    const maxLoad = (rowData) => (
        <div style={{display: 'flex', alignItems: 'center'}}>
            <span style={spanValueStyle}>
            {rowData?.maxLoad ? rowData.maxLoad.toLocaleString('vi-VN', {maximumFractionDigits: 2}) : '0'}
            </span>
        </div>
    );

    const loadCapacity = (rowData) => (
        <div style={{display: 'flex', alignItems: 'center'}}>
            <span style={spanValueStyle}>
            {rowData?.loadCapacity ? rowData.loadCapacity.toLocaleString('vi-VN', {maximumFractionDigits: 2}) : '0'}
            </span>
        </div>
    );

    const header = (
        <div>
            <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                <span className="text-xl text-900 font-bold">Loại Containers</span>
                <CreateContainerDrawer fetchContainers={fetchContainers} showToast={showToast}/>
            </div>
            <Inplace>
                <InplaceDisplay><i className="pi pi-exclamation-circle" style={{fontSize: '0.8rem'}}></i> <span
                    style={{fontSize: '0.8rem'}}>Đơn vị đo </span></InplaceDisplay>
                <InplaceContent>
                    <p className="m-0" style={{fontSize: '0.8rem'}}>Thể tích: m³</p>
                    <p className="m-0" style={{fontSize: '0.8rem'}}>Dài, Rộng, Cao: m</p>
                    <p className="m-0" style={{fontSize: '0.8rem'}}>Cân nặng, Tải trọng: tấn</p>
                </InplaceContent>
            </Inplace>
        </div>
    );

    const renderHeaderWithIcon = (title) => (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
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

            <DataTable value={filteredContainers} paginator rows={20} header={header} footer={footer}
                       tableStyle={{minWidth: '60rem'}} showGridlines className="custom-datatable">
                <Column field="containerTypeName"
                        header={renderHeaderWithIcon('Loại')}
                        body={containerType_name}></Column>
                <Column field="containerTypeType"
                        header={renderHeaderWithIcon('Kích thước')}
                        body={containerType_type}></Column>
                <Column field="length"
                        header={renderHeaderWithIcon("Dài")}
                        body={leng}></Column>
                <Column field="width"
                        header={renderHeaderWithIcon('Rộng')}
                        body={wid}></Column>
                <Column field="height" header={renderHeaderWithIcon('Cao')}
                        body={hei}></Column>
                <Column field="volume"
                        header={renderHeaderWithIcon('Thể tích')}
                        body={vol}></Column>
                <Column field="weight"
                        header={renderHeaderWithIcon('Cân nặng')}
                        body={wei}></Column>
                <Column field="loadCapacity"
                        header={renderHeaderWithIcon('Tải trọng chứa hàng')}
                        body={loadCapacity}></Column>
                <Column field="maxLoad"
                        header={renderHeaderWithIcon('Tải trọng tối đa')}
                        body={maxLoad}></Column>
                <Column header="Thao tác" body={ActionButtons}></Column>
            </DataTable>
        </div>
    );
}
