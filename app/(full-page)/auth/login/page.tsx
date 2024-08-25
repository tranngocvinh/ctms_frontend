/* eslint-disable @next/next/no-img-element */
'use client';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LayoutContext } from '@/layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import axios from 'axios';
import AppHeader from '../login/AppHeader'
import Footer from './Footer/Footer'
import { ProgressSpinner } from 'primereact/progressspinner';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // Loading state
    const { layoutConfig } = useContext(LayoutContext);
    const router = useRouter();

    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', {'p-input-filled': layoutConfig.inputStyle === 'filled'});

    const handleLogin = async () => {
        setLoading(true); // Start loading
        try {
            const response = await axios.post(`https://auth.g42.biz/api/v1/auth/login`, {
                username: email,
                password: password
            });

            const token = response.data.token;
            const user = response.data.customerDTO;
            const userRole = response.data.customerDTO.roles;

            // Store token and user information in Local Storage
            localStorage.setItem('jwtToken', token);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('userRole', userRole);
            const role = localStorage.getItem('userRole');
            {(role === 'ADMIN' || role === 'CUSTOMER') ? (router.push('/pages/landing')) : router.push('/') }
            // Navigate to the main page

        } catch (error) {
            console.error('Login failed:', error);
            alert("Vui lòng kiểm tra lại thông tin đăng nhập của bạn.");
        } finally {
            setLoading(false); // Stop loading
        }
    };


    return (
        <>
            <AppHeader />
            <div className={containerClassName}
                 style={{
                     backgroundImage: 'url("/demo/images/login/R12.jpg")', // Background image path
                     backgroundSize: 'cover', // Cover the entire area
                     backgroundPosition: 'center', // Center the image
                     backgroundRepeat: 'no-repeat' // Don't repeat the image
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
                                    <div className="text-1200 text-3xl font-medium mb-3">Đăng nhập</div>
                                    <span className="text-600 font-medium">Chào mừng bạn đến với VIMC, vui lòng đăng nhập để tiếp tục</span>
                                </div>


                                <div>
                                    <label htmlFor="email1" className="block text-900 text-xl font-medium mb-2">
                                        Email
                                    </label>
                                    <InputText id="email1" type="text" placeholder="Đia chỉ email"
                                               value={email} onChange={(e) => setEmail(e.target.value)}
                                               className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }} />

                                    <label htmlFor="password1" className="block text-900 font-medium text-xl mb-2">
                                        Mật khẩu
                                    </label>
                                    <Password inputId="password1" value={password}
                                              onChange={(e) => setPassword(e.target.value)}
                                              placeholder="Mật khẩu" toggleMask className="w-full mb-5"
                                              inputClassName="w-full p-3 md:w-30rem"></Password>

                                    {/* Button with loading state */}
                                    {/*//{loading && (<div>ddddddddddddd</div>)}*/}

                                    <Button

                                      label= "Đăng nhập"
                                            className=" p-3 text-xl"
                                            onClick={handleLogin}
                                            disabled={loading} // Disable the button while loading
                                            loading={loading} // Display the PrimeReact loading indicator
                                    ></Button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
};

export default LoginPage;
