import React, {useEffect, useState, useMemo} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Dialog} from 'primereact/dialog';
import axios from 'axios';
import {Dropdown} from 'primereact/dropdown';
import {InputText} from 'primereact/inputtext';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import UpdateContainerDrawer from "./UpdateContainerDrawer";
import CreateContainerDrawer from "./CreateContainerDrawer";
import {Chip} from "primereact/chip";
import './container.css';

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

export default function ContainerTable({ containers, fetchContainers, showToast }) {
    const [selectedContainer, setSelectedContainer] = useState(null);
    const [displayDialog, setDisplayDialog] = useState(false);
    const [userRole, setUserRole] = useState();
    const [searchType, setSearchType] = useState('containerCode');
    const [searchQuery, setSearchQuery] = useState('');

    const searchTypes = [
        { label: 'Mã định danh', value: 'containerCode' },
        { label: 'Khách hàng', value: 'customer.name' },
    ];

    useEffect(() => {
        const userRole = localStorage.getItem('userRole');
        setUserRole(userRole);
    }, []);

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

    const filteredContainers = useMemo(() => {
        if (!searchQuery) return containers;

        return containers.filter(container => {
            let fieldValue = '';
            if (searchType === 'containerCode') {
                fieldValue = container.containerCode || '';
            } else if (searchType === 'containerSize.containerType.name') {
                fieldValue = container.containerSize?.containerType?.name || '';
            } else if (searchType === 'status') {
                fieldValue = container.status || '';
            } else if (searchType === 'customer.name') {
                fieldValue = container.customer?.name || '';
            }
            return fieldValue.toString().toLowerCase().includes(searchQuery.toLowerCase());
        });
    }, [searchType, searchQuery, containers]);

    const ActionButtons = (rowData) => (
        <div className="">
            <i className="pi pi-eye" style={{fontSize: '1.2rem', marginRight: '10px', marginLeft: '10px'}}
               onClick={() => showDetailDialog(rowData)}/>
            {rowData.isRepair === 1 ? (
                ''
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

    const statusBodyTemplate = (rowData) => {
        if (rowData.status === 'In Transit') {
            return <Chip label={containerStatusMap[rowData.status]} icon="pi pi-truck" style={{ fontSize: '12px'}}/>;
        } else if (rowData.status === 'Under Maintenance') {
            return <Chip label={containerStatusMap[rowData.status]} icon="pi pi-wrench" style={{ fontSize: '12px'}}/>;
        } else if (rowData.status === 'In Port') {
            return <Chip label={containerStatusMap[rowData.status]} icon="pi pi-box" style={{ fontSize: '12px'}}/>;
        }
    };

    const hasGoodsBodyTemplate = (rowData) => {
        return <i className={rowData.hasGoods ? "pi pi-check-circle" : "pi pi-times-circle"} style={rowData.hasGoods ? { color: 'green' } : { color: 'red' }}></i>;
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

    const shipScheduleBodyTemplate = (rowData) => (
        <div>
            {rowData.customer?.name} {rowData.customer?.username}
        </div>
    );

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">Trạng thái chi tiết container</span>
            {userRole === 'MANAGER' && <CreateContainerDrawer showToast={showToast} fetchContainers={fetchContainers} />}
        </div>
    );

    const footer = `Có ${filteredContainers ? filteredContainers.length : 0} container.`;

    const containerDetails = selectedContainer ? [
        { label: "Mã Container", value: selectedContainer.containerCode },
        { label: "Loại Container", value: selectedContainer.containerSize?.containerType?.name },
        { label: "Kích thước", value: `${selectedContainer.containerSize?.length} x ${selectedContainer.containerSize?.width} x ${selectedContainer.containerSize?.height} (m)` },
        { label: "Trạng thái", value: selectedContainer.status },
        { label: "Vị trí cảng", value: selectedContainer.portLocation?.portName },
        { label: "Tàu vận chuyển", value: selectedContainer.shipSchedule?.ship?.name },
        { label: "Công ty vận chuyển", value: selectedContainer.shipSchedule?.ship?.company },
        { label: "Thời gian khởi hành", value: new Date(selectedContainer.shipSchedule?.schedule?.departureTime).toLocaleString() },
        { label: "Thời gian ước tính đến", value: new Date(selectedContainer.shipSchedule?.schedule?.estimatedArrivalTime).toLocaleString() },
        { label: "Khách hàng", value: selectedContainer.customer?.name }
    ] : [];

    const renderLabel = (label) => <strong>{label}</strong>;
    const renderValue = (value) => <span>{value}</span>;

    return (
        <>
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
                        <InputText
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Tìm kiếm"
                            style={{width: '300px'}}
                        />
                    </div>
                </div>

                <DataTable paginator rows={20} value={filteredContainers} header={header} footer={footer} tableStyle={{ minWidth: '50rem' }} showGridlines className="custom-datatable">
                    <Column field="containerCode" header="Mã Container"></Column>
                    <Column header="Loại Container" body={(rowData) => rowData.containerSize?.containerType?.name}></Column>
                    <Column header="Kích thước (m)" body={(rowData) => `${rowData.containerSize?.length} x ${rowData.containerSize?.width} x ${rowData.containerSize?.height}`}></Column>
                    <Column header="Trạng thái" body={statusBodyTemplate}></Column>
                    <Column header="Vị trí hiện tại" body={locationBodyTemplate}></Column>
                    <Column header="Khách hàng" body={shipScheduleBodyTemplate}></Column>
                    <Column header="Hành động" body={ActionButtons}></Column>
                </DataTable>
            </div>

            <Dialog header="Chi tiết Container" visible={displayDialog} style={{ width: '50vw' }} onHide={hideDetailDialog} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                <div className="dialog-content">
                    {containerDetails.map(({ label, value }) => (
                        <div className="dialog-row" key={label}>
                            <p>{renderLabel(label)}</p>
                            <span>{renderValue(value)}</span>
                        </div>
                    ))}
                </div>
            </Dialog>
        </>
    );
}
