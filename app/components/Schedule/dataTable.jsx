import React from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';

import 'primeicons/primeicons.css';

import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';

import {InputText} from "primereact/inputtext";
import Delete from "../Ship/DeleleShip";
import UpdateScheduleDrawer from "./UpdateScheduleDrawer";
import CreateScheduleDrawer from "./CreateScheduleDrawer";


export default function Table({ schedules, fetchSchedules }) {


    const routeName = (rowData) => {
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <InputText type="text" value={rowData.routeName} readOnly
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
                           style={{ width: '150px', height: '30px', borderRadius: '15px', marginRight: '5px' }} />
            </div>
        )
    }

    const estimatedArrivalTime = (rowData) => {
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <InputText type="text" value={rowData.estimatedArrivalTime} readOnly
                           style={{ width: '200px', height: '30px', borderRadius: '15px', marginRight: '5px' }} />
            </div>
        )
    }

    const registrationNumber = (rowData) => {

        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <InputText type="text" value={rowData.registrationNumber} readOnly
                           style={{ width: '100px', height: '30px', borderRadius: '15px', marginRight: '5px' }} />
            </div>
        )
    }

    const yearBuilt = (rowData) => {
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <InputText type="text" value={rowData.yearBuilt} readOnly
                           style={{ width: '70px', height: '30px', borderRadius: '15px', marginRight: '5px' }} />
            </div>
        )
    }

    const status = (rowData) => {
        let status_name  ;
        if(rowData.status == "ACTIVE"){
            status_name = "Đang hoạt động"
        }
        if(rowData.status == "INACTIVE"){
            status_name = "Không hoạt động"
        }
        if(rowData.status == "UNDER_MAINTENANCE"){
            status_name = "Đang bảo trì"
        }

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
                <UpdateScheduleDrawer
                    schedules={rowData} fetchSchedules={fetchSchedules} label="Sửa" severity="info"
                />
                <Delete schedules={rowData} fetchSchedules={fetchSchedules}/>
            </div>
        );
    };

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">Thêm lịch trình</span>
            <CreateScheduleDrawer fetchSchedules={fetchSchedules}/>
        </div>
    );

        const footer = `Có ${schedules ? schedules.length : 0} lich.`;

        return (
            <div className="card">
                <DataTable value={schedules} header={header} footer={footer} tableStyle={{ minWidth: '60rem' }}>
                    <Column field="routeName" header={renderHeaderWithIcon('pi pi-box', 'Tên')} body={routeName}></Column>
                    <Column field="startPoint" header={renderHeaderWithIcon('pi pi-arrows-alt', 'Cảng bắt đầu')} body={startPoint}></Column>
                    <Column field="endPoint" header={renderHeaderWithIcon('pi pi-arrow-right', 'Cảng kết thúc')} body={endPoint}></Column>
                    <Column field="estimatedArrivalTime" header={renderHeaderWithIcon('pi pi-arrow-up', 'Thời gian ước tính đến')} body={estimatedArrivalTime}></Column>
                    <Column header="Thao tác" body={ActionButtons}></Column>

                </DataTable>
            </div>
        );
    }

