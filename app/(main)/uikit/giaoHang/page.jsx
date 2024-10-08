/* eslint react-hooks/rules-of-hooks: 0 */
"use client";
import React, {useEffect, useRef, useState} from "react";
import {Button, Calendar, Checkbox, Column, DataTable, Dialog, Dropdown, InputText, Toast, Toolbar,} from "primereact";
import axios from "axios";
import {FixedSizeList as List} from "react-window";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import './giaohang.css';
import {isManager} from "../../../verifyRole";
import {InputNumber} from "primereact/inputnumber";
import {Chip} from "primereact/chip";
import { Tag } from 'primereact/tag';

const DeliveryOrderTable = () => {
    const jwtToken = localStorage.getItem('jwtToken');
    const authToken = localStorage.getItem('authToken');
    let today = new Date();
    const [date, setDate] = useState(null);

    let minOrderDate = today;

    let minDeliveryDate = new Date(minOrderDate);
    minDeliveryDate.setDate(minOrderDate.getDate() + 7);
    if(!isManager(jwtToken, authToken)) {
        return <p>Trang này không tồn tại</p>;
    }
    const emptyDeliveryOrder = {
        id: null,
        orderNumber: "",
        customerId: null,
        scheduleId: null,
        orderDate: null,
        deliveryDate: null,
        totalAmount: 0,
        status: "",
        notes: "",
        shipScheduleContainerMap: {},
    };

    const [state, setState] = useState({
        selectedDeliveryOrder: null,
        deliveryOrders: [],
        customers: [],
        schedules: [],
        containers: [],
        shipSchedules: [],
        deliveryOrderDialog: false,
        deleteDeliveryOrderDialog: false,
        deliveryOrder: emptyDeliveryOrder,
        selectedDeliveryOrders: [],
        submitted: false,
        globalFilter: null,
        page: 0,
    });

    const [state1, setState1] = useState({
        selectedDeliveryOrder: null,
        deliveryOrders: [],
        customers: [],
        schedules: [],
        containers: [],
        shipSchedules: [],
        deliveryOrderDialog: false,
        deleteDeliveryOrderDialog: false,
        deliveryOrder: emptyDeliveryOrder,
        selectedDeliveryOrders: [],
        submitted: false,
        globalFilter: null,
        page: 0,
    });

    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        fetchData();
    }, []);

    const getAuthConfig = () => ({
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
    });

    const fetchData = () => {
        axios
            .get(`https://auth.g42.biz/api/delivery-orders`,getAuthConfig())
            .then((response) => setState((prev) => ({ ...prev, deliveryOrders: response.data })));
        axios
            .get(`https://auth.g42.biz/api/v1/customers`,getAuthConfig())
            .then((response) => setState((prev) => ({ ...prev, customers: response.data })));
        axios
            .get(`https://auth.g42.biz/api/schedules`,getAuthConfig())
            .then((response) => setState((prev) => ({ ...prev, schedules: response.data })));
        fetchContainers(); // Initial fetch for containers
    };

    const fetchContainers = () => {
        axios
            .get(`https://auth.g42.biz/api/containers`, getAuthConfig())
            .then((response) => setState((prev) => ({
                ...prev,
                containers: response.data // Replace the containers array, do not append
            })));
    };

    const fetchShipSchedulesByScheduleId = (scheduleId) => {
        axios
            .get(`https://auth.g42.biz/api/shipSchedules/delivery?scheduleId=${scheduleId}`,getAuthConfig())
            .then((response) => {
                const newShipScheduleContainerMap = response.data.reduce(
                    (map, shipSchedule) => ({ ...map, [shipSchedule.id]: [] }),
                    {}
                );
                setState((prev) => ({
                    ...prev,
                    shipSchedules: response.data,
                    deliveryOrder: { ...prev.deliveryOrder, shipScheduleContainerMap: newShipScheduleContainerMap },
                }));
            });
    };

    const updateState = (updates) => setState((prev) => ({ ...prev, ...updates }));
    const updateState1 = (updates) => setState1((prev) => ({ ...prev, ...updates }));

    const saveDeliveryOrder = () => {
        if (state.deliveryOrder.customerId && state.deliveryOrder.scheduleId) {
            const saveRequest = state.deliveryOrder.id
                ? axios.put(`https://auth.g42.biz/api/delivery-orders/${state.deliveryOrder.id}`, state.deliveryOrder)
                : axios.post(`https://auth.g42.biz/api/delivery-orders`, state.deliveryOrder);

            saveRequest.then((response) => {
                fetchData();
                updateState({ deliveryOrderDialog: false, deliveryOrder: emptyDeliveryOrder, shipSchedules: [], containers: [] });
                toast.current.show({
                    severity: "success",
                    summary: "Thành công",
                    detail: state.deliveryOrder.id ? "Lệnh giao hàng đã được cập nhật" : "Lệnh giao hàng đã được tạo",
                    life: 3000,
                });
            });
        }
    };

    const confirmToDelivery = () => {
        axios.put(`https://auth.g42.biz/api/delivery-orders/confirmToDelivery/${state1.deliveryOrder.id}`, state1.deliveryOrder).then(() => {
            updateState1({ deleteDeliveryOrderDialog: false, deliveryOrder: emptyDeliveryOrder, shipSchedules: [], containers: [] });
            fetchData();
            toast.current.show({
                severity: "success",
                summary: "Thành công",
                detail: "Xác nhận trang thái giao thành thành công",
                life: 3000,
            });
        });
    };

    // const onInputChange = (e, name) => {
    //     const val = (e.target && e.target.value) || "";
    //     updateState({
    //         deliveryOrder: { ...state.deliveryOrder, [name]: val },
    //     });
    // };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || "";
        let updatedOrder = { ...state.deliveryOrder, [name]: val };

        if (name === "deliveryDate" && updatedOrder.orderDate && new Date(val) <= new Date(updatedOrder.orderDate)) {
            updateState({
                errorMessage: "Ngày giao hàng phải lớn hơn ngày đặt hàng",
                deliveryOrder: { ...updatedOrder, deliveryDate: null },
            });
        } else if (name === "orderDate" && updatedOrder.deliveryDate && new Date(updatedOrder.deliveryDate) <= new Date(val)) {
            updateState({
                errorMessage: "Ngày giao hàng phải lớn hơn ngày đặt hàng",
                deliveryOrder: { ...updatedOrder, deliveryDate: null },
            });
        } else {
            updateState({
                errorMessage: null,
                deliveryOrder: updatedOrder,
            });
        }
    };

    const onDropdownChange = (e, name) => {
        updateState({
            deliveryOrder: { ...state.deliveryOrder, [name]: e.value.id },
        });
        if (name === "scheduleId") fetchShipSchedulesByScheduleId(e.value.id);
    };

    const onContainerCheckboxChange = (e, shipScheduleId, containerCode) => {
        if (!e.checked || !Object.values(state.deliveryOrder.shipScheduleContainerMap).flat().includes(containerCode)) {
            const newMap = { ...state.deliveryOrder.shipScheduleContainerMap };
            newMap[shipScheduleId] = e.checked
                ? [...newMap[shipScheduleId], containerCode]
                : newMap[shipScheduleId].filter((code) => code !== containerCode);

            updateState({ deliveryOrder: { ...state.deliveryOrder, shipScheduleContainerMap: newMap } });
        } else {
            toast.current.show({
                severity: "warn",
                summary: "Trùng container",
                detail: "Container bạn vừa chọn đã có trong một chuyến tàu khác",
                life: 3000,
            });
        }
    };

    const renderContainerAssignment = () => {
        return state.shipSchedules.map((shipSchedule) => {
            // Get the first port from the waypoints of the selected schedule
            const firstWaypoint = state.schedules.find(schedule => schedule.id === state.deliveryOrder.scheduleId)?.waypoints[0];

            // Precompute the filtered containers
            const inPortContainers = state.containers.filter(container => {
                // Ensure the container matches the customer, status, and port location
                return container.customer &&
                    container.customer.id === state.deliveryOrder.customerId &&
                    container.status === "In Port" &&
                    container.containerCode &&
                    container.portLocation.portName === firstWaypoint?.portName;
            });

            return (
                <div className="field" key={shipSchedule.id}>
                    <label htmlFor={`container_${shipSchedule.id}`}>
                        Xếp containers lên chặng {shipSchedule.id}
                    </label>
                    <List
                        height={150}
                        itemCount={inPortContainers.length} // Length of filtered containers
                        itemSize={35}
                        width={"100%"}
                    >
                        {({ index, style }) => {
                            const container = inPortContainers[index];

                            return (
                                <div style={style} key={container.containerCode}>
                                    <Checkbox
                                        inputId={`container_${container.containerCode}`}
                                        checked={state.deliveryOrder.shipScheduleContainerMap[shipSchedule.id]?.includes(container.containerCode)}
                                        onChange={(e) => onContainerCheckboxChange(e, shipSchedule.id, container.containerCode)}
                                    />
                                    <label htmlFor={`container_${container.containerCode}`}>
                                        {container.containerCode}
                                    </label>
                                </div>
                            );
                        }}
                    </List>
                </div>
            );
        });
    };



    const openDeliveryOrderDialog = () => {
        updateState({
            deliveryOrderDialog: true,
            deliveryOrder: emptyDeliveryOrder,
            shipSchedules: [],
            containers: [],
        });
        fetchContainers();
    };

    const renderContainers = (rowData) => {
        const containers = Object.values(rowData.shipScheduleContainerMap).flat();

        if (rowData.isPay === 2) {
            return (
                <Chip
                    label="Đã giao"
                    icon="pi pi-truck"
                    style={{ fontSize: '12px' }}
                />
            );
        } else {
            return containers.join(', ');
        }
    };

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar
                    className="mb-4"
                    left={() => (
                        <Button
                            label="Thêm"
                            icon="pi pi-plus"
                            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300
                                                                font-medium rounded-lg text-sm py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700
                                                                dark:focus:ring-gray-700 dark:border-gray-700"
                            onClick={openDeliveryOrderDialog}
                        />
                    )}
                    right={() => <Button label="Xuất" icon="pi pi-upload" onClick={() => dt.current.exportCSV()} outlined/>}
                />
                <DataTable
                    ref={dt}
                    value={state.deliveryOrders}
                    selection={state.selectedDeliveryOrders}
                    onSelectionChange={(e) => updateState({ selectedDeliveryOrders: e.value })}
                    dataKey="id"
                    paginator
                    showGridlines
                    className="custom-datatable"
                    rows={10}
                    globalFilter={state.globalFilter}
                    header={<div className="flex align-items-center justify-content-between"><h4 className="m-0">Quản lý lệnh giao hàng</h4><InputText type="search" onInput={(e) => updateState({ globalFilter: e.target.value })} placeholder="Tìm kiếm..." /></div>}
                >
                    <Column field="orderNumber" header="Mã đơn hàng"></Column>
                    <Column field="customerId" header="Tên khách hàng" body={(rowData) => state.customers.find((c) => c.id === rowData.customerId)?.username || "unknown"}></Column>
                    <Column field="scheduleId" header="Mã lịch trình" body={(rowData) => state.schedules.find((s) => s.id === rowData.scheduleId)?.codeSchedule || "unknown"}></Column>
                    <Column header="Ngày đặt hàng" body={(rowData) => new Date(rowData.orderDate).toLocaleString()}></Column>
                    <Column header="Ngày giao hàng" body={(rowData) => new Date(rowData.deliveryDate).toLocaleString()}></Column>
                    <Column field="totalAmount" header="Tổng tiền" body={(rowData) => rowData.totalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}></Column>
                    <Column field="status" header="Ghi chú" ></Column>
                    <Column header="Containers" body={renderContainers} />
                    <Column
                        header="Xác nhận đã giao"
                        body={(rowData) => (
                            <>
                                {rowData.isPay === 1 && (
                                    <>
                                        <Tag severity="contrast" value="Xác nhận"
                                        onClick={() => {
                                                updateState1({
                                                    deliveryOrder: { ...rowData },
                                                    shipSchedules: Object.keys(rowData.shipScheduleContainerMap).map((id) => ({
                                                        id: parseInt(id),
                                                        containers: rowData.shipScheduleContainerMap[id],
                                                    })),
                                                    deleteDeliveryOrderDialog: true,


                                                });
                                            }}
                                             >

                                        </Tag>
                                    </>
                                )  }

                                { rowData.isPay === 0 && (
                                    <>
                                        <Tag severity="danger" value="Đang chờ thanh toán"
                                             onClick={() => {
                                                 updateState({
                                                     deliveryOrder: { ...rowData },
                                                     deliveryOrderDialog: true,
                                                     shipSchedules: Object.keys(rowData.shipScheduleContainerMap).map((id) => ({
                                                         id: parseInt(id),
                                                         containers: rowData.shipScheduleContainerMap[id],
                                                     })),
                                                 });
                                             }}
                                        >

                                        </Tag>
                                    </>
                                )}

                                { rowData.isPay === 2 && (
                                    <>
                                        <Tag severity="success" value="Hoàn thành"></Tag>
                                    </>
                                )}

                            </>
                        )}
                        exportable={false}
                    />
                    {/*<Column*/}

                    {/*    body={(rowData) => (*/}
                    {/*        <>*/}
                    {/*            {rowData.isPay === 0 ? (*/}
                    {/*                <>*/}
                    {/*                    <i*/}
                    {/*                        className="pi pi-pencil"*/}
                    {/*                        style={{ fontSize: '1rem', marginRight: '10px', marginLeft: '10px' }}*/}
                    {/*                        onClick={() => {*/}
                    {/*                            updateState({*/}
                    {/*                                deliveryOrder: { ...rowData },*/}
                    {/*                                deliveryOrderDialog: true,*/}
                    {/*                                shipSchedules: Object.keys(rowData.shipScheduleContainerMap).map((id) => ({*/}
                    {/*                                    id: parseInt(id),*/}
                    {/*                                    containers: rowData.shipScheduleContainerMap[id],*/}
                    {/*                                })),*/}
                    {/*                            });*/}
                    {/*                        }}*/}
                    {/*                    />*/}

                    {/*                </>*/}
                    {/*            ) : rowData.isPay === 3 ? (*/}
                    {/*                <Chip*/}
                    {/*                    label="Đang giao"*/}
                    {/*                    icon="pi pi-truck"*/}
                    {/*                    style={{ fontSize: '12px' }}*/}
                    {/*                />*/}
                    {/*            ) : rowData.isPay === 3 ? (*/}
                    {/*                <Chip*/}
                    {/*                    label="Đã giao"*/}
                    {/*                    icon="pi pi-truck"*/}
                    {/*                    style={{ fontSize: '12px' }}*/}
                    {/*                />*/}
                    {/*            ) : null}*/}
                    {/*        </>*/}
                    {/*    )}*/}
                    {/*    exportable={false}*/}
                    {/*/>*/}


                </DataTable>
            </div>

            <Dialog visible={state.deliveryOrderDialog} style={{maxWidth: "450px", maxHeight:'600px'}} header="Chi tiết lệnh giao hàng" modal
                    className="p-fluid" footer={<><Button label="Cancel" icon="pi pi-times" outlined
                                                          onClick={() => updateState({
                                                              deliveryOrderDialog: false,
                                                              submitted: false
                                                          })}/><Button label="Save" icon="pi pi-check"
                                                                       onClick={saveDeliveryOrder}/></>}
                    onHide={() => updateState({deliveryOrderDialog: false, submitted: false})}>
                <div className="field">
                    <label htmlFor="orderNumber">Mã lệnh giao hàng</label>
                    <InputText id="orderNumber" keyfilter={/^[a-zA-Z0-9-_]+$/} value={state.deliveryOrder.orderNumber} onChange={(e) => onInputChange(e, "orderNumber")} />
                </div>
                <div className="field">
                    <label htmlFor="customer">Khách hàng</label>
                    <Dropdown
                        id="customer"
                        value={state.customers.find((customer) => customer.id === state.deliveryOrder.customerId)}
                        options={state.customers.filter((customer) => customer.roles.includes("CUSTOMER"))}
                        onChange={(e) => onDropdownChange(e, "customerId")}
                        optionLabel="name"
                        placeholder="Chọn khách hàng"
                    />
                </div>
                <div className="field">
                    <label htmlFor="schedule">Lịch trình</label>
                    <Dropdown id="schedule" value={state.schedules.find((schedule) => schedule.id === state.deliveryOrder.scheduleId) || null} options={state.schedules} onChange={(e) => onDropdownChange(e, "scheduleId")} optionLabel="codeSchedule" placeholder="Chọn lịch trình" />
                </div>
                <div className="field">
                    <label htmlFor="orderDate">Ngày đặt hàng</label>
                    <Calendar id="orderDate" value={state.deliveryOrder.orderDate ? new Date(state.deliveryOrder.orderDate) : null} onChange={(e) => onInputChange(e, "orderDate")} minDate={minOrderDate} dateFormat="dd/mm/yy" showButtonBar/>
                </div>
                <div className="field">
                    <label htmlFor="deliveryDate">Ngày giao hàng</label>
                    <Calendar id="deliveryDate" value={state.deliveryOrder.deliveryDate ? new Date(state.deliveryOrder.deliveryDate) : null} onChange={(e) => onInputChange(e, "deliveryDate")} minDate={minDeliveryDate} dateFormat="dd/mm/yy" showButtonBar />
                    {state.errorMessage && <small className="p-error">{state.errorMessage}</small>}
                </div>

                <div className="field">
                <label htmlFor="totalAmount">Tổng tiền</label>
                    <InputNumber
                        id="totalAmount"
                        value={state.deliveryOrder.totalAmount}
                        onValueChange={(e) => onInputChange(e, "totalAmount")}
                        mode="currency"
                        currency="VND"
                        locale="vi-VN"
                    />
                </div>
                <div className="field">
                    <label htmlFor="status">Ghi chú 1</label>
                    <InputText id="status" value={state.deliveryOrder.status} onChange={(e) => onInputChange(e, "status")} />
                </div>
                <div className="field">
                    <label htmlFor="notes">Ghi chú 2</label>
                    <InputText id="notes" value={state.deliveryOrder.notes} onChange={(e) => onInputChange(e, "notes")} />
                </div>
                {renderContainerAssignment()}
            </Dialog>

            <Dialog visible={state1.deleteDeliveryOrderDialog} style={{ width: "450px" }} header="Xác nhận" modal footer={<><Button label="Hủy" icon="pi pi-times" outlined onClick={() => updateState1({ deleteDeliveryOrderDialog: false ,submitted: false})} /><Button label="Xác nhận" icon="pi pi-check" severity="danger" onClick={confirmToDelivery} /></>} onHide={() => updateState1({ deleteDeliveryOrderDialog: false, submitted: false })}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
                    {state1.deliveryOrder && <span>Xác nhận đơn hàng {state1.deliveryOrder.orderNumber} đã được giao?</span>}
                </div>
            </Dialog>
        </div>
    );
};

export default DeliveryOrderTable;
