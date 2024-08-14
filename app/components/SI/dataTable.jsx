"use client"
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import axios from 'axios';

import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import './custom_si_style.css';
export default function Table({ SIs }) {
    const [selectedSI, setSelectedSI] = useState(null);
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [isFormDialogVisible, setIsFormDialogVisible] = useState(false);
    const [cargoWeight, setCargoWeight] = useState(0);
    const [cargoVolume, setCargoVolume] = useState(0);
    const [selectedCargoType, setSelectedCargoType] = useState(null);
    const [cargoTypes, setCargoTypes] = useState([]);
    const [siData, setSiData] = useState({});
    const [dialogTitle, setDialogTitle] = useState(''); // New state for dialog title

    useEffect(() => {
        fetchCargoTypes();
        fetchSIData();
    }, []);

    const fetchCargoTypes = async () => {
        try {
            const response = await axios.get(`https://auth.g42.biz/api/si/cargo`);
            setCargoTypes(response.data);
        } catch (error) {
            console.error('Error fetching cargo types:', error);
        }
    };

    const fetchSIData = async () => {
        try {
            const response = await axios.get(`https://auth.g42.biz/api/si`);
            const siDataMap = {};
            response.data.forEach(si => {
                siDataMap[si.emptyContainerId] = si;
            });
            setSiData(siDataMap);
        } catch (error) {
            console.error('Error fetching SI data:', error);
        }
    };

    const showDetails = (si) => {
        setSelectedSI(si);
        setIsDialogVisible(true);
    };

    const showFormDialog = (si) => {
        setSelectedSI(si);
        const existingSI = siData[si.id];
        if (existingSI) {
            setCargoWeight(existingSI.cargoWeight);
            setCargoVolume(existingSI.cargoVolume);
            setSelectedCargoType(cargoTypes.find(type => type.id === existingSI.cargoTypeId));
            setDialogTitle('Chỉnh sửa SI');
        } else {
            setCargoWeight(0);
            setCargoVolume(0);
            setSelectedCargoType(null);
            setDialogTitle('Khai báo SI');
        }
        setIsFormDialogVisible(true);
    };

    const hideDialog = () => {
        setIsDialogVisible(false);
        setSelectedSI(null);
    };

    const hideFormDialog = () => {
        setIsFormDialogVisible(false);
        setSelectedSI(null);
    };

    const submitSI = async () => {
        const payload = {
            emptyContainerId: selectedSI.id,
            cargoTypeId: selectedCargoType.id,
            cargoWeight,
            cargoVolume
        };

        try {
            if (dialogTitle === 'Khai báo SI') {
                await axios.post(`https://auth.g42.biz/api/si`, payload);
                alert('Khai báo SI thành công');
            } else if (dialogTitle === 'Chỉnh sửa SI') {
                await axios.put(`https://auth.g42.biz/api/si/${selectedSI.id}`, payload);
                alert('Cập nhật SI thành công');
            }
            hideFormDialog();
            fetchSIData(); // Refresh SI data after submitting
        } catch (error) {
            console.error('Error submitting SI:', error);
            alert('Khai báo/Cập nhật SI thất bại');
        }
    };

    const emptyDetail = (rowData) => {
        return <Button text onClick={() => showDetails(rowData)}>👁️Xem chi tiết</Button>;
    };

    const si = (rowData) => {
        const existingSI = siData[rowData.id];
        return (
            <Button

                text
                onClick={() => showFormDialog(rowData) }
            >
                {existingSI ? '🔄️Chỉnh sửa' : 'ℹ️Khai báo'}
            </Button>
        );
    };

    const dialogFooter = (
        <Button label="Close" icon="pi pi-times" onClick={hideDialog} className="p-button-text" />
    );

    const formDialogFooter = (
        <div>
            <Button label="Cancel" icon="pi pi-times" onClick={hideFormDialog} className="p-button-text" />
            <Button label="Submit" icon="pi pi-check" onClick={submitSI} autoFocus />
        </div>
    );

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">Khai báo SI</span>
        </div>
    );

    const footer = `Có ${SIs ? SIs.length : 0} lệnh cấp rỗng cần được khai báo SI`;

    const renderDetails = (details) => {
        return (
            <ul>
                {details.map((detail, index) => (
                    <li key={index}>
                        <p>Loại container: <span>{detail.containerSize.containerType.name} x {detail.containerSize.containerType.type}</span></p>
                        <p>Kích thước: <span>{detail.containerSize.length}m x {detail.containerSize.width}m x {detail.containerSize.height}m</span></p>
                        <p>Thể tích: <span>{detail.containerSize.volume}m³</span></p>
                        <p>Cân nặng: <span>{detail.containerSize.weight}kg</span></p>
                        <p>Tải trọng: <span>{detail.containerSize.loadCapacity}kg</span></p>
                        <p>Tải trọng tối đa: <span>{detail.containerSize.maxLoad}kg</span></p>
                        <p>Số lượng: <span>{detail.quantity}</span></p>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="card">
            <DataTable value={SIs} header={header} footer={footer} tableStyle={{ minWidth: '60rem' }}>
                <Column field="customer.username" header="Tài khoản cấp rỗng"></Column>
                <Column field="portLocation.portName" header="Tên cảng"></Column>
                <Column field="ship.registrationNumber" header="Tên tàu"></Column>
                <Column header="Thông tin container" body={emptyDetail}></Column>
                <Column header="Khai báo SI" body={si}></Column>
            </DataTable>

            <Dialog header="Chi tiết Container" visible={isDialogVisible} style={{ width: '50vw' }} footer={dialogFooter} onHide={hideDialog}>
                {selectedSI && (
                    <div>
                        <h5>Thông tin chi tiết:</h5>
                        {renderDetails(selectedSI.details)}
                    </div>
                )}
            </Dialog>

            <Dialog header={dialogTitle} visible={isFormDialogVisible} style={{ width: '50vw' }} footer={formDialogFooter} onHide={hideFormDialog}>
                <div>
                    <h5>Thông tin SI</h5>
                    <div className="p-field">
                        <label htmlFor="cargoType">Loại hàng hóa</label>
                        <Dropdown id="cargoType" value={selectedCargoType} options={cargoTypes} onChange={(e) => setSelectedCargoType(e.value)} optionLabel="name" placeholder="Chọn loại hàng hóa" />
                    </div>
                    <div className="p-field">
                        <label htmlFor="cargoWeight">Trọng lượng hàng hóa (kg)</label>
                        <InputNumber id="cargoWeight" value={cargoWeight} onValueChange={(e) => setCargoWeight(e.value)} />
                    </div>
                    <div className="p-field">
                        <label htmlFor="cargoVolume">Thể tích hàng hóa (m³)</label>
                        <InputNumber id="cargoVolume" value={cargoVolume} onValueChange={(e) => setCargoVolume(e.value)} />
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
