/* eslint-disable @next/next/no-img-element */
'use client';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LayoutContext } from '@/layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import axios from 'axios';
import AppHeader from '../login/AppHeader'
import Footer from './Footer/Footer'
// import AppHeader from './Header/AppHeader'

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false);
    const { layoutConfig } = useContext(LayoutContext);
    const router = useRouter();

    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', {'p-input-filled': layoutConfig.inputStyle === 'filled'});

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://146.19.100.68:8081/api/v1/auth/login', {
                username: email,
                password: password
            });

            const token = response.data.token;// data
            const user = response.data.customerDTO;//date user
            const userRole = response.data.customerDTO.roles;
            // Lưu trữ token và thông tin người dùng vào Local Storage
            localStorage.setItem('jwtToken', token);
            localStorage.setItem('user', JSON.stringify(user));

            localStorage.setItem('userRole', userRole); // Lưu vai trò người dùng phan chia role

            // Điều hướng tới trang chính
            router.push('/');
        } catch (error) {
            console.error('Đăng nhập thất bại:', error);
            alert('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.');
        }
    };

    return (
        <>
            <AppHeader />
            <div className={containerClassName}
                 style={{
                     backgroundImage: 'url("/demo/images/login/R12.jpg")', // Đường dẫn tới ảnh nền
                     backgroundSize: 'cover', // Ảnh sẽ được bao phủ toàn bộ khu vực
                     backgroundPosition: 'center', // Ảnh sẽ không lặp lại
                     backgroundRepeat: 'no-repeat' // Ảnh sẽ không lặp lại
                 }}
            >

                <div className="flex flex-column align-items-center justify-content-center">
                    <img src={`/layout/images/logo-${layoutConfig.colorScheme === 'light' ? 'dark' : 'white'}.svg`}
                         alt="Sakai logo" className="mb-5 w-6rem flex-shrink-0"/>
                    <div
                        style={{
                            borderRadius: '56px',
                            padding: '0.3rem',
                            background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)'
                        }}
                    >
                        <div className="w-full surface-card py-8 px-6 sm:px-10 flex items-center justify-center"
                             style={{ borderRadius: '180px' }}>
                            <div className="flex-shrink-0">
                                <img src="/demo/images/login/TTTTW2.png" alt='img'
                                     className="mr-5 py-8 px-3 object-cover rounded-lg"
                                     style={{ height: "250px" }} />
                            </div>
                            <div>
                                <div className="ml-10 text-center flex-grow ">
                                    <div className="text-1200 text-3xl font-medium mb-3">Login</div>
                                    <span className="text-600 font-medium">Welcome Back! Please enter your detail.</span>
                                </div>


                                <div>
                                    <label htmlFor="email1" className="block text-900 text-xl font-medium mb-2">
                                        Email
                                    </label>
                                    <InputText id="email1" type="text" placeholder="Email address"
                                               value={email} onChange={(e) => setEmail(e.target.value)}
                                               className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }} />

                                    <label htmlFor="password1" className="block text-900 font-medium text-xl mb-2">
                                        Password
                                    </label>
                                    <Password inputId="password1" value={password}
                                              onChange={(e) => setPassword(e.target.value)}
                                              placeholder="Password" toggleMask className="w-full mb-5"
                                              inputClassName="w-full p-3 md:w-30rem"></Password>

                                    <div className="flex align-items-center justify-content-between mb-5 gap-5">
                                        <div className="flex align-items-center">
                                            <Checkbox inputId="rememberme1" checked={checked}
                                                      onChange={(e) => setChecked(e.checked ?? false)}
                                                      className="mr-2"></Checkbox>
                                            <label htmlFor="rememberme1">Remember my name</label>
                                        </div>
                                        <Button label="Forgot password?" className="p-button-link text-right" onClick={() => router.push('/auth/forget')}
                                                style={{ color: 'var(--primary-color)' }} />
                                    </div>

                                    <Button label="Sign In" className="w-full p-3 text-xl"
                                            onClick={handleLogin}></Button>

                                    <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                                        <Button label="Not yet registered?" className="p-button-link"
                                                onClick={() => router.push('/auth/register')}
                                                style={{ color: 'var(--primary-color)' }} />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default LoginPage;
