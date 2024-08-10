"use client"
import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import jwtDecode from 'jwt-decode';

export default function UserForm({ user, onSave, onCancel }) {
    const [name, setName] = useState(user ? user.name : '');
    const [email, setEmail] = useState(user ? user.email : '');
    const [password, setPassword] = useState('');
    const [decodedPassword, setDecodedPassword] = useState('');

    useEffect(() => {
        if (user && user.token) {
            // Decode the JWT and extract the password
            const decodedToken = jwtDecode(user.token);
            setDecodedPassword(decodedToken.password || ''); // Assuming the password is stored in the token
        }
    }, [user]);

    const saveUser = () => {
        const updatedUser = { name, email };

        if (password.trim() !== '') {
            updatedUser.password = password;
        }

        onSave(updatedUser);
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
            <div className="p-field">
                <label htmlFor="password">Password</label>
                <Password
                    id="password"
                    value={password || decodedPassword}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={decodedPassword ? "********" : ""}
                    toggleMask
                />
            </div>
            <div className="p-grid p-justify-end">
                <Button label="Cancel" icon="pi pi-times" onClick={onCancel} className="p-button-text" />
                <Button label="Save" icon="pi pi-check" onClick={saveUser} />
            </div>
        </div>
    );
}
