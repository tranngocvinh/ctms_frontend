import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import UpdateShipForm from './UpdateScheduleForm';
import { Button } from 'primereact/button';

const UpdateScheduleDrawer = ({ ships,fetchShips }) => {
    const [visible, setVisible] = useState(false);




    return (
        <>
            <Button  severity="success" label="Sửa" onClick={() => setVisible(true)} />
            <Sidebar visible={visible} onHide={() => setVisible(false)} >
                <h2>Cập nhật tàu</h2>
                <UpdateShipForm fetchShips={fetchShips} ships={ships}  />
            </Sidebar>
        </>
    );
};

export default UpdateScheduleDrawer;
