"use client"
import React, {useEffect, useState} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import {Toast} from 'primereact/toast';
import UserService from '/app/components/User/UserService';
import UserForm from '/app/components/User/UserForm';
import '/app/components/User/custom_user.css';
import {Tag} from "primereact/tag";

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userDialog, setUserDialog] = useState(false);
    const [deleteUserDialog, setDeleteUserDialog] = useState(false);
    const toast = React.useRef(null);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = () => {
        UserService.getUsers().then((res) => {
            setUsers(res.data);
        });
    };

    const openNew = () => {
        setSelectedUser(null);
        setUserDialog(true);
    };

    const hideDialog = () => {
        setUserDialog(false);
    };

    const saveUser = (user, method) => {
        if (method === "POST") {
            const role = user.role || 'customer';
            UserService.createUser(role, user).then(() => {
                toast.current.show({severity: 'success', summary: 'Thành công', detail: 'Người dùng mới được tạo', life: 3000});
                loadUsers();
                setUserDialog(false);
            }).catch(() => {
                toast.current.show({ severity: 'error', summary: 'Lỗi', detail: 'Hãy kiểm tra lại thông tin', life: 3000 });
            });
        } else if (method === "PUT") {
            UserService.updateUser(selectedUser.id, user).then(() => {
                toast.current.show({severity: 'success', summary: 'Thành công', detail: 'Người dùng được cập nhật', life: 3000});
                loadUsers();
                setUserDialog(false);
            });
        }
    };

    const editUser = (user) => {
        setSelectedUser({...user});
        setUserDialog(true);
    };

    const confirmDeleteUser = (user) => {
        setSelectedUser(user);
        setDeleteUserDialog(true);
    };

    const deleteUser = () => {
        UserService.deleteUser(selectedUser.id).then(() => {
            toast.current.show({severity: 'success', summary: 'Thành công', detail: 'Người dùng đã được xóa', life: 3000});
            loadUsers();
            setDeleteUserDialog(false);
            setSelectedUser(null);
        });
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <i className="pi pi-pencil" style={{fontSize: '1rem', marginRight: '10px', marginLeft: '10px'}}
                   onClick={() => editUser(rowData)}/>
                <i className="pi pi-trash" style={{fontSize: '1rem', marginRight: '10px', marginLeft: '10px'}}
                   onClick={() => confirmDeleteUser(rowData)}/>
            </React.Fragment>
        );
    };
    const roleSeverities = {
        "ADMIN": "danger",
        "MANAGER": "warning",
        "STAFF": "primary",
        "CUSTOMER": "info"
    };
    const roles = (rowData) => {
        const severity = roleSeverities[rowData.roles];
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Tag severity={severity} value={rowData.roles}></Tag>
            </div>
        );
    };
    return (
        <div className="datatable-crud-demo">
            <Toast ref={toast}/>
            <div className="card">
                <Button label="Thêm người dùng" icon="pi pi-plus" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg
                    text-sm py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" onClick={openNew}/>
                <DataTable value={users} paginator rows={10} showGridlines className="custom-datatable">
                    <Column field="name" header="Tên"/>
                    <Column field="email" header="Email"/>
                    <Column field="roles" header="Vai trò" body={roles}/>
                    <Column body={actionBodyTemplate}/>
                </DataTable>
            </div>

            <Dialog visible={userDialog} style={{width: '450px'}} header="Thông tin người dùng" modal className="p-fluid"
                    footer={null} onHide={hideDialog}>
                <UserForm user={selectedUser} onSave={saveUser} onCancel={hideDialog}/>
            </Dialog>

            <Dialog visible={deleteUserDialog} style={{width: '450px'}} header="Xác nhận" modal footer={null}
                    onHide={() => setDeleteUserDialog(false)}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{fontSize: '2rem'}}/>
                    {selectedUser && <span>Bạn có chắc muốn xóa người dùng <b>{selectedUser.name}</b>?</span>}
                </div>
                <div className="p-grid p-justify-end" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button arial-label="Yes" icon="pi pi-check" onClick={deleteUser} severity="success" style={{marginRight: '2px'}} text/>
                    <Button arial-="Hủy" icon="pi pi-times"  onClick={() => setDeleteUserDialog(false)} text severity="danger"/>
                </div>
            </Dialog>
        </div>
    );
}
