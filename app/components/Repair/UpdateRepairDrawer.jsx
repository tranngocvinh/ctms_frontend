import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import UpdateShipForm from './UpdateRepairForm';
import { Button } from 'primereact/button';
import UpdateRepairForm from "./UpdateRepairForm";

const UpdateRepairDrawer = ({ repair,fetchRepair }) => {
    const [visible, setVisible] = useState(false);




    return (
        <>
            <Button  severity="success" label="Cập nhật" onClick={() => setVisible(true)} />
            <Sidebar visible={visible} onHide={() => setVisible(false)} >
                <h2>Cập nhật thông tin sửa chữa container</h2>
                <UpdateRepairForm fetchRepair={fetchRepair} repair={repair}  />
            </Sidebar>
        </>
    );
};

export default UpdateRepairDrawer;
