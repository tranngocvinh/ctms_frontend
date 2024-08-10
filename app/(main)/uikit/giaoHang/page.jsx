"use client"
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const DeliveryOrderTable = () => {
    const emptyDeliveryOrder = {
        id: null,
        orderNumber: '',
        customerId: null,
        scheduleId: null,
        orderDate: null,
        deliveryDate: null,
        totalAmount: 0,
        status: '',
        notes: '',
        deliveryOrderDetails: [],
        deliveryAddresses: [],
        deliveryStatuses: []
    };

    const [deliveryOrders, setDeliveryOrders] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [deliveryOrderDialog, setDeliveryOrderDialog] = useState(false);
    const [deleteDeliveryOrderDialog, setDeleteDeliveryOrderDialog] = useState(false);
    const [deliveryOrder, setDeliveryOrder] = useState(emptyDeliveryOrder);
    const [selectedDeliveryOrders, setSelectedDeliveryOrders] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
       fetchData()
    }, []);


    const fetchData = () =>{
        axios.get(`https://auth.g42.biz/api/delivery-orders`).then(response => setDeliveryOrders(response.data));
        axios.get(`https://auth.g42.biz/api/v1/customers`).then(response => setCustomers(response.data));
        axios.get(`https://auth.g42.biz/api/schedules`).then(response => setSchedules(response.data));
    }
    const openNew = () => {
        setDeliveryOrder(emptyDeliveryOrder);
        setSubmitted(false);
        setDeliveryOrderDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setDeliveryOrderDialog(false);
    };

    const hideDeleteDeliveryOrderDialog = () => {
        setDeleteDeliveryOrderDialog(false);
    };

    const saveDeliveryOrder = () => {
        setSubmitted(true);

        if (deliveryOrder.customerId && deliveryOrder.scheduleId && deliveryOrder.orderDate && deliveryOrder.deliveryDate) {
            let _deliveryOrders = [...deliveryOrders];
            let _deliveryOrder = { ...deliveryOrder };

            if (deliveryOrder.id) {
                axios.put(`https://auth.g42.biz/api/delivery-orders/${deliveryOrder.id}`, _deliveryOrder).then(response => {
                    const index = findIndexById(deliveryOrder.id);
                    _deliveryOrders[index] = response.data;
                    setDeliveryOrders(_deliveryOrders);
                    setDeliveryOrderDialog(false);
                    setDeliveryOrder(emptyDeliveryOrder);
                    fetchData()
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Lệnh giao hàng đã được cập nhật', life: 3000 });
                });
            } else {
                axios.post(`https://auth.g42.biz/api/delivery-orders`, _deliveryOrder).then(response => {
                    _deliveryOrders.push(response.data);
                    setDeliveryOrders(_deliveryOrders);
                    setDeliveryOrderDialog(false);
                    setDeliveryOrder(emptyDeliveryOrder);
                    fetchData();
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Lệnh giao hàng đã được tạo', life: 3000 });
                });
            }
        }
    };

    const editDeliveryOrder = (deliveryOrder) => {
        setDeliveryOrder({ ...deliveryOrder });
        setDeliveryOrderDialog(true);
    };

    const confirmDeleteDeliveryOrder = (deliveryOrder) => {
        setDeliveryOrder(deliveryOrder);
        setDeleteDeliveryOrderDialog(true);
    };

    const deleteDeliveryOrder = () => {
        axios.delete(`https://auth.g42.biz/api/delivery-orders/${deliveryOrder.id}`).then(() => {
            let _deliveryOrders = deliveryOrders.filter(val => val.id !== deliveryOrder.id);
            setDeliveryOrders(_deliveryOrders);
            setDeleteDeliveryOrderDialog(false);
            setDeliveryOrder(emptyDeliveryOrder);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Xóa lệnh giao hàng thành công', life: 3000 });
        });
    };

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < deliveryOrders.length; i++) {
            if (deliveryOrders[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _deliveryOrder = { ...deliveryOrder };
        _deliveryOrder[`${name}`] = val;
        setDeliveryOrder(_deliveryOrder);
    };

    const onDropdownChange = (e, name) => {
        let _deliveryOrder = { ...deliveryOrder };
        _deliveryOrder[`${name}`] = e.value.id;
        setDeliveryOrder(_deliveryOrder);
    };

    const onDateChange = (e, name) => {
        let _deliveryOrder = { ...deliveryOrder };
        _deliveryOrder[`${name}`] = e.value;
        setDeliveryOrder(_deliveryOrder);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Thêm" icon="pi pi-plus" className="mr-2" onClick={openNew} />
                <Button label="Xóa" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedDeliveryOrders || !selectedDeliveryOrders.length} />
            </React.Fragment>
        )
    };

    const confirmDeleteSelected = () => {
        setDeleteDeliveryOrderDialog(true);
    };

    const deleteSelectedDeliveryOrders = () => {
        let _deliveryOrders = deliveryOrders.filter(val => !selectedDeliveryOrders.includes(val));
        setDeliveryOrders(_deliveryOrders);
        setDeleteDeliveryOrderDialog(false);
        setSelectedDeliveryOrders(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Xóa lệnh giao hàng thành công', life: 3000 });
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Xuất Excel" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
            </React.Fragment>
        )
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editDeliveryOrder(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteDeliveryOrder(rowData)} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Quản lý lệnh giao hàng</h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Tìm kiếm..." />
            </span>
        </div>
    );

    const deliveryOrderDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveDeliveryOrder} />
        </React.Fragment>
    );

    const deleteDeliveryOrderDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteDeliveryOrderDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteDeliveryOrder} />
        </React.Fragment>
    );

    const orderDateTemplate = (rowData) => {
        return new Date(rowData.orderDate).toLocaleString();
    };

    const deliveryDateTemplate = (rowData) => {
        return new Date(rowData.deliveryDate).toLocaleString();
    };

    const getCustomer = (rowData) =>{
        const customerName = customers.find(customer => customer.id === rowData.customerId) ;
        return customerName ? customerName.username : "unknown"
    }

    const getSchedule = (rowData) =>{
        const schedule = schedules.find(schedule => schedule.id === rowData.scheduleId)
        return schedule ? schedule.codeSchedule : "unknown"
    }

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable
                    ref={dt}
                    value={deliveryOrders}
                    selection={selectedDeliveryOrders}
                    onSelectionChange={(e) => setSelectedDeliveryOrders(e.value)}
                    dataKey="id"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Hiện từ {first} tới {last} trên tổng số {totalRecords} lệnh giao hàng"
                    globalFilter={globalFilter}
                    header={header}
                    responsiveLayout="scroll"
                >
                    <Column selectionMode="multiple" exportable={false}></Column>
                    <Column field="orderNumber" header="Mã đơn hàng" sortable></Column>
                    <Column field="customerId" header="Tên khách hàng" body={getCustomer} sortable></Column>
                    <Column field="scheduleId" header="Mã lịch trình" body={getSchedule} sortable></Column>
                    <Column header="Ngày đặt hàng" sortable body={orderDateTemplate}></Column>
                    <Column header="Ngày giao hàng" sortable body={deliveryDateTemplate}></Column>
                    <Column field="totalAmount" header="Tổng tiền" sortable></Column>
                    <Column field="status" header="Trạng thái" sortable></Column>
                    <Column body={actionBodyTemplate} exportable={false}></Column>
                </DataTable>
            </div>

            <Dialog
                visible={deliveryOrderDialog}
                style={{ width: '450px' }}
                header="Chi tiết lệnh giao hàng"
                modal
                className="p-fluid"
                footer={deliveryOrderDialogFooter}
                onHide={hideDialog}
            >
                <div className="field">
                    <label htmlFor="orderNumber">Mã lệnh giao hàng</label>
                    <InputText
                        id="orderNumber"
                        value={deliveryOrder.orderNumber}
                        onChange={(e) => onInputChange(e, 'orderNumber')}
                    />
                </div>
                <div className="field">
                    <label htmlFor="customer">Khách hàng</label>
                    <Dropdown
                        id="customer"
                        value={customers.find((customer) => customer.id === deliveryOrder.customerId)}
                        options={customers}
                        onChange={(e) => onDropdownChange(e, 'customerId')}
                        optionLabel="name"
                        placeholder="Chọn khách hàng"
                    />
                </div>
                <div className="field">
                    <label htmlFor="schedule">Lịch trình</label>
                    <Dropdown
                        id="schedule"
                        value={schedules.find((schedule) => schedule.id === deliveryOrder.scheduleId)}
                        options={schedules}
                        onChange={(e) => onDropdownChange(e, 'scheduleId')}
                        optionLabel="codeSchedule"
                        placeholder="Chọn lịch trình"
                    />
                </div>
                <div className="field">
                    <label htmlFor="orderDate">Ngày đặt hàng</label>
                    <Calendar
                        id="orderDate"
                        value={deliveryOrder.orderDate ? new Date(deliveryOrder.orderDate) : null}
                        onChange={(e) => onDateChange(e, 'orderDate')}
                        showTime
                        showSeconds
                    />
                </div>
                <div className="field">
                    <label htmlFor="deliveryDate">Ngày giao hàng</label>
                    <Calendar
                        id="deliveryDate"
                        value={deliveryOrder.deliveryDate ? new Date(deliveryOrder.deliveryDate) : null}
                        onChange={(e) => onDateChange(e, 'deliveryDate')}
                        showTime
                        showSeconds
                    />
                </div>
                <div className="field">
                    <label htmlFor="totalAmount">Tổng tiền</label>
                    <InputText
                        id="totalAmount"
                        value={deliveryOrder.totalAmount}
                        onChange={(e) => onInputChange(e, 'totalAmount')}
                    />
                </div>
                <div className="field">
                    <label htmlFor="status">Trạng thái</label>
                    <InputText
                        id="status"
                        value={deliveryOrder.status}
                        onChange={(e) => onInputChange(e, 'status')}
                    />
                </div>
                <div className="field">
                    <label htmlFor="notes">Ghi chú</label>
                    <InputText
                        id="notes"
                        value={deliveryOrder.notes}
                        onChange={(e) => onInputChange(e, 'notes')}
                    />
                </div>
            </Dialog>

            <Dialog
                visible={deleteDeliveryOrderDialog}
                style={{ width: '450px' }}
                header="Xác nhận"
                modal
                footer={deleteDeliveryOrderDialogFooter}
                onHide={hideDeleteDeliveryOrderDialog}
            >
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {deliveryOrder && (
                        <span>
                            Bạn có chắc chắn muốn xóa lệnh giao hàng <b>{deliveryOrder.orderNumber}</b>?
                        </span>
                    )}
                </div>
            </Dialog>
        </div>
    );
};

export default DeliveryOrderTable;
