"use client";
import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';

export default function UserForm({ user, onSave, onCancel }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('customer');
    const [error, setError] = useState('');

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
        setError('');

        if (!name || !email || (!user?.id && (!password || !role))) {
            setError('Please fill in all required fields.');
            return;
        }
        const updatedUser = { name, email, password };

        if (!user?.id) {
            updatedUser.role = role;
            onSave(updatedUser, "POST");
        } else {
            onSave(updatedUser, "PUT");
        }

    };

    return (
        <div>
            {error && <div style={{color: 'red'}}>{error}</div>} {}
            <div className="p-field them-user">
                <label htmlFor="name">Name</label>
                <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} required autoFocus/>
            </div>
            <div className="p-field them-user">
                <label htmlFor="email">Email</label>
                <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </div>
            <div className="p-field them-user">
                <label htmlFor="password">Password</label>
                <Password
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter a password"
                />
            </div>
            {!user?.id && (
                <>

                    <div className="p-field them-user">
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
            <div className="p-grid" style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Button aria-label="Yes" icon="pi pi-check" onClick={saveUser} severity="success"
                        style={{marginRight: '2px'}} text/>
                <Button aria-label="Hủy" icon="pi pi-times" onClick={onCancel} text severity="danger"/>
            </div>
        </div>
    );
}
