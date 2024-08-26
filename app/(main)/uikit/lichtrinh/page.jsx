"use client"
import React, {useEffect, useRef, useState} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Toast} from 'primereact/toast';
import {Button} from 'primereact/button';
import {Toolbar} from 'primereact/toolbar';
import {Dialog} from 'primereact/dialog';
import {Dropdown} from 'primereact/dropdown';
import {Calendar} from 'primereact/calendar';
import {InputText} from 'primereact/inputtext';
import axios from 'axios';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const ScheduleTable = () => {
    const emptySchedule = {
        id: null,
        routeId: null,
        departureTime: null,
        estimatedArrivalTime: null,
        codeSchedule: '',
        scheduleSegments: []
    };

    const [schedules, setSchedules] = useState([]);
    const [routes, setRoutes] = useState([]);
    const [ships, setShips] = useState([]);
    const [scheduleDialog, setScheduleDialog] = useState(false);
    const [deleteScheduleDialog, setDeleteScheduleDialog] = useState(false);
    const [schedule, setSchedule] = useState(emptySchedule);
    const [selectedSchedules, setSelectedSchedules] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        axios.get(`https://auth.g42.biz/api/schedules`).then(response => setSchedules(response.data));
        axios.get(`https://auth.g42.biz/api/routes`).then(response => setRoutes(response.data));
        axios.get(`https://auth.g42.biz/api/ships`).then(response => setShips(response.data));
    }, []);

    const openNew = () => {
        setSchedule(emptySchedule);
        setSubmitted(false);
        setScheduleDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setScheduleDialog(false);
    };

    const hideDeleteScheduleDialog = () => {
        setDeleteScheduleDialog(false);
    };

    const saveSchedule = () => {
        setSubmitted(true);

        if (schedule.routeId && schedule.scheduleSegments.length > 0) {
            schedule.departureTime = schedule.scheduleSegments[0].departureTime;
            schedule.estimatedArrivalTime = schedule.scheduleSegments[schedule.scheduleSegments.length - 1].arrivalTime;

            let _schedules = [...schedules];
            let _schedule = { ...schedule };

            if (schedule.id) {
                axios.put(`https://auth.g42.biz/api/schedules/${schedule.id}`, _schedule).then(response => {
                    const index = findIndexById(schedule.id);
                    _schedules[index] = response.data;
                    setSchedules(_schedules);
                    setScheduleDialog(false);
                    setSchedule(emptySchedule);
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Schedule Updated', life: 3000 });
                });
            } else {
                axios.post(`https://auth.g42.biz/api/schedules`, _schedule).then(response => {
                    _schedules.push(response.data);
                    setSchedules(_schedules);
                    setScheduleDialog(false);
                    setSchedule(emptySchedule);
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Schedule Created', life: 3000 });
                });
            }
        }
    };

    const editSchedule = (schedule) => {
        setSchedule({ ...schedule });
        setScheduleDialog(true);
    };

    const confirmDeleteSchedule = (schedule) => {
        setSchedule(schedule);
        setDeleteScheduleDialog(true);
    };

    const deleteSchedule = () => {
        axios.delete(`https://auth.g42.biz/api/schedules/${schedule.id}`).then(() => {
            let _schedules = schedules.filter(val => val.id !== schedule.id);
            setSchedules(_schedules);
            setDeleteScheduleDialog(false);
            setSchedule(emptySchedule);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Xóa lịch trình thành công', life: 3000 });
        });
    };

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < schedules.length; i++) {
            if (schedules[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _schedule = { ...schedule };
        _schedule[`${name}`] = val;
        setSchedule(_schedule);
    };

    const onDropdownChange = (e, name) => {
        let _schedule = { ...schedule };
        _schedule[`${name}`] = e.value.id;
        if (name === 'routeId') {
            _schedule.scheduleSegments = e.value.routeSegments.map(segment => ({
                routeSegmentId: segment.id,
                shipId: null,
                departureTime: null,
                arrivalTime: null
            }));
        }
        setSchedule(_schedule);
    };

    const onDateChange = (e, name) => {
        let _schedule = { ...schedule };
        _schedule[`${name}`] = e.value;
        setSchedule(_schedule);
    };

    const handleSegmentTimeChange = (index, field, value) => {
        const updatedSegments = [...schedule.scheduleSegments];
        updatedSegments[index][field] = value;
        setSchedule({ ...schedule, scheduleSegments: updatedSegments });
    };

    const handleSegmentShipChange = (index, value) => {
        const updatedSegments = [...schedule.scheduleSegments];
        updatedSegments[index].shipId = value.id;
        setSchedule({ ...schedule, scheduleSegments: updatedSegments });
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" className="mr-2" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedSchedules || !selectedSchedules.length} />
            </React.Fragment>
        )
    };

    const confirmDeleteSelected = () => {
        setDeleteScheduleDialog(true);
    };

    const deleteSelectedSchedules = () => {
        let _schedules = schedules.filter(val => !selectedSchedules.includes(val));
        setSchedules(_schedules);
        setDeleteScheduleDialog(false);
        setSelectedSchedules(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Xóa lịch trình thành công', life: 3000 });
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
            </React.Fragment>
        )
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editSchedule(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteSchedule(rowData)} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Schedules</h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const getSegmentTitle = (index) => {
        if (!schedule || !schedule.routeId || !routes.length) return `Segment ${index + 1}`;
        const route = routes.find(route => route.id === schedule.routeId);
        if (!route || !route.routeSegments) return `Segment ${index + 1}`;
        const segment = route.routeSegments[index];
        const startWaypoint = route.waypoints[index].portName;
        const endWaypoint = route.waypoints[index + 1].portName;
        return `${startWaypoint} - ${endWaypoint}`;
    };

    const scheduleDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveSchedule} />
        </React.Fragment>
    );

    const deleteScheduleDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteScheduleDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSchedule} />
        </React.Fragment>
    );

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable
                    ref={dt}
                    value={schedules}
                    selection={selectedSchedules}
                    onSelectionChange={(e) => setSelectedSchedules(e.value)}
                    dataKey="id"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} schedules"
                    globalFilter={globalFilter}
                    header={header}
                    responsiveLayout="scroll"
                >
                    <Column selectionMode="multiple" exportable={false}></Column>
                    <Column field="codeSchedule" header="Mã chuyến" sortable></Column>
                    <Column field="routeName" header="Tên chuyến" sortable></Column>
                    <Column field="departureTime" header="Thời gian khởi hành" sortable></Column>
                    <Column field="estimatedArrivalTime" header="Thời gian đến" sortable></Column>
                    <Column body={actionBodyTemplate} exportable={false}></Column>
                </DataTable>
            </div>

            <Dialog
                visible={scheduleDialog}
                style={{ width: '450px' }}
                header="Lịch chi tiết"
                modal
                className="p-fluid"
                footer={scheduleDialogFooter}
                onHide={hideDialog}
            >
                <div className="field">
                    <label htmlFor="Tên tuyến">Route</label>
                    <Dropdown
                        id="route"
                        value={routes.find((route) => route.id === schedule.routeId)}
                        options={routes}
                        onChange={(e) => onDropdownChange(e, 'routeId')}
                        optionLabel="name"
                        placeholder="Chọn tuyến"
                    />
                </div>
                {schedule.scheduleSegments.map((segment, index) => (
                    <div key={index} className="field">
                        <h5>Chặng {index + 1}: {getSegmentTitle(index)}</h5>
                        <div className="field">
                            <label htmlFor={`ship-${index}`}>Ship</label>
                            <Dropdown
                                id={`ship-${index}`}
                                value={ships.find((ship) => ship.id === segment.shipId)}
                                options={ships}
                                onChange={(e) => handleSegmentShipChange(index, e.value)}
                                optionLabel="registrationNumber"
                                placeholder="Chọn tàu"
                            />
                        </div>
                        <div className="field">
                            <label htmlFor={`segmentDepartureTime-${index}`}>Thời gian khởi hành</label>
                            <Calendar
                                id={`segmentDepartureTime-${index}`}
                                value={segment.departureTime ? new Date(segment.departureTime) : null}
                                onChange={(e) => handleSegmentTimeChange(index, 'departureTime', e.value)}
                                showTime
                                showSeconds
                            />
                        </div>
                        <div className="field">
                            <label htmlFor={`segmentArrivalTime-${index}`}>Thời gian đến</label>
                            <Calendar
                                id={`segmentArrivalTime-${index}`}
                                value={segment.arrivalTime ? new Date(segment.arrivalTime) : null}
                                onChange={(e) => handleSegmentTimeChange(index, 'arrivalTime', e.value)}
                                showTime
                                showSeconds
                            />
                        </div>
                    </div>
                ))}
                <div className="field">
                    <label htmlFor="codeSchedule">Mã chuyến tàu</label>
                    <InputText
                        id="codeSchedule"
                        value={schedule.codeSchedule}
                        onChange={(e) => onInputChange(e, 'codeSchedule')}
                    />
                </div>
            </Dialog>

            <Dialog
                visible={deleteScheduleDialog}
                style={{ width: '450px' }}
                header="Confirm"
                modal
                footer={deleteScheduleDialogFooter}
                onHide={hideDeleteScheduleDialog}
            >
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {schedule && (
                        <span>
                            Bạn có chắc chắn muốn xóa chuyến tàu <b>{schedule.codeSchedule}</b>?
                        </span>
                    )}
                </div>
            </Dialog>
        </div>
    );
};

export default ScheduleTable;

