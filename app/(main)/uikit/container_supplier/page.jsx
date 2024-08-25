"use client";
import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { FileUpload } from 'primereact/fileupload';
import { Message } from 'primereact/message';
import axios from 'axios';
import { getContainers, uploadImage, updateSupplier, deleteSupplier } from '/app/api/container_supplier';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const ContainerRepairSupplierTable = () => {
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
    const [deleteSuppliersDialog, setDeleteSuppliersDialog] = useState(false);
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

    const hideDeleteSuppliersDialog = () => {
        setDeleteSuppliersDialog(false);
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
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Supplier Updated', life: 3000 });
                });
            } else {
                uploadImage(_supplier).then((response) => {
                    _suppliers.push(response.data);
                    setSuppliers(_suppliers);
                    setSupplierDialog(false);
                    setSupplier(emptySupplier);
                    fetchSuppliers()
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Supplier Created', life: 3000 });
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

    const confirmDeleteSelected = () => {
        setDeleteSuppliersDialog(true);
    };

    const deleteSupplier = () => {
        axios.delete(`https://auth.g42.biz/api/v1/supplier/${supplier.supplierId}`).then(() => {
            let _suppliers = suppliers.filter((val) => val.supplierId !== supplier.supplierId);
            setSuppliers(_suppliers);
            setDeleteSupplierDialog(false);
            setSupplier(emptySupplier);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Supplier Deleted', life: 3000 });
        });
    };

    const deleteSelectedSuppliers = () => {
        let _suppliers = suppliers.filter(val => !selectedSuppliers.includes(val));
        setSuppliers(_suppliers);
        setDeleteSuppliersDialog(false);
        setSelectedSuppliers(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Suppliers Deleted', life: 3000 });
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
        setSupplier(_supplier);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} text />
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedSuppliers || !selectedSuppliers.length} />
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
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
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editSupplier(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteSupplier(rowData)} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Container Repair Suppliers</h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const supplierDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveSupplier} />
        </React.Fragment>
    );

    const deleteSupplierDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteSupplierDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSupplier} />
        </React.Fragment>
    );

    const deleteSuppliersDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteSuppliersDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedSuppliers} />
        </React.Fragment>
    );

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
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} suppliers"
                    globalFilter={globalFilter}
                    header={header}
                    responsiveLayout="scroll"
                >
                    <Column selectionMode="multiple" exportable={false}></Column>
                    <Column field="name" header="Name" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column header="Image" body={imageBodyTemplate}></Column>
                    <Column field="detailService" header="Service Details" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="email" header="Email" sortable style={{ minWidth: '14rem' }}></Column>
                    <Column field="website" header="Website" sortable style={{ minWidth: '14rem' }}></Column>
                    <Column field="phoneNumber" header="Phone Number" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={supplierDialog} style={{ width: '450px' }} header="Supplier Details" modal className="p-fluid" footer={supplierDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="name">Name</label>
                    <InputText id="name" value={supplier.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !supplier.name })} />
                    {submitted && !supplier.name && <small className="p-error">Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="address">Address</label>
                    <InputText id="address" value={supplier.address} onChange={(e) => onInputChange(e, 'address')} required className={classNames({ 'p-invalid': submitted && !supplier.address })} />
                    {submitted && !supplier.address && <small className="p-error">Address is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="detailService">Service Details</label>
                    <InputTextarea id="detailService" value={supplier.detailService} onChange={(e) => onInputChange(e, 'detailService')} required rows={3} cols={20} className={classNames({ 'p-invalid': submitted && !supplier.detailService })} />
                    {submitted && !supplier.detailService && <small className="p-error">Service details are required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="email">Email</label>
                    <InputText id="email" value={supplier.email} onChange={(e) => onInputChange(e, 'email')} required className={classNames({ 'p-invalid': submitted && !supplier.email })} />
                    {submitted && !supplier.email && <small className="p-error">Email is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="website">Website</label>
                    <InputText id="website" value={supplier.website} onChange={(e) => onInputChange(e, 'website')} required className={classNames({ 'p-invalid': submitted && !supplier.website })} />
                    {submitted && !supplier.website && <small className="p-error">Website is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <InputText id="phoneNumber" value={supplier.phoneNumber} onChange={(e) => onInputChange(e, 'phoneNumber')} required className={classNames({ 'p-invalid': submitted && !supplier.phoneNumber })} />
                    {submitted && !supplier.phoneNumber && <small className="p-error">Phone number is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="image">Image</label>
                    <FileUpload name="image" accept="image/*" customUpload uploadHandler={(e) => onFileChange(e, 'image')} auto chooseLabel="Choose" mode="basic" />
                    {submitted && !supplier.image && <small className="p-error">Image is required.</small>}
                </div>
            </Dialog>

            <Dialog visible={deleteSupplierDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteSupplierDialogFooter} onHide={hideDeleteSupplierDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {supplier && (
                        <span>
                            Are you sure you want to delete <b>{supplier.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteSuppliersDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteSuppliersDialogFooter} onHide={hideDeleteSuppliersDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {supplier && <span>Are you sure you want to delete the selected suppliers?</span>}
                </div>
            </Dialog>
        </div>
    );
};

export default ContainerRepairSupplierTable;
