import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import UpdateContainerForm from './UpdateContainerForm';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import CreateContainerForm from "./CreateContainerForm";

const UpdateContainerDrawer = ({ container,fetchContainers }) => {
    const [visible, setVisible] = useState(false);




    return (
        <>
            <Button  style={{marginLeft:10}} severity="success" label="Báo hỏng" onClick={() => setVisible(true)} />

            <Dialog header="Thông tin sưar chữa container" visible={visible} style={{ width: '50vw' }} onHide={() => {if (!visible) return; setVisible(false); }}>
                <UpdateContainerForm fetchContainers={fetchContainers} container={container}  />
            </Dialog>
        </>
    );
};

export default UpdateContainerDrawer;
