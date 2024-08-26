import React, {useRef, useState} from 'react';
import {ConfirmDialog} from 'primereact/confirmdialog';
import {Toast} from 'primereact/toast';
import {Button} from 'primereact/button';
import axios from "axios";

export default function Delete({ delivery, fetchDelivery }) {
    const [visible, setVisible] = useState(false);
    const toast = useRef(null);

    const accept = () => {

        axios.put(`https://auth.g42.biz/api/delivery-orders/isPay/${delivery.id}`)  // Ensure this is the correct ID field
            .then(res => {
                toast.current.show({ severity: 'success', summary: 'Thành công', detail: 'Xác nhận đơn hàng thanh toán thành công', life: 3000 });
                fetchDelivery();
            })
            .catch(err => {
                toast.current.show({ severity: 'warn', summary: 'Thất bài', detail: 'Xác nhận đơn hàng thanh toán thất bại', life: 3000 });
            });
    };

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Từ chối', detail: 'Bạn chưa xác nhận đơn hàng đã thanh toán', life: 3000 });
    };

    return (
        <>
            <Toast ref={toast} />
            <ConfirmDialog
                visible={visible}
                onHide={() => setVisible(false)}
                message="Bạn có chắc chắn rằng đơn hàng đã được thanh toán ?"
                header="Xác nhận đơn hàng đã được thanh toán ?"
                icon="pi pi-exclamation-triangle"
                accept={accept}
                reject={reject}
            />
            <Button onClick={() => setVisible(true)} severity="danger" label="Xác nhận thanh toán" />
        </>
    );
}
