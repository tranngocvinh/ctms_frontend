"use client";
import React, {useEffect, useState} from 'react';
import {InputText} from 'primereact/inputtext';
import {Password} from 'primereact/password';
import {Button} from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';

export default function UserForm({ user, onSave, onCancel }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('customer');

    const roles = [
        { label: 'Customer', value: 'customer' },
        { label: 'Admin', value: 'admin' },
        { label: 'Manager', value: 'manager' },
        { label: 'Staff', value: 'staff' }
    ];

    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setEmail(user.email || '');
            setRole(user.role || 'customer');
        }
    }, [user]);

    const saveUser = () => {
        const updatedUser = { name, email };

        if (!user?.id) {
            updatedUser.password = password;
            updatedUser.role = role;
            onSave(updatedUser, "POST");
        } else {
            onSave(updatedUser, "PUT");
        }
    };

    return (
        <div>
            <div className="p-field">
                <label htmlFor="name">Name</label>
                <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} required autoFocus />
            </div>
            <div className="p-field">
                <label htmlFor="email">Email</label>
                <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            {!user?.id && (
                <>
                    <div className="p-field">
                        <label htmlFor="password">Password</label>
                        <Password
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter a password"
                            toggleMask
                        />
                    </div>
                    <div className="p-field">
                        <label htmlFor="role">Role</label>
                        <Dropdown
                            id="role"
                            value={role}
                            options={roles}
                            onChange={(e) => setRole(e.value)}
                            placeholder="Select a Role"
                        />
                    </div>
                </>
            )}
            <div className="p-grid p-justify-end">
                <Button label="Cancel" icon="pi pi-times" onClick={onCancel} className="p-button-text" />
                <Button label="Save" icon="pi pi-check" onClick={saveUser} />
            </div>
        </div>
    );
}
