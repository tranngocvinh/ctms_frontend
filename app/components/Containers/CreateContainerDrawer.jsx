"use client"
import React, {useState} from 'react';
import {Button} from 'primereact/button';
import CreateContainerForm from "./CreateContainerForm";
import {Dialog} from 'primereact/dialog';


export default function CreateContainerDrawer({fetchContainers,showToast}) {
    const [visible, setVisible] = useState(false);




    return (
        <>

            <Dialog header="Thêm trạng thái container" visible={visible} style={{ width: '50vw' }} onHide={() => {if (!visible) return; setVisible(false); }}>
                <CreateContainerForm fetchContainers={fetchContainers} showToast={showToast} />
            </Dialog>
            <Button icon="pi pi-arrow-right" severity="help" label="Thêm mới" onClick={() => setVisible(true)} />

        </>
    )
}
