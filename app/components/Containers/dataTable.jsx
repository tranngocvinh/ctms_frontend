import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import axios from 'axios';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import UpdateContainerDrawer from "./UpdateContainerDrawer";
import Delete from "./DeleteContainer";
import CreateContainerDrawer from "./CreateContainerDrawer";
import ScheduleDetailsModal from "./ScheduleDetailsModal ";

export default function Table({ containers, fetchContainers }) {
    const [scheduleDetails, setScheduleDetails] = useState(null);
    const [detailsVisible, setDetailsVisible] = useState(false);

    const fetchScheduleDetails = async (scheduleId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/schedules/${scheduleId}`);
            setScheduleDetails(response.data);
            setDetailsVisible(true);
        } catch (error) {
            console.error('Error fetching schedule details:', error);
        }
    };

    const ScheduleIdBodyTemplate = (rowData) => {
        return (
            <div className="flex align-items-center">
                <span>{rowData.scheduleId}</span>
                <Button
                    icon="pi pi-info"
                    className="p-button-text p-button-info p-ml-2"
                    onClick={() => fetchScheduleDetails(rowData.scheduleId)}
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
                <Delete container={rowData} fetchContainers={fetchContainers} />
            </div>
        );
    };

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">Trạng thái chi tiết container</span>
            <CreateContainerDrawer fetchContainers={fetchContainers} />
        </div>
    );

    const footer = `Có ${containers ? containers.length : 0} container.`;

    return (
        <div className="card">
            <DataTable value={containers} header={header} footer={footer} tableStyle={{ minWidth: '60rem' }}>
                <Column field="containerCode" header="Mã định danh"></Column>
                <Column field="shipName" header="Hãng tàu"></Column>
                <Column field="scheduleId" header="Id lịch trình" body={ScheduleIdBodyTemplate}></Column>
                <Column field="routeName" header="Tuyến đường"></Column>
                <Column field="location" header="Vị trí hiện tại"></Column>
                <Column field="status" header="Trạng thái"></Column>
                <Column header="Thao tác" body={ActionButtons}></Column>
            </DataTable>
            <ScheduleDetailsModal
                visible={detailsVisible}
                onHide={() => setDetailsVisible(false)}
                schedule={scheduleDetails}
            />
        </div>
    );
}
