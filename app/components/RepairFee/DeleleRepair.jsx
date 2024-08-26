import React, {useRef, useState} from 'react';
import {ConfirmDialog} from 'primereact/confirmdialog';
import {Toast} from 'primereact/toast';
import {Button} from 'primereact/button';
import {handlePayment} from "../../api/repair";

export default function Delete({ repair, fetchRepair }) {
    const [visible, setVisible] = useState(false);
    const toast = useRef(null);

    const accept = () => {

        handlePayment(repair.id)  // Ensure this is the correct ID field
            .then(res => {
                fetchRepair();
                toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
            })
            .catch(err => {
                toast.current.show({ severity: 'warn', summary: 'Error', detail: ' failed', life: 3000 });
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
                message="Bạn có chắc chắn rằng container đã được thanh toán ?"
                header="Xác nhận đơn sửa chữa đã được thanh toán ?"
                icon="pi pi-exclamation-triangle"
                accept={accept}
                reject={reject}
            />
            <Button onClick={() => setVisible(true)} severity="danger" label="Xác nhận thanh toán" />
        </>
    );
}
