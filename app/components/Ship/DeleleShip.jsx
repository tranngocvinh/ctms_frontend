import React, { useState, useRef } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import {dele} from "../../api/ship";

export default function Delete({ ships, fetchShips,showToast}) {
    const [visible, setVisible] = useState(false);
    const toast = useRef(null);

    const accept = () => {

        dele(ships.id)  // Ensure this is the correct ID field
            .then(res => {
                showToast('success', 'Thành công', 'Xóa thành công!');
                setTimeout(() => {
                    fetchShips();
                }, 1000);
            })
            .catch(err => {
                toast.current.show({ severity: 'warn', summary: 'Error', detail: 'Tàu đang ở trong một lịch trình đang di chuyển, không thể xóa', life: 3000 });
            });
    };

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Từ chối', detail: 'Bạn vừa từ chối lệnh xóa tàu', life: 3000 });
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
            <i className="pi pi-trash" style={{fontSize: '1rem' }} onClick={() => setVisible(true)}/>
        </>
    );
}
