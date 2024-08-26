import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import UpdateCustomerForm from './UpdateContainerForm';
import { Button } from 'primereact/button';

const UpdateContainerDrawer = ({ container,fetchContainers, showToast }) => {
    const [visible, setVisible] = useState(false);




    return (
        <>
            <i className="pi pi-pencil" style={{fontSize: '1rem', marginRight: '10px', marginLeft: '10px'}}
               onClick={() => setVisible(true)}/>
            <Sidebar visible={visible} onHide={() => setVisible(false)}>
                <h2>Cập nhật container</h2>
                <UpdateCustomerForm fetchContainers={fetchContainers} container={container} showToast={showToast}/>
            </Sidebar>
        </>
    );
};

export default UpdateContainerDrawer;
