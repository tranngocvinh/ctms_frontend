import React, { useState, useRef } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import {handlePayment} from "../../api/repair";
import axios from "axios";

export default function Delete({ repair, fetchDropOrders }) {
    const [visible, setVisible] = useState(false);
    const toast = useRef(null);

    const accept = () => {

        axios.put(`http://auth.g42.biz/api/drop-orders/isPay/${repair.id}`)  // Ensure this is the correct ID field
            .then(res => {
                fetchDropOrders();
                toast.current.show({ severity: 'success', summary: 'Thành công', detail: 'Xác nhận phí DET đã thanh toán thành công', life: 3000 });
            })
            .catch(err => {
                toast.current.show({ severity: 'warn', summary: 'Thất bại', detail: ' thất bại', life: 3000 });
            });
    };

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Từ chối', detail: 'Bạn vừa từ chối xác nhận thanh toán', life: 3000 });
    };

    return (
        <>
            <Toast ref={toast} />
            <ConfirmDialog
                visible={visible}
                onHide={() => setVisible(false)}
                message="Bạn có chắc chắn rằng phí DET đã được thanh toán ?"
                header="Xác nhận phí DET đã được thanh toán ?"
                icon="pi pi-exclamation-triangle"
                accept={accept}
                reject={reject}
            />
            <Button onClick={() => setVisible(true)} severity="danger" label="Xác nhận thanh toán" />
        </>
    );
}
