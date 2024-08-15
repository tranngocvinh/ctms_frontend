import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Dialog } from 'primereact/dialog';
import axios from 'axios';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import UpdateContainerDrawer from "./UpdateContainerDrawer";
import DeleteContainer from "./DeleteContainer";
import CreateContainerDrawer from "./CreateContainerDrawer";

const containerStatusMap = {
    'In Transit': 'Đang di chuyển',
    'Under Maintenance': 'Đang sửa chữa',
    'In Port': 'Đang nằm ở cảng',
};

export const getSchedules = async (id) => {
    try {
        const response = await axios.get(`https://auth.g42.biz/api/schedules/${id}`);
        return response.data;
    } catch (e) {
        throw e;
    }
};

export default function ContainerTable({ containers, fetchContainers }) {
    const [selectedContainer, setSelectedContainer] = useState(null);
    const [scheduleDetails, setScheduleDetails] = useState([]);
    const [displayDialog, setDisplayDialog] = useState(false);

    const fetchScheduleDetails = async (scheduleIds) => {
        try {
            const promises = scheduleIds.map(id => getSchedules(id));
            const data = await Promise.all(promises);
            setScheduleDetails(data);
        } catch (error) {
        }
    };

    const showDetailDialog = (container) => {
        setSelectedContainer(container);
        if (container.shipSchedules && container.shipSchedules.length > 0) {
            const scheduleIds = container.shipSchedules.map(schedule => schedule.schedule.id);
            fetchScheduleDetails(scheduleIds);
        }
        setDisplayDialog(true);
    };

    const hideDetailDialog = () => {
        setSelectedContainer(null);
        setScheduleDetails([]);
        setDisplayDialog(false);
    };

    const ActionButtons = (rowData) => {
        return (
            <div className="">
                <Button label="Chi tiết" onClick={() => showDetailDialog(rowData)} disabled={rowData.status !== 'In Transit'} />
                <UpdateContainerDrawer
                    container={rowData} fetchContainers={fetchContainers} label="Sửa" severity="info"
                />
                <DeleteContainer container={rowData} fetchContainers={fetchContainers} />
            </div>
        );
    };

    const statusBodyTemplate = (rowData) => {
        let severity = "info";
        if (rowData.status === 'In Transit') {
            severity = "warning";
        } else if (rowData.status === 'Under Maintenance') {
            severity = "info";
        } else if (rowData.status === 'In Port') {
            severity = "success";
        }
        return <Tag value={containerStatusMap[rowData.status]} severity={severity}></Tag>;
    };

    const hasGoodsBodyTemplate = (rowData) => {
        return <Tag value={rowData.hasGoods ? 'Có hàng' : 'Không có hàng'} severity={rowData.hasGoods ? 'success' : 'warning'}></Tag>;
    };

    const locationBodyTemplate = (rowData) => {
        if (rowData.status === 'In Port') {
            return rowData.portLocation?.portName;
        } else if (rowData.status === 'Under Maintenance') {
            return rowData.containerSupplier?.supplierName;
        } else if (rowData.status === 'In Transit') {
            return rowData.shipSchedules?.map((schedule, index) => (
                <div key={index}>
                    {schedule.schedule?.routeName} - {schedule.ship?.registrationNumber}
                </div>
            ));
        }
        return null;
    };

    const shipScheduleBodyTemplate = (rowData) => {
        if (rowData.shipSchedules && rowData.shipSchedules.length > 0) {
            return rowData.shipSchedules.map((shipSchedule, index) => (
                <div key={index}>
                    {shipSchedule.ship?.registrationNumber}
                </div>
            ));
        }
        return null;
    };

    const formatDate = (dateString) => {
        return dateString.substring(0, 10); // chỉ lấy 10 ký tự đầu cho ngày tháng năm
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
                <Column header="Hãng tàu" body={shipScheduleBodyTemplate}></Column>
                <Column field="containerSize.containerType.name" header="Loại container"></Column>
                <Column field="status" header="Trạng thái" body={statusBodyTemplate}></Column>
                <Column field="hasGoods" header="Có hàng" body={hasGoodsBodyTemplate}></Column>
                <Column header="Thao tác" body={ActionButtons}></Column>
            </DataTable>

            <Dialog header="Chi tiết Lịch trình" visible={displayDialog} style={{ width: '50vw' }} onHide={hideDetailDialog}>
                {selectedContainer && scheduleDetails.length > 0 ? (
                    <div>
                        {scheduleDetails.map((detail, index) => (
                            <div key={index}>
                                <div><strong>Tuyến:</strong> {detail.routeName}</div>
                                <div><strong>Các điểm dừng:</strong></div>
                                <ul>
                                    {detail.waypoints.map((waypoint, i) => (
                                        <li key={i}>{waypoint.portName}</li>
                                    ))}
                                </ul>
                                <div><strong>Thời gian khởi hành:</strong> {new Date(detail.departureTime).toLocaleString()}</div>
                                <div><strong>Thời gian ước tính đến:</strong> {new Date(detail.estimatedArrivalTime).toLocaleString()}</div>
                                <hr />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Container này hiện chưa có lịch trình</p>
                )}
            </Dialog>
        </div>
    );
}
