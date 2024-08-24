"use client"
import React, {useState} from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import CreateShipForm from "./CreateShipForm";



export default function CreateShipDrawer({fetchShips, showToast}) {
    const [visible, setVisible] = useState(false);



    return (
        <>
            <Sidebar visible={visible} onHide={() => setVisible(false)}>
                <h2>Thêm tàu</h2>
                <CreateShipForm fetchShips={fetchShips} showToast={showToast} />
            </Sidebar>


            <Button icon="pi pi-arrow-right" severity="help" label="Thêm mới" onClick={() => setVisible(true)} />
        </>
    )
}
