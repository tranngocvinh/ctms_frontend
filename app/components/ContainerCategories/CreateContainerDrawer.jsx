"use client"
import React, {useState} from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import CreateContainerForm from "./CreateContainerForm";



export default function CreateContainerDrawer({fetchContainers}) {
    const [visible, setVisible] = useState(false);



    return (
        <>
            <Sidebar visible={visible} onHide={() => setVisible(false)}>
                <h2>Thêm container</h2>
                <CreateContainerForm fetchContainers={fetchContainers} />
            </Sidebar>


            <Button icon="pi pi-arrow-right" severity="help" label="Thêm mới" onClick={() => setVisible(true)} />
        </>
    )
}
