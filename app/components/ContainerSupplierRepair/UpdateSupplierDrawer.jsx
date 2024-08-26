import React, {useState} from 'react';
import {Sidebar} from 'primereact/sidebar';
import UpdateSupplierForm from './UpdateSupplierForm';
import {Button} from 'primereact/button';

const UpdateSupplierDrawer = ({ container,fetchContainers }) => {
    const [visible, setVisible] = useState(false);




    return (
        <>
            <Button  severity="success" label="Sửa" onClick={() => setVisible(true)} />
            <Sidebar visible={visible} onHide={() => setVisible(false)} >
                <h2>Cập nhật hãng sửa container</h2>
                <UpdateSupplierForm fetchContainers={fetchContainers} container={container}  />
            </Sidebar>
        </>
    );
};

export default UpdateSupplierDrawer;
