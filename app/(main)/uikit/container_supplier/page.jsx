/* eslint react-hooks/rules-of-hooks: 0 */
"use client";
import React, {useEffect, useRef, useState} from 'react';
import {classNames} from 'primereact/utils';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Toast} from 'primereact/toast';
import {Button} from 'primereact/button';
import {Toolbar} from 'primereact/toolbar';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import {InputTextarea} from 'primereact/inputtextarea';
import {FileUpload} from 'primereact/fileupload';
import axios from 'axios';
import {getContainers, updateSupplier, uploadImage} from '/app/api/container_supplier';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './supplier.css'

import ErrorGlobal from "../../../components/error_message_global";
import {ButtonGroup} from "@mui/material";
import {isAdmin} from "../../../verifyRole";

const {
    blankError,
} = ErrorGlobal;

const ContainerRepairSupplierTable = () => {
    const jwtToken = localStorage.getItem('jwtToken');
    const authToken = localStorage.getItem('authToken');
    if(!isAdmin(jwtToken, authToken)) {
        return <p>Trang này không tồn tại</p>;
    }
    let emptySupplier = {
        supplierId: null,
        name: '',
        address: '',
        detailService: '',
        email: '',
        website: '',
        phoneNumber: '',
        image: null,
    };

    const [suppliers, setSuppliers] = useState([]);
    const [supplierDialog, setSupplierDialog] = useState(false);
    const [deleteSupplierDialog, setDeleteSupplierDialog] = useState(false);
    const [supplier, setSupplier] = useState(emptySupplier);
    const [selectedSuppliers, setSelectedSuppliers] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        fetchSuppliers();
    }, []);

    const fetchSuppliers = () => {
        getContainers().then((response) => setSuppliers(response.data));
    };

    const openNew = () => {
        setSupplier(emptySupplier);
        setSubmitted(false);
        setSupplierDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setSupplierDialog(false);
    };

    const hideDeleteSupplierDialog = () => {
        setDeleteSupplierDialog(false);
    };


    const saveSupplier = () => {
        setSubmitted(true);

        if (supplier.name.trim()) {
            let _suppliers = [...suppliers];
            let _supplier = { ...supplier };

            if (supplier.supplierId) {
                updateSupplier(supplier.supplierId, _supplier, supplier.image).then((response) => {
                    const index = findIndexById(supplier.supplierId);
                    _suppliers[index] = response.data;
                    setSuppliers(_suppliers);
                    setSupplierDialog(false);
                    setSupplier(emptySupplier);
                    fetchSuppliers()
                    toast.current.show({ severity: 'success', summary: 'Thành công', detail: 'Đơn vị đã được cập nhật', life: 3000 });
                });
            } else {
                uploadImage(_supplier).then((response) => {
                    _suppliers.push(response.data);
                    setSuppliers(_suppliers);
                    setSupplierDialog(false);
                    setSupplier(emptySupplier);
                    fetchSuppliers()
                    toast.current.show({ severity: 'success', summary: 'Thành công', detail: 'Đơn vị mới đã được thêm', life: 3000 });
                });
            }
        }
    };

    const editSupplier = (supplier) => {
        setSupplier({ ...supplier });
        setSupplierDialog(true);
    };

    const confirmDeleteSupplier = (supplier) => {
        setSupplier(supplier);
        setDeleteSupplierDialog(true);
    };
    const getAuthConfig = () => ({
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
    });

    const deleteSupplier = () => {
        axios.delete(`https://auth.g42.biz/api/v1/supplier/${supplier.supplierId}`,getAuthConfig()).then(() => {
            let _suppliers = suppliers.filter((val) => val.supplierId !== supplier.supplierId);
            setSuppliers(_suppliers);
            setDeleteSupplierDialog(false);
            setSupplier(emptySupplier);
            toast.current.show({ severity: 'success', summary: 'Thành công', detail: 'Đơn vị đã được xóa', life: 3000 });
        });
    };


    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < suppliers.length; i++) {
            if (suppliers[i].supplierId === id) {
                index = i;
                break;
            }
        }
        return index;
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _supplier = { ...supplier };
        _supplier[`${name}`] = val;
        setSupplier(_supplier);
    };
    const onFileChange = (e, name) => {
        const file = e.files[0];
        let _supplier = { ...supplier };
        _supplier[`${name}`] = file;
        if (file) {
            _supplier.imagePreview = URL.createObjectURL(file);
        } else {
            _supplier.imagePreview = null;
        }
        setSupplier(_supplier);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Thêm mới" icon="pi pi-plus" onClick={openNew} className="text-white bg-gray-800
            hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium
            rounded-lg text-sm py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" />
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <Button label="Xuất" icon="pi pi-upload" onClick={exportCSV} outlined/>
        );
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const imageBodyTemplate = (rowData) => {
        return <img src={`https://auth.g42.biz/api/v1/supplier/${rowData.supplierId}`} alt="supplier" className="w-6rem shadow-2 border-round" />;
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <i className="pi pi-pencil" style={{fontSize: '1rem', marginRight: '10px', marginLeft: '10px'}}
                   onClick={() => editSupplier(rowData)}/>
                <i className="pi pi-trash" style={{fontSize: '1rem'}} onClick={() => confirmDeleteSupplier(rowData)}/>
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Đơn vị sửa chữa container</h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Tìm kiếm" />
            </span>
        </div>
    );

    const supplierDialogFooter = (
        <React.Fragment>
            <ButtonGroup>
                <Button arial-label="Lưu" icon="pi pi-check" onClick={saveSupplier} severity="success" style={{marginRight: '20px'}} text/>
                <Button arial-="Hủy" icon="pi pi-times"  onClick={hideDialog} text severity="danger"/>
            </ButtonGroup>
        </React.Fragment>
    );

    const deleteSupplierDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteSupplierDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSupplier} />
        </React.Fragment>
    );
    const chooseOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-choose-btn p-button-outlined p-button-secondary'};
    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable
                    ref={dt}
                    value={suppliers}
                    selection={selectedSuppliers}
                    onSelectionChange={(e) => setSelectedSuppliers(e.value)}
                    dataKey="supplierId"
                    paginator
                    showGridlines
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Danh sách từ {first} tới {last} trên tổng số {totalRecords} nhà cung cấp"
                    globalFilter={globalFilter}
                    header={header}
                    className="custom-datatable"
                >
                    <Column field="name" header="Tên công ty" style={{ minWidth: '12rem' }}></Column>
                    <Column header="Logo" body={imageBodyTemplate}></Column>
                    <Column field="detailService" header="Chi tiết" style={{ minWidth: '16rem' }}></Column>
                    <Column field="email" header="Email" style={{ minWidth: '14rem' }}></Column>
                    <Column field="website" header="Website"  style={{ minWidth: '14rem' }}></Column>
                    <Column field="phoneNumber" header="Điện thoại"  style={{ minWidth: '12rem' }}></Column>
                    <Column header="Thao tác" body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={supplierDialog} style={{ width: '450px' }} header="Thêm mới" modal className="p-fluid" footer={supplierDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="name">Tên công ty</label>
                    <InputText id="name" value={supplier.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !supplier.name })} />
                    {submitted && !supplier.name && <small className="p-error">{blankError}</small>}
                </div>
                <div className="field">
                    <label htmlFor="address">Địa chỉ</label>
                    <InputText id="address" value={supplier.address} onChange={(e) => onInputChange(e, 'address')} required className={classNames({ 'p-invalid': submitted && !supplier.address })} />
                    {submitted && !supplier.address && <small className="p-error">{blankError}</small>}
                </div>
                <div className="field">
                    <label htmlFor="detailService">Chi tiết dịch vụ</label>
                    <InputTextarea id="detailService" value={supplier.detailService} onChange={(e) => onInputChange(e, 'detailService')} required rows={3} cols={20} className={classNames({ 'p-invalid': submitted && !supplier.detailService })} />
                    {submitted && !supplier.detailService && <small className="p-error">{blankError}</small>}
                </div>
                <div className="field">
                    <label htmlFor="email">Email</label>
                    <InputText id="email" keyfilter="email" value={supplier.email} onChange={(e) => onInputChange(e, 'email')} required className={classNames({ 'p-invalid': submitted && !supplier.email })} />
                    {submitted && !supplier.email && <small className="p-error">{blankError}</small>}
                </div>
                <div className="field">
                    <label htmlFor="website">Website</label>
                    <InputText id="website" value={supplier.website} onChange={(e) => onInputChange(e, 'website')} required className={classNames({ 'p-invalid': submitted && !supplier.website })} />
                    {submitted && !supplier.website && <small className="p-error">{blankError}</small>}
                </div>
                <div className="field">
                    <label htmlFor="phoneNumber">Điện thoại</label>
                    <InputText id="phoneNumber" keyfilter="num" value={supplier.phoneNumber} onChange={(e) => onInputChange(e, 'phoneNumber')} required className={classNames({ 'p-invalid': submitted && !supplier.phoneNumber })} />
                    {submitted && !supplier.phoneNumber && <small className="p-error">{blankError}</small>}
                </div>
                <div className="field">
                    <label htmlFor="image">Chọn ảnh</label>
                    <FileUpload name="image" accept="image/*" customUpload uploadHandler={(e) => onFileChange(e, 'image')} auto chooseLabel="" chooseOptions={chooseOptions} mode="basic" className="up-anh"/>
                    {submitted && !supplier.image && <small className="p-error">{blankError}</small>}
                    {supplier.imagePreview && (
                        <div className="image-preview">
                            <img src={supplier.imagePreview} alt="Selected" className="w-full h-auto border-round" /><br/>
                        </div>


                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteSupplierDialog} style={{ width: '450px' }} header="Xác nhận" modal footer={deleteSupplierDialogFooter} onHide={hideDeleteSupplierDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {supplier && (
                        <span>
                            Bạn có chắc chắn muốn xóa <b>{supplier.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

        </div>
    );
};

export default ContainerRepairSupplierTable;
