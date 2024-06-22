"use client"
import React, {useState} from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import CreateScheduleForm from "./CreateScheduleForm";



export default function CreateScheduleDrawer({fetchShips}) {
    const [visible, setVisible] = useState(false);



    return (
        <>
            <Sidebar visible={visible} onHide={() => setVisible(false)}>
                <h2>Thêm tàu</h2>
                <CreateScheduleForm fetchShips={fetchShips} />
            </Sidebar>


            <Button icon="pi pi-arrow-right" severity="help" label="Thêm mới" onClick={() => setVisible(true)} />
        </>
    )
}
