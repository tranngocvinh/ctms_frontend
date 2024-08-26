"use client"
import React, {useState} from 'react';
import {Sidebar} from 'primereact/sidebar';
import {Button} from 'primereact/button';
import CreateShipForm from "./CreateShipForm";
import './custom_ship.css';


export default function CreateShipDrawer({fetchShips, showToast}) {
    const [visible, setVisible] = useState(false);



    return (
        <>
            <Sidebar visible={visible} onHide={() => setVisible(false)}>
                <h2>Thêm tàu</h2>
                <CreateShipForm fetchShips={fetchShips} showToast={showToast} />
            </Sidebar>


            <Button icon="pi pi-arrow-right" className="text-white bg-gray-800
            hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium
            rounded-lg text-sm py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" severity="help" label="Thêm mới" onClick={() => setVisible(true)} />
        </>
    )
}
