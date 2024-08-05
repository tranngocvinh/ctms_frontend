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
            <Button  severity="success" label="Sửa" onClick={() => setVisible(true)} />

            <Dialog header="Cập nhật container" visible={visible} style={{ width: '50vw' }} onHide={() => {if (!visible) return; setVisible(false); }}>
                <UpdateContainerForm fetchContainers={fetchContainers} container={container}  />
            </Dialog>
        </>
    );
};

export default UpdateContainerDrawer;
