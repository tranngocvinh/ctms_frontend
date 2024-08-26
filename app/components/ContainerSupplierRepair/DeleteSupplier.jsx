import React, {useRef, useState} from 'react';
import {ConfirmDialog} from 'primereact/confirmdialog';
import {Toast} from 'primereact/toast';
import {Button} from 'primereact/button';
import {deleteSupplier} from "../../api/container_supplier";

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
            <ConfirmDialog group="declarative"  visible={visible} onHide={() => setVisible(false)} message="Bạn có chắc chắn muốn xóa đơn vị này ?"
                           header="Xác nhận xóa" icon="pi pi-exclamation-triangle" accept={accept} reject={reject} />
                <Button onClick={() => setVisible(true)}  severity={"danger"} label="Xóa" />

        </>
    )
}
