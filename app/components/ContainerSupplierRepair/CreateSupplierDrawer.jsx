"use client"
import React, {useState} from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import CreateSupplierForm from "./CreateSupplierForm";



export default function CreateSupplierDrawer({fetchContainers}) {
    const [visible, setVisible] = useState(false);



    return (
        <>
            <Sidebar visible={visible} onHide={() => setVisible(false)}>
                <h2>Đăng ký hãng sửa container</h2>
                <CreateSupplierForm fetchContainers={fetchContainers} />
            </Sidebar>


            <Button icon="pi pi-arrow-right" severity="help" label="Thêm mới" onClick={() => setVisible(true)} />
        </>
    )
}
