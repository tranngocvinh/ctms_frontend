import React, {useState} from 'react';
import UpdateContainerForm from './UpdateContainerForm';
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';

const UpdateContainerDrawer = ({ container,fetchContainers }) => {
    const [visible, setVisible] = useState(false);




    return (
        <>
            <i className="pi pi-exclamation-triangle" style={{fontSize: '1.2rem', marginRight: '10px', marginLeft: '10px'}}
               onClick={() => setVisible(true)}/>
            <Dialog header="Thông tin sửa chữa container" visible={visible} style={{width: '50vw'}} onHide={() => {
                if (!visible) return;
                setVisible(false);
            }}>
                <UpdateContainerForm fetchContainers={fetchContainers} container={container}/>
            </Dialog>
        </>
    );
};

export default UpdateContainerDrawer;
