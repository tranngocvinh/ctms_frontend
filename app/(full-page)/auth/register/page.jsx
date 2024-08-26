/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import AppHeader from '../login/AppHeader';
import Footer from '../login/Footer/Footer';
import axios from 'axios';
import {preventDefault} from "@fullcalendar/core/internal";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    // Lấy token từ URL
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token'); // token sẽ được lấy từ URL

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            await axios.post('http://localhost:8080/api/v1/customers/reset-password', {
                token: token,        // Gửi token lên backend
                newPassword: newPassword
            });
            alert('Password has been reset successfully');
            router.push('/auth/login'); // Chuyển hướng đến trang đăng nhập sau khi đặt lại mật khẩu thành công
        } catch (error) {
            setError('Failed to reset password. Please try again.');
        }
    };

    const containerClassName = classNames(
        'surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden'
    );

    return (
        <>
            <AppHeader />
            <div className={containerClassName}
                 style={{
                     backgroundColor: 'lightblue',
                     backgroundImage: 'url("/demo/images/login/R12.jpg")',
                     backgroundSize: 'cover',
                     backgroundPosition: 'center',
                 }}
            >
                <div className="flex flex-column align-items-center justify-content-center">
                    <img src={`/layout/images/logo-dark.svg`}
                         alt="Sakai logo" className="mb-5 w-6rem flex-shrink-0"/>
                    <div
                        style={{
                            borderRadius: '56px',
                            padding: '0.3rem',
                            background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)',
                            width:'41.25rem'
                        }}
                    >
                        <div className="w-full surface-card py-8 px-5 sm:px-8 flex items-center justify-center"
                             style={{ borderRadius: '160px' }}>
                            <div>
                                <div className="ml-10 text-center flex-grow line-height-2" style={{ height: '100px' }}>
                                    <div className="text-1200 text-3xl font-medium mb-3">Reset Password</div>
                                    <span className="text-600 font-medium">Enter your new password below.</span>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <label htmlFor="newPassword" className="block text-900 font-medium text-xl mb-2">
                                        New Password
                                    </label>
                                    <Password inputId="newPassword" value={newPassword}
                                              onChange={(e) => setNewPassword(e.target.value)}
                                              placeholder="New Password" toggleMask className="w-full mb-5"
                                              inputClassName="w-full p-3 md:w-30rem" />

                                    <label htmlFor="confirmPassword" className="block text-900 font-medium text-xl mb-2">
                                        Confirm Password
                                    </label>
                                    <Password inputId="confirmPassword" value={confirmPassword}
                                              onChange={(e) => setConfirmPassword(e.target.value)}
                                              placeholder="Confirm Password" toggleMask className="w-full mb-5"
                                              inputClassName="w-full p-3 md:w-30rem" />

                                    {error && <p className="error">{error}</p>}

                                    <Button type="submit" label="Reset Password" className="w-full p-3 text-xl" />

                                    <div style={{ textAlign: 'center', marginTop: '10px' }}>
                                        <Button label="Back to Login" className="p-button-text" onClick={() => router.push('/login')} />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
};

export default ResetPassword;
