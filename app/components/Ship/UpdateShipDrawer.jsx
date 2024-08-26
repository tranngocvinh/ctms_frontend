import React, {useState} from 'react';
import {Sidebar} from 'primereact/sidebar';
import UpdateShipForm from './UpdateShipForm';
import 'primeicons/primeicons.css';
import './custom_ship.css';

const UpdateShipDrawer = ({ ships,fetchShips, showToast }) => {
    const [visible, setVisible] = useState(false);




    return (
        <>

            {/*<Button icon="pi pi-pencil" style={{color: 'green'}} onClick={() => setVisible(true)} outlined/>*/}
            <i className="pi pi-pencil" style={{fontSize: '1rem', marginRight: '10px', marginLeft:'10px'}} onClick={() => setVisible(true)}/>

            <Sidebar visible={visible} onHide={() => setVisible(false)}>
                <h2>Cập nhật tàu</h2>
                <UpdateShipForm fetchShips={fetchShips} ships={ships} showToast={showToast}/>
            </Sidebar>
        </>
    );
};

export default UpdateShipDrawer;
