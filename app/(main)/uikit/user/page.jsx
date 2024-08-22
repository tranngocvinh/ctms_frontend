"use client"
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import UserService from 'app/components/User/UserService';
import UserForm from 'app/components/User/UserForm';

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
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'User Created', life: 3000 });
                loadUsers();
                setUserDialog(false);
            });
        } else if (method === "PUT") {
            UserService.updateUser(selectedUser.id, user).then(() => {
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'User Updated', life: 3000 });
                loadUsers();
                setUserDialog(false);
            });
        }
    };

    const editUser = (user) => {
        setSelectedUser({ ...user });
        setUserDialog(true);
    };

    const confirmDeleteUser = (user) => {
        setSelectedUser(user);
        setDeleteUserDialog(true);
    };

    const deleteUser = () => {
        UserService.deleteUser(selectedUser.id).then(() => {
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
            loadUsers();
            setDeleteUserDialog(false);
            setSelectedUser(null);
        });
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editUser(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteUser(rowData)} />
            </React.Fragment>
        );
    };

    return (
        <div className="datatable-crud-demo">
            <Toast ref={toast} />
            <div className="card">
                <Button label="New User" icon="pi pi-plus" className="p-button-success mb-3" onClick={openNew} />
                <DataTable value={users} paginator rows={10} responsiveLayout="scroll">
                    <Column field="id" header="ID" />
                    <Column field="name" header="Name" />
                    <Column field="email" header="Email" />
                    <Column field="roles" header="Roles" />
                    <Column body={actionBodyTemplate} />
                </DataTable>
            </div>

            <Dialog visible={userDialog} style={{ width: '450px' }} header="User Details" modal className="p-fluid" footer={null} onHide={hideDialog}>
                <UserForm user={selectedUser} onSave={saveUser} onCancel={hideDialog} />
            </Dialog>

            <Dialog visible={deleteUserDialog} style={{ width: '450px' }} header="Confirm" modal footer={null} onHide={() => setDeleteUserDialog(false)}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {selectedUser && <span>Are you sure you want to delete <b>{selectedUser.name}</b>?</span>}
                </div>
                <div className="p-grid p-justify-end">
                    <Button label="No" icon="pi pi-times" onClick={() => setDeleteUserDialog(false)} className="p-button-text" />
                    <Button label="Yes" icon="pi pi-check" onClick={deleteUser} />
                </div>
            </Dialog>
        </div>
    );
}
