import React, { useState, useRef } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { deleteSupplier } from "../../api/container_supplier";
import {dele} from "../../api/container_size";

export default function Delete({ container, fetchContainers }) {
    const [visible, setVisible] = useState(false);
    const toast = useRef(null);

    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });

        dele(container.id)  // Ensure this is the correct ID field
            .then(res => {
                fetchContainers();
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
                message="Bạn có chắc chắn muốn xóa container ?"
                header="Xác nhận xóa container"
                icon="pi pi-exclamation-triangle"
                accept={accept}
                reject={reject}
            />
            <Button onClick={() => setVisible(true)} severity="danger" label="Xóa" />
        </>
    );
}
