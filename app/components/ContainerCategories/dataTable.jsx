import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import 'primeicons/primeicons.css';

import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import UpdateContainerDrawer from "./UpdateContainerDrawer";
import Delete from "./DeleteContainer";
import CreateContainerDrawer from "./CreateContainerDrawer";
import {InputText} from "primereact/inputtext";

export default function Table({ containers, fetchContainers }) {

    const PhoneBodyTemplate = (rowData) => {
        return (
            <Tag value={rowData.phoneNumber} severity="success"></Tag>
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


    const containerType_type = (rowData) => {
        return (
            <InputText type="text" value={rowData.containerTypeType === "Normal" ? "Thường" : "Đông lạnh"}readOnly
                       style={{width: '90px', height:'30px', borderRadius: '15px'}}/>

        )
    }
        const containerType_name = (rowData) => {
            return (
                <InputText type="text" value={rowData.containerTypeName} readOnly
                           style={{width: '80px',height:'30px', borderRadius: '15px'}}/>

            )

        }

        const wid = (rowData) => {

            return (
                <>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <InputText type="text" value={rowData.width} readOnly
                                   style={{ width: '55px', height: '30px', borderRadius: '15px', marginRight: '5px' }} />
                        <span style={{color: 'coral'}}>m</span>
                    </div>
                </>
            )
        }

    const leng = (rowData) => {
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <InputText type="text" value={rowData.length} readOnly
                           style={{ width: '55px', height: '30px', borderRadius: '15px', marginRight: '5px' }} />
                <span  style={{color: 'coral'}}>m</span>
            </div>
        )
    }

    const hei = (rowData) => {
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <InputText type="text" value={rowData.height} readOnly
                           style={{ width: '55px', height: '30px', borderRadius: '15px', marginRight: '5px' }} />
                <span  style={{color: 'coral'}}>m</span>
            </div>
        )
    }

    const vol = (rowData) => {
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <InputText type="text" value={rowData.volume} readOnly
                           style={{ width: '60px', height: '30px', borderRadius: '15px', marginRight: '5px' }} />
                <span style={{color: 'coral'}}>m³</span>
            </div>
        )
    }

    const wei = (rowData) => {
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <InputText type="text" value={rowData.weight} readOnly
                           style={{ width: '65px', height: '30px', borderRadius: '15px', marginRight: '5px' }} />
                <span style={{color: 'coral'}}>kg</span>
            </div>
        )
    }

    const maxLoad = (rowData) => {
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <InputText type="text" value={rowData.maxLoad} readOnly
                           style={{ width: '70px', height: '30px', borderRadius: '15px', marginRight: '5px' }} />
                <span style={{color: 'coral'}}>kg</span>
            </div>
        )
    }

    const loadCapacity = (rowData) => {
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <InputText type="text" value={rowData.loadCapacity} readOnly
                           style={{ width: '70px', height: '30px', borderRadius: '15px', marginRight: '5px' }} />
                <span style={{color: 'coral'}}>kg</span>
            </div>
        )
    }


        const linkTemplate = (rowData) => {
            return <a href={rowData.website} className="text-ellipsis">{rowData.website}</a>;
        };

        const detailServiceTemplate = (rowData) => {
            return (
                <div style={{whiteSpace: 'pre-wrap', wordWrap: 'break-word', wordBreak: 'break-word'}}>
                    {rowData.detailService}
                </div>
            );
        };



        const header = (
            <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                <span className="text-xl text-900 font-bold">Loại Containers</span>
                <CreateContainerDrawer fetchContainers={fetchContainers}/>
            </div>
        );

    // Custom header templates
    const renderHeaderWithIcon = (icon, title) => {
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <i className={`pi ${icon}`} style={{ marginRight: '5px' }}></i>
                {title}
            </div>
        );
    };

        const footer = `Có ${containers ? containers.length : 0} container.`;

        return (
            <div className="card">
                <DataTable value={containers} header={header} footer={footer} tableStyle={{ minWidth: '60rem' }}>
                    <Column field="containerTypeType" header={renderHeaderWithIcon('pi pi-box', 'Loại')} body={containerType_type}></Column>
                    <Column field="containerTypeName" header={renderHeaderWithIcon('pi pi-arrows-alt', 'Kích thước')} body={containerType_name}></Column>
                    <Column field="length" header={renderHeaderWithIcon('pi pi-arrow-right', 'Dài')} body={leng}></Column>
                    <Column field="width" header={renderHeaderWithIcon('pi pi-arrow-right', 'Rộng')} body={wid}></Column>
                    <Column field="height" header={renderHeaderWithIcon('pi pi-arrow-up', 'Cao')} body={hei}></Column>
                    <Column field="volume" header={renderHeaderWithIcon('pi pi-chart-bar', 'Thể tích')} body={vol}></Column>
                    <Column field="weight" header={renderHeaderWithIcon('pi pi-weight', 'Cân nặng')} body={wei}></Column>
                    <Column field="loadCapacity" header={renderHeaderWithIcon('pi pi-box', 'Tải trọng chứa hàng')} body={loadCapacity}></Column>
                    <Column field="maxLoad" header={renderHeaderWithIcon('pi pi-box', 'Tải trọng tối đa')} body={maxLoad}></Column>
                    <Column header="Thao tác" body={ActionButtons}></Column>
                </DataTable>
            </div>
        );
    }

