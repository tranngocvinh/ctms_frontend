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
            <Button icon="pi pi-plus" severity="help" label="Thêm mới" onClick={() => setVisible(true)} className="text-white bg-gray-800
            hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium
            rounded-lg text-sm py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"/>

        </>
    )
}
