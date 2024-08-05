import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import axios from 'axios';

import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';

export default function Table({ SI, fetchSI }) {
    const [selectedSI, setSelectedSI] = useState(null);
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [dropDate, setDropDate] = useState(null);
    const [dropLocation, setDropLocation] = useState(null);
    const [status] = useState('PENDING');
    const [detFee, setDetFee] = useState(0);
    const [ports, setPorts] = useState([]);

    useEffect(() => {
        fetchPorts();
    }, []);

    useEffect(() => {
        calculateDetFee();
    }, [dropDate]);

    const fetchPorts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/ports');
            setPorts(response.data);
        } catch (error) {
            console.error('Error fetching ports:', error);
        }
    };

    const calculateDetFee = () => {
        if (!selectedSI || !dropDate) return;
        const requestDate = new Date(selectedSI.requestTime);
        const selectedDropDate = new Date(dropDate);
        const diffDays = Math.floor((selectedDropDate - requestDate) / (1000 * 60 * 60 * 24));
        if (diffDays > 3) {
            setDetFee((diffDays - 3) * 100); // Example DET fee calculation
        } else {
            setDetFee(0);
        }
    };

    const showFormDialog = (si) => {
        setSelectedSI(si);
        setDropDate(null);
        setDropLocation(null);
        setIsDialogVisible(true);
    };

    const hideFormDialog = () => {
        setIsDialogVisible(false);
        setSelectedSI(null);
    };

    const submitDropOrder = async () => {
        const payload = {
            si: selectedSI.id,  // Use SI id
            dropDate: dropDate.toISOString(),
            dropLocation: dropLocation.portName,
            status
        };

        try {
            await axios.post('http://localhost:8080/api/drop-orders', payload);
            alert('Lệnh hạ hàng thành công');
            hideFormDialog();
            fetchSI(); // Refresh SI data after submitting
        } catch (error) {
            console.error('Error submitting drop order:', error);
            alert('Lệnh hạ hàng thất bại');
        }
    };

    const issueDropOrder = (rowData) => {
        return <Button icon="pi pi-check" text onClick={() => showFormDialog(rowData)}>Phát hành</Button>;
    };

    const dialogFooter = (
        <div>
            <Button label="Cancel" icon="pi pi-times" onClick={hideFormDialog} className="p-button-text" />
            <Button label="Submit" icon="pi pi-check" onClick={submitDropOrder} autoFocus />
        </div>
    );

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">Phát hành lệnh hạ hàng </span>
        </div>
    );

    const footer = `Có ${SI ? SI.length : 0} đơn SI cần được phát lệnh hạ hàng`;

    return (
        <div className="card">
            <DataTable value={SI} header={header} footer={footer} tableStyle={{ minWidth: '60rem' }}>
                <Column field="id" header="ID SI"></Column>
                <Column field="cargoTypeId" header="ID loại hàng"></Column>
                <Column field="cargoWeight" header="Trọng lượng hàng"></Column>
                <Column field="cargoVolume" header="Thể tích hàng"></Column>
                <Column header="Phát hành lệnh hạ hàng" body={issueDropOrder}></Column>
            </DataTable>

            <Dialog header="Phát hành lệnh hạ hàng" visible={isDialogVisible} style={{ width: '50vw' }} footer={dialogFooter} onHide={hideFormDialog}>
                {selectedSI && (
                    <div>
                        <h5>Thông tin chi tiết Container:</h5>
                        <p>ID SI: {selectedSI.id}</p>
                        <p>Loại hàng: {selectedSI.cargoTypeId}</p>
                        <p>Trọng lượng hàng: {selectedSI.cargoWeight} kg</p>
                        <p>Thể tích hàng: {selectedSI.cargoVolume} m³</p>
                        <p>Phí DET: {detFee} VND</p>

                        <h5>Thông tin lệnh hạ hàng:</h5>
                        <div className="p-field">
                            <label htmlFor="dropDate">Ngày hạ hàng</label>
                            <Calendar id="dropDate" value={dropDate} onChange={(e) => setDropDate(e.value)} showTime showSeconds />
                        </div>
                        <div className="p-field">
                            <label htmlFor="dropLocation">Địa điểm hạ hàng</label>
                            <Dropdown id="dropLocation" value={dropLocation} options={ports} onChange={(e) => setDropLocation(e.value)} optionLabel="portName" filter showClear filterBy="portName" placeholder="Chọn địa điểm hạ hàng" />
                        </div>
                    </div>
                )}
            </Dialog>
        </div>
    );
}
