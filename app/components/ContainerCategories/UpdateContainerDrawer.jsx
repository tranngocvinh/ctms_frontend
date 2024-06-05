import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import UpdateCustomerForm from './UpdateContainerForm';
import { Button } from 'primereact/button';

const UpdateContainerDrawer = ({ container,fetchContainers }) => {
    const [visible, setVisible] = useState(false);




    return (
        <>
            <Button  severity="success" label="Sửa" onClick={() => setVisible(true)} />
            <Sidebar visible={visible} onHide={() => setVisible(false)} >
                <h2>Cập nhật container</h2>
                <UpdateCustomerForm fetchContainers={fetchContainers} container={container}  />
            </Sidebar>
        </>
    );
};

export default UpdateContainerDrawer;
