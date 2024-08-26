import React, { useState, useRef } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { deleteSupplier } from "../../api/container_supplier";
import {dele} from "../../api/container_size";

export default function Delete({ container, fetchContainers, showToast }) {
    const [visible, setVisible] = useState(false);
    const toast = useRef(null);

    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Xác nhận', detail: 'Bạn vừa chọn xóa kích thước container', life: 3000 });

        dele(container.id)
            .then(res => {
                showToast('success', 'Thành công', 'Xóa container thành công!');
                setTimeout(() => {
                    fetchContainers();
                },1000)
            })
            .catch(err => {
                showToast('info', 'Thất bại', 'Không thế xóa bởi vì container đang nằm trong một chức năng khác!');
            });
    };

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Từ chối', detail: 'Bạn vừa từ chối lệnh xóa container', life: 3000 });
    };

    return (
        <>
            <Toast ref={toast}/>
            <ConfirmDialog
                visible={visible}
                onHide={() => setVisible(false)}
                message="Bạn có chắc chắn muốn xóa container ?"
                header="Xác nhận xóa container"
                icon="pi pi-exclamation-triangle"
                accept={accept}
                reject={reject}
            />
            <i className="pi pi-trash" style={{fontSize: '1rem'}} onClick={() => setVisible(true)}/>
        </>
    );
}
