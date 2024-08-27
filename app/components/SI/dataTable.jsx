"use client"
import React, {useEffect, useRef, useState} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import {InputNumber} from 'primereact/inputnumber';
import {Dropdown} from 'primereact/dropdown';
import axios from 'axios';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'app/(main)/uikit/khaiBaoSI/khaibao.css';
import {Toast} from 'primereact/toast';

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

    const toast = useRef(null);

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

    const fetchContainerSize = async (containerCode) => {
        try {
            const response = await axios.get(`https://auth.g42.biz/api/containers/${containerCode}`);
            return response.data.containerSize;
        } catch (error) {
            console.error(`Error fetching container size for ${containerCode}:`, error);
            return null;
        }
    };

    const showDetails = async (si) => {
        const detailsWithSize = await Promise.all(si.details.map(async (detail) => {
            const containerSize = await fetchContainerSize(detail.containerCode);
            return { ...detail, containerSize };
        }));

        setSelectedSI({ ...si, details: detailsWithSize });
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
                toast.current.show({severity:'success', summary: 'Thành công', detail:'Khai báo SI thành công', life: 3000});
            } else if (dialogTitle === 'Chỉnh sửa SI') {
                await axios.put(`https://auth.g42.biz/api/si/${selectedSI.id}`, payload);
                toast.current.show({severity:'success', summary: 'Thành công', detail:'Cập nhật SI thành công', life: 3000});
            }
            hideFormDialog();
            fetchSIData(); // Refresh SI data after submitting
        } catch (error) {
            console.error('Error submitting SI:', error);
            toast.current.show({severity:'warn', summary: 'Thất bại', detail:'Khai báo SI thất bại', life: 3000});
        }
    };

    const emptyDetail = (rowData) => {
        return <i className="pi pi-eye" onClick={() => showDetails(rowData)} style={{fontSize: '1.2rem', marginRight: '10px', marginLeft: '10px'}}/>;
    };

    const si = (rowData) => {
        const existingSI = siData[rowData.id];
        return (
            <Button
                text
                onClick={() => showFormDialog(rowData) }
            >
                {existingSI ? '🔄️ Chỉnh sửa' : 'ℹ️ Khai báo'}
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
                    detail.containerSize ? (
                        <React.Fragment key={index}>
                            <li><p>Mã container:     {detail.containerCode}</p></li>
                            <li><p>Loại container:   {detail.containerSize.containerType.name} x {detail.containerSize.containerType.type}</p></li>
                            <li><p>Kích thước:       {detail.containerSize.length} m x {detail.containerSize.width} m x {detail.containerSize.height} m</p></li>
                            <li><p>Thể tích:         {detail.containerSize.volume} m³</p></li>
                            <li><p>Cân nặng:         {detail.containerSize.weight} tấn</p></li>
                            <li><p>Tải trọng:        {detail.containerSize.loadCapacity} tấn</p></li>
                            <li><p>Tải trọng tối đa: {detail.containerSize.maxLoad} tấn</p></li>
                        </React.Fragment>
                    ) : (
                        <li key={index}>Loading container size for {detail.containerCode}...</li>
                    )
                ))}
            </ul>
        );
    };


    return (
        <div className="card">
            <Toast ref={toast} />
            <DataTable value={SIs} header={header} footer={footer} tableStyle={{ minWidth: '60rem' }} className="custom-datatable" showGridlines paginator rows={20}>
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

            <Dialog header={dialogTitle} visible={isFormDialogVisible} style={{width: '16vw'}} footer={formDialogFooter}
                    onHide={hideFormDialog}>
                <div>
                    <h5>Thông tin SI</h5>
                    <div style={{display: 'flex', flexDirection: 'column', marginBottom: '1rem'}}>
                        <label htmlFor="cargoType" style={{marginBottom: '0.5rem', fontWeight: 'bold'}}>Loại hàng
                            hóa</label>
                        <Dropdown
                            id="cargoType"
                            value={selectedCargoType}
                            options={cargoTypes}
                            onChange={(e) => setSelectedCargoType(e.value)}
                            optionLabel="name"
                            placeholder="Chọn loại hàng hóa"
                            style={{width: '100%', maxWidth: '300px'}}
                        />
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', marginBottom: '1rem'}}>
                        <label htmlFor="cargoWeight" style={{marginBottom: '0.5rem', fontWeight: 'bold'}}>Trọng lượng
                            hàng hóa (tấn)</label>
                        <InputNumber
                            id="cargoWeight"
                            value={cargoWeight}
                            onValueChange={(e) => setCargoWeight(e.value)}
                            style={{width: '100%', maxWidth: '300px'}}
                        />
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', marginBottom: '1rem'}}>
                        <label htmlFor="cargoVolume" style={{marginBottom: '0.5rem', fontWeight: 'bold'}}>Thể tích hàng
                            hóa (m³)</label>
                        <InputNumber
                            id="cargoVolume"
                            value={cargoVolume}
                            onValueChange={(e) => setCargoVolume(e.value)}
                            style={{width: '100%', maxWidth: '300px'}} // Ensures the input number is the same width
                        />
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
