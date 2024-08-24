import React, {useRef, useState, useEffect} from 'react';
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
        const response = await axios.get(`http://localhost:8080/api/schedules/${id}`);
        return response.data;
    } catch (e) {
        console.error('Error fetching schedule details:', e);
        throw e;
    }
};

export default function ContainerTable({ containers, fetchContainers, showToast }) {
    const [selectedContainer, setSelectedContainer] = useState(null);
    const [scheduleDetails, setScheduleDetails] = useState([]);
    const [displayDialog, setDisplayDialog] = useState(false);
    const [userRole,setUserRole] = useState() ;


    useEffect(() => {
        const userRole = localStorage.getItem('userRole');
        setUserRole(userRole)
    },[])
    const fetchScheduleDetails = async (scheduleIds) => {
        try {
            const promises = scheduleIds.map(id => getSchedules(id));
            const data = await Promise.all(promises);
            setScheduleDetails(data);
        } catch (error) {
            console.error('Error fetching schedule details:', error);
        }
    };

    const showDetailDialog = (container) => {
        setSelectedContainer(container);
        if (container.shipSchedule && container.shipSchedule.length > 0) {
            const scheduleIds = container.shipSchedule.map(schedule => schedule.schedule.id);
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
                <Button label="Chi tiết" onClick={() => showDetailDialog(rowData)} />
                {rowData.isRepair === 1 ? (
                    <Button label="đang sửa chữa" disabled style={{marginLeft:10}} />
                ) : (
                    <>
                    {(userRole === 'STAFF' || userRole === 'MANAGER') ? (
                    <UpdateContainerDrawer
                        container={rowData}
                        fetchContainers={fetchContainers}
                        label="Sửa"
                        severity="info"
                    />)
                     : null
                    }
                    </>

                )}
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

            return (
                <div >
                    {rowData.customer?.name} ({rowData.customer?.username})
                </div>
            )

    };

    const formatDate = (dateString) => {
        return dateString.substring(0, 10); // chỉ lấy 10 ký tự đầu cho ngày tháng năm
    };

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">Trạng thái chi tiết container</span>

            {userRole === 'MANAGER' && <CreateContainerDrawer showToast={showToast} fetchContainers={fetchContainers} />}

        </div>
    );

    const footer = `Có ${containers ? containers.length : 0} container.`;

    return (
        <>

    <div className="card">

            <DataTable value={containers} header={header} footer={footer} tableStyle={{ minWidth: '60rem' }}>
                <Column field="containerCode" header="Mã định danh"></Column>
                <Column header="Khách hàng" body={shipScheduleBodyTemplate}></Column>
                <Column field="containerSize.containerType.name" header="Loại container"></Column>
                <Column field="status" header="Trạng thái" body={statusBodyTemplate}></Column>
                <Column field="hasGoods" header="Có hàng" body={hasGoodsBodyTemplate}></Column>
                <Column header="Thao tác" body={ActionButtons}></Column>
            </DataTable>

            <Dialog header="Chi tiết Lịch trình" visible={displayDialog} style={{ width: '50vw' }} onHide={hideDetailDialog}>
                <Dialog header="Chi tiết Lịch trình" visible={displayDialog} style={{ width: '50vw' }} onHide={hideDetailDialog}>
                    <div>
                        <div>
                            <div><strong>Mã Container:</strong> {selectedContainer?.containerCode}</div>
                            <div><strong>Loại Container:</strong> {selectedContainer?.containerSize?.containerType?.name}</div>
                            <div><strong>Kích thước:</strong>
                                {selectedContainer?.containerSize?.length}m x
                                {selectedContainer?.containerSize?.width}m x
                                {selectedContainer?.containerSize?.height}m
                            </div>
                            <div><strong>Trạng thái:</strong> {selectedContainer?.status}</div>
                            <div><strong>Vị trí cảng:</strong> {selectedContainer?.portLocation?.portName}</div>
                            <div><strong>Tàu vận chuyển:</strong> {selectedContainer?.shipSchedule?.ship?.name}</div>
                            <div><strong>Công ty vận chuyển:</strong> {selectedContainer?.shipSchedule?.ship?.company}</div>
                            <div><strong>Thời gian khởi hành:</strong> {new Date(selectedContainer?.shipSchedule?.schedule?.departureTime).toLocaleString()}</div>
                            <div><strong>Thời gian ước tính đến:</strong> {new Date(selectedContainer?.shipSchedule?.schedule?.estimatedArrivalTime).toLocaleString()}</div>
                            <div><strong>Khách hàng:</strong> {selectedContainer?.customer?.name}</div>
                            <hr />
                        </div>
                    </div>
                </Dialog>
            </Dialog>
        </div>
            </>
    );
}
