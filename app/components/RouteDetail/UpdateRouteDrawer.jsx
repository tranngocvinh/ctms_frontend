import React, {useState} from 'react';
import {Sidebar} from 'primereact/sidebar';
import UpdateShipForm from './UpdateRouteForm';
import {Button} from 'primereact/button';

const UpdateRouteDrawer = ({ ships,fetchShips }) => {
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

export default UpdateRouteDrawer;
