import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import UpdateSupplierDrawer from "./UpdateSupplierDrawer";
import CreateSupplierDrawer from "./CreateSupplierDrawer";

import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import ConfirmDelete from "./DeleteSupplier";
import Delete from "./DeleteSupplier";

export default function Table({ containers, fetchContainers }) {

    const PhoneBodyTemplate = (rowData) => {
        return (
            <Tag value={rowData.phoneNumber} severity="success"></Tag>
        );
    };

    const ActionButtons = (rowData) => {
        return (
            <div className="flex flex-wrap justify-content-center gap-1">
                <UpdateSupplierDrawer
                    container={rowData} fetchContainers={fetchContainers} label="Sửa" severity="info"
                />
                <Delete container={rowData} fetchContainers={fetchContainers}/>
            </div>
        );
    };

    const imageBodyTemplate = (rowData) => {
        return <img src={`http://auth.g42.biz/api/v1/suplier/${rowData.supplierId}`} className="w-6rem shadow-2 border-round" alt="supplier" />;
    };

    const linkTemplate = (rowData) => {
        return <a href={rowData.website} className="text-ellipsis">{rowData.website}</a>;
    };

    const detailServiceTemplate = (rowData) => {
        return (
            <div style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', wordBreak: 'break-word' }}>
                {rowData.detailService}
            </div>
        );
    };

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">Hãng sửa chữa Container</span>
            <CreateSupplierDrawer fetchContainers={fetchContainers} />
        </div>
    );

    const footer = `Có ${containers ? containers.length : 0} công ty sửa chữa container.`;

    return (
        <div className="card">
            <DataTable value={containers} header={header} footer={footer} tableStyle={{ minWidth: '60rem' }}>
                <Column field="name" header="Tên"></Column>
                <Column header="Ảnh" body={imageBodyTemplate}></Column>
                <Column field="detailService" header="Dịch vụ" body={detailServiceTemplate}></Column>
                <Column field="email" header="Email"></Column>
                <Column field="website" header="Website" body={linkTemplate}></Column>
                <Column field="phoneNumber" header="Số điện thoại" body={PhoneBodyTemplate}></Column>
                <Column header="Thao tác" body={ActionButtons}></Column>
            </DataTable>
        </div>
    );
}
