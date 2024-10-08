import React, {useRef, useState} from 'react';
import {ConfirmDialog} from 'primereact/confirmdialog';
import {Toast} from 'primereact/toast';
import {Button} from 'primereact/button';
import {repairFinish} from "../../api/repair";

export default function Delete({ repair, fetchRepair }) {
    const [visible, setVisible] = useState(false);
    const toast = useRef(null);

    const accept = () => {

        repairFinish(repair.id)  // Ensure this is the correct ID field
            .then(res => {
                toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
                fetchRepair();
            })
            .catch(err => {
                toast.current.show({ severity: 'warn', summary: 'Error', detail: 'Deletion failed', life: 3000 });
            });
    };

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    };

    return (
        <>
            <Toast ref={toast}/>
            <ConfirmDialog
                visible={visible}
                onHide={() => setVisible(false)}
                message="Bạn có chắc chắn rằng container đã được sửa xong ?"
                header="Xác nhận container đã được sửa xong ?"
                icon="pi pi-exclamation-triangle"
                accept={accept}
                reject={reject}
            />
            <i className="pi pi-check-circle" style={{fontSize: '1rem', marginRight: '10px', marginLeft: '10px', color: 'green'}}
               onClick={() => setVisible(true)}/>
        </>
    );
}
