import React, {useRef, useState} from 'react';
import {ConfirmDialog} from 'primereact/confirmdialog';
import {Toast} from 'primereact/toast';
import {Button} from 'primereact/button';
import {dele} from "../../api/ship";

export default function Delete({ ships, fetchShips }) {
    const [visible, setVisible] = useState(false);
    const toast = useRef(null);

    const accept = () => {

        dele(ships.id)  // Ensure this is the correct ID field
            .then(res => {
                toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
                fetchShips();
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
            <Toast ref={toast} />
            <ConfirmDialog
                visible={visible}
                onHide={() => setVisible(false)}
                message="Bạn có chắc chắn muốn xóa tàu ?"
                header="Xác nhận xóa tàu"
                icon="pi pi-exclamation-triangle"
                accept={accept}
                reject={reject}
            />
            <Button onClick={() => setVisible(true)} severity="danger" label="Xóa" />
        </>
    );
}
