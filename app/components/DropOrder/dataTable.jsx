import React, {useEffect, useMemo, useState} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import {Calendar} from 'primereact/calendar';
import {Dropdown} from 'primereact/dropdown';
import axios from 'axios';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import './droporder.css';
import {InputText} from "primereact/inputtext";

export default function DropOrderTable({SI, fetchSI, showToast}) {
    const [selectedSI, setSelectedSI] = useState(null);
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [dropDate, setDropDate] = useState(null);
    const [dropLocation, setDropLocation] = useState(null);
    const [status] = useState('PENDING');
    const [detFee, setDetFee] = useState(0);
    const [ports, setPorts] = useState([]);
    const [cargoTypes, setCargoTypes] = useState([]);
    const [dialogTitle, setDialogTitle] = useState('Phát hành lệnh hạ hàng');
    const [dropOrderId, setDropOrderId] = useState(null);
    const [buttonLabel, setButtonLabel] = useState('Phát hành');
    const [dropOrder, setDropOrder] = useState({});
    const [emptyContainer, setEmptyContainer] = useState({});
    const [searchType, setSearchType] = useState('dropOrderId');
    const [searchQuery, setSearchQuery] = useState('');
    const searchTypes = [
        { label: 'Mã lệnh', value: 'dropOrderId' }
    ];


    useEffect(() => {
        fetchPorts();
        fetchSIData();
        fetchCargoTypes(); // Fetch cargo types
    }, []);

    useEffect(() => {
        calculateDetFee();
    }, [dropDate]);
    const getAuthConfig = () => ({
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
        }
    })
    const fetchSIData = async () => {
        try {
            const response = await axios.get(`https://auth.g42.biz/api/drop-orders`, getAuthConfig());
            const dropOrderIdMap = {};
            response.data.forEach(si => {
                dropOrderIdMap[si.si] = si;
            });
            setDropOrder(dropOrderIdMap);
        } catch (error) {
            console.error('Error fetching SI data:', error);
        }
    };

    const getEmptyContainer = async (id) => {
        try {
            const response = await axios.get(
                `https://auth.g42.biz/api/containers/allocate/ship/${id}`
            )
            setEmptyContainer(response.data)
        } catch (e) {
            throw e;
        }
    }

    const fetchPorts = async () => {
        try {
            const response = await axios.get(`https://auth.g42.biz/api/ports`);
            setPorts(response.data);
        } catch (error) {
            console.error('Error fetching ports:', error);
        }
    };

    const fetchCargoTypes = async () => {
        try {
            const response = await axios.get(`https://auth.g42.biz/api/cargo-types`);
            setCargoTypes(response.data);
        } catch (error) {
            console.error('Error fetching cargo types:', error);
        }
    };

    const getCargoTypeName = (cargoTypeId) => {
        const cargoType = cargoTypes.find(type => type.id === cargoTypeId);
        return cargoType ? cargoType.name : 'Unknown';
    };

    const calculateDetFee = () => {
        console.log(selectedSI)
        const id = selectedSI?.emptyContainerId
        getEmptyContainer(id)
        if (!selectedSI || !dropDate) return;
        const requestDate = new Date(emptyContainer.requestTime);
        const selectedDropDate = new Date(dropDate);
        const diffDays = Math.floor((selectedDropDate - requestDate) / (1000 * 60 * 60 * 24));
        if (diffDays > 3) {
            const fee = (diffDays - 3) * 400000; // Example DET fee calculation
            setDetFee(fee.toLocaleString('en-US')); // Format the fee
        } else {
            setDetFee(0);
        }
    };


    const showFormDialog = async (si) => {
        setSelectedSI(si);
        setDropDate(null);
        setDropLocation(null);
        setDropOrderId(null);

        try {
            const response = await axios.get(`https://auth.g42.biz/api/drop-orders`, getAuthConfig());
            const existingOrder = response.data.find(order => order.si === si.id);

            if (existingOrder) {
                setDropDate(new Date(existingOrder.dropDate));
                setDropLocation(ports.find(port => port.portName === existingOrder.dropLocation));
                setDropOrderId(existingOrder.id);
                setDialogTitle('Chỉnh sửa lệnh hạ hàng');
                setButtonLabel('Chỉnh sửa');
            } else {
                setDialogTitle('Phát hành lệnh hạ hàng');
                setButtonLabel('Phát hành');
            }
        } catch (error) {

        }

        setIsDialogVisible(true);
    };

    const hideFormDialog = () => {
        setIsDialogVisible(false);
        setSelectedSI(null);
    };

    const submitDropOrder = async () => {
        const payload = {
            si: selectedSI.id,
            dropDate: dropDate.toISOString(),
            dropLocation: dropLocation.portName,
            status
        };

        try {
            if (dialogTitle === 'Chỉnh sửa lệnh hạ hàng') {
                await axios.put(`https://auth.g42.biz/api/drop-orders/${selectedSI.id}`, payload);
                showToast("success", "Thành công", "Chỉnh sửa lệnh hạ hàng thành công")
            } else {
                await axios.post(`https://auth.g42.biz/api/drop-orders`, payload);
                showToast("success", "Thành công", "Thêm lệnh hạ hàng thành công")
            }
            hideFormDialog();
            setTimeout(() => {
                fetchSI();
            }, 1000);
        } catch (error) {
            console.error('Error submitting drop order:', error);
            showToast("error", "Thất bại", "Thêm lệnh hạ hàng thất bại")
        }
    };

    const issueDropOrder = (rowData) => {
        return (
            <Button text onClick={() => showFormDialog(rowData)}>
                {dropOrder[rowData.id] ? '🔄️Chỉnh sửa' : '📤Phát hành'}
            </Button>
        );
    };

    const dialogFooter = (
        <div>
            <Button label="Cancel" icon="pi pi-times" onClick={hideFormDialog} className="p-button-text"/>
            <Button label={buttonLabel} icon="pi pi-check" onClick={submitDropOrder} autoFocus/>
        </div>
    );

    const filteredSIs = useMemo(() => {
        if (!searchQuery) return SI;

        return SI.filter((si) => {
            let fieldValue = '';

            switch (searchType) {
                case 'dropOrderId':
                    fieldValue = dropOrder[si.id]?.id || '';
                    break;
                default:
                    fieldValue = '';
            }

            return fieldValue.toString().toLowerCase().includes(searchQuery.toLowerCase());
        });
    }, [searchType, searchQuery, SI, dropOrder]);

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">Phát hành lệnh hạ hàng</span>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Dropdown
                    value={searchType}
                    options={searchTypes}
                    onChange={(e) => setSearchType(e.value)}
                    optionLabel="label"
                    placeholder="Chọn loại tìm kiếm"
                    style={{ width: '200px', marginRight: '10px' }}
                />
                <InputText
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm kiếm"
                    style={{ width: '300px' }}
                />
            </div>
        </div>
    );

    const cargoType = (rowData) => {
        return getCargoTypeName(rowData.cargoTypeId);
    };

    const cargoWeight = (rowData) => {
        return (<div style={{display: 'flex', alignItems: 'center'}}>
            <p>{rowData.cargoWeight.toLocaleString('en-US')}</p>
        </div>)
    }

    const cargoVolume = (rowData) => {
        return (
            <div style={{display: 'flex', alignItems: 'center'}}>
                <p>{rowData.cargoVolume.toLocaleString('en-US')}</p>
            </div>
        );
    }

    const footer = `Có ${SI ? SI.length : 0} đơn SI cần được phát lệnh hạ hàng`;

    return (
        <div className="card">
            <DataTable value={filteredSIs} header={header} footer={footer} tableStyle={{minWidth: '60rem'}} showGridlines
                       className="custom-datatable" paginator rows={20}>
                <Column header="Mã lệnh" body={(rowData) => dropOrder[rowData.id] ? dropOrder[rowData.id].id : 'Đang cập nhật...'}></Column>
                <Column header="Loaị hàng" body={cargoType}></Column>
                <Column field="cargoWeight" header="Trọng lượng hàng" body={cargoWeight}></Column>
                <Column field="cargoVolume" header="Thể tích hàng" body={cargoVolume}></Column>
                <Column header="Phát hành lệnh hạ hàng" body={issueDropOrder}></Column>
            </DataTable>

            <Dialog header={dialogTitle} visible={isDialogVisible} style={{width: '50vw'}} footer={dialogFooter}
                    onHide={hideFormDialog}>
                {selectedSI && (
                    <div>
                        <h5>Thông tin chi tiết Container:</h5>
                        <p><b>Loại hàng:</b> {getCargoTypeName(selectedSI.cargoTypeId)}</p>
                        <p><b>Trọng lượng hàng:</b> {selectedSI.cargoWeight.toLocaleString('en-US')} kg</p>
                        <p><b>Thể tích hàng:</b> {selectedSI.cargoVolume.toLocaleString('en-US')} m³</p>
                        <p><b>Phí DET:</b> {detFee} VND</p>

                        <div>
                            <h5>Thông tin lệnh hạ hàng:</h5>
                            <div style={{display: 'flex', flexDirection: 'column', marginBottom: '1rem'}}>
                                <label htmlFor="dropDate" style={{marginBottom: '0.5rem', fontWeight: 'bold'}}>Ngày hạ
                                    hàng</label>
                                <Calendar
                                    id="dropDate" value={dropDate} onChange={(e) => setDropDate(e.value)} showTime
                                    showSeconds
                                    style={{
                                        width: '100%',
                                        maxWidth: '300px'
                                    }}/>
                            </div>
                            <div style={{display: 'flex', flexDirection: 'column', marginBottom: '1rem'}}>
                                <label htmlFor="dropLocation" style={{marginBottom: '0.5rem', fontWeight: 'bold'}}>Địa
                                    điểm giao hàng</label>
                                <Dropdown
                                    id="dropLocation"
                                    value={dropLocation}
                                    options={ports}
                                    onChange={(e) => setDropLocation(e.value)}
                                    optionLabel="portName"
                                    filter
                                    showClear
                                    filterBy="portName"
                                    placeholder="Chọn địa điểm giao hàng"
                                    style={{width: '100%', maxWidth: '300px'}}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </Dialog>
        </div>
    );
}
