import React from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';

import 'primeicons/primeicons.css';

import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';

import {InputText} from "primereact/inputtext"
import Delete from "../Ship/DeleleShip";
import UpdateRouteDrawer from "./UpdateRouteDrawer";


export default function Table({ routes, fetchRoutes }) {


    const name = (rowData) => {
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <InputText type="text" value={rowData.name} readOnly
                           style={{ width: '125px', height: '30px', borderRadius: '15px', marginRight: '5px' }} />
            </div>
        )
    }


    const startPoint = (rowData) => {
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <InputText type="text" value={rowData.startPoint} readOnly
                           style={{ width: '150px', height: '30px', borderRadius: '15px', marginRight: '5px' }} />
            </div>
        )
    }

    const endPoint = (rowData) => {
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <InputText type="text" value={rowData.endPoint} readOnly
                           style={{ width: '70px', height: '30px', borderRadius: '15px', marginRight: '5px' }} />
                <span style={{color: 'coral'}}>kg</span>
            </div>
        )
    }

    const description = (rowData) => {
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <InputText
                    type="text"
                    value={rowData.description}
                    readOnly
                    style={{
                        flex: '1 1 auto',
                        height: '50px',
                        borderRadius: '15px',
                        marginRight: '5px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}
                />
            </div>
        )
    }

    const estimatedTime = (rowData) => {
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <InputText type="text" value={rowData.estimatedTime} readOnly
                           style={{ width: '70px', height: '30px', borderRadius: '15px', marginRight: '5px' }} />
            </div>
        )
    }

    const distance = (rowData) => {
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <InputText type="text" value={rowData.distance} readOnly
                           style={{ width: '70px', height: '30px', borderRadius: '15px', marginRight: '5px' }} />
            </div>
        )
    }

    const status = (rowData) => {
        // let status_name  ;
        // if(rowData.status == "ACTIVE"){
        //     status_name = "Đang hoạt động"
        // }
        // if(rowData.status == "INACTIVE"){
        //     status_name = "Không hoạt động"
        // }
        // if(rowData.status == "UNDER_MAINTENANCE"){
        //     status_name = "Đang bảo trì"
        // }

        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <InputText type="text" value={status_name} readOnly
                           style={{ width: '100px', height: '30px', borderRadius: '15px', marginRight: '5px' }} />
            </div>
        )
    }


    // Custom header templates
    const renderHeaderWithIcon = (icon, title) => {
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <i className={`pi ${icon}`} style={{ marginRight: '5px' }}></i>
                {title}
            </div>
        );
    };

    const ActionButtons = (rowData) => {
        return (
            <div className="flex flex-wrap justify-content-center gap-1">
                <UpdateRouteDrawer
                    routes={rowData} fetchRoutes={fetchRoutes} label="Sửa" severity="info"
                />
                <Delete routes={rowData} fetchRoutes={fetchRoutes}/>
            </div>
        );
    };


    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">Tuyến đường</span>

        </div>
    );
        const footer = `Có ${routes ? routes.length : 0} tuyến.`;

        return (
            <div className="card">
                <DataTable value={routes} header={header} footer={footer} tableStyle={{ minWidth: '60rem' }}>
                    <Column field="name" header={renderHeaderWithIcon('pi pi-box', 'Tên')} body={name}></Column>
                    <Column field="startPoint" header={renderHeaderWithIcon('pi pi-arrows-alt', 'Cảng bắt đầu')} body={startPoint}></Column>
                    <Column field="endPoint" header={renderHeaderWithIcon('pi pi-arrow-right', 'Cảng kết thúc')} body={endPoint}></Column>
                    <Column field="description" header={renderHeaderWithIcon('pi pi-arrow-right', 'Miêu tả')} body={description}></Column>
                    <Column field="estimatedTime" header={renderHeaderWithIcon('pi pi-arrow-up', 'Thời gian ước tính')} body={estimatedTime}></Column>
                    <Column field="distance" header={renderHeaderWithIcon('pi pi-chart-bar', 'Khoảng cách')} body={distance}></Column>
                    <Column field="status" header={renderHeaderWithIcon('pi pi-chart-bar', 'Trạng Thái')} ></Column>
                    <Column header="Thao tác" body={ActionButtons}></Column>

                </DataTable>
            </div>
        );
    }

