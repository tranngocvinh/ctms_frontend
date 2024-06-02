
import React, { useState, useRef } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import {deleteSupplier} from "../api/client";

export default function Delete({container,fetchContainers}) {
    const [visible, setVisible] = useState(false);
    const toast = useRef(null);

    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });

        deleteSupplier(container.supplierId).then(res => {
            fetchContainers();

        }).catch(err => {
            toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });

        }).finally(() => {

        })
    }

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }

    return (
        <>
            <Toast ref={toast} />
            <ConfirmDialog group="declarative"  visible={visible} onHide={() => setVisible(false)} message="Are you sure you want to proceed?"
                           header="Confirmation" icon="pi pi-exclamation-triangle" accept={accept} reject={reject} />
                <Button onClick={() => setVisible(true)}  severity={"danger"} label="Xóa" />

        </>
    )
}
