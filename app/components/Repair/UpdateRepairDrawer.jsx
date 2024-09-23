import React, {useState} from 'react';
import {Sidebar} from 'primereact/sidebar';
import UpdateRepairForm from './UpdateRepairForm';
import {Button} from 'primereact/button';

const UpdateRepairDrawer = ({ repair,fetchRepair }) => {
    const [visible, setVisible] = useState(false);




    return (
        <>
            <i className="pi pi-pencil" style={{fontSize: '1rem', marginRight: '10px', marginLeft: '10px'}}
               onClick={() => setVisible(true)}/>
            <Sidebar visible={visible} onHide={() => setVisible(false)} >
                <h2>Cập nhật thông tin sửa chữa container</h2>
                <UpdateRepairForm fetchRepair={fetchRepair} repair={repair}  />
            </Sidebar>
        </>
    );
};

export default UpdateRepairDrawer;
