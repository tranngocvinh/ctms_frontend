/* eslint-disable @next/next/no-img-element */
'use client';
import {useRouter} from 'next/navigation';
import React, {useContext, useState} from 'react';
import {Button} from 'primereact/button';
import {Password} from 'primereact/password';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import {classNames} from 'primereact/utils';
import axios from 'axios';
import AppHeader from '../login/AppHeader';
import {LayoutContext} from "@/layout/context/layoutcontext";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // Loading state
    const [forgotPasswordDialogVisible, setForgotPasswordDialogVisible] = useState(false); // Dialog visibility state
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState(''); // Email state for forgot password
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

            localStorage.setItem('jwtToken', token);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('userRole', userRole);
            const role = localStorage.getItem('userRole');
            {(role === 'ADMIN' || role === 'CUSTOMER') ? (router.push('/pages/landing')) : router.push('/') }

        } catch (error) {
            console.error('Login failed:', error);
            alert("Vui lòng kiểm tra lại thông tin đăng nhập của bạn.");
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const handleForgotPassword = async () => {
        try {
            await axios.post(`https://auth.g42.biz/api/v1/customers/forgot-password/${forgotPasswordEmail}`);
            alert('Thông báo đặt lại mật khẩu đã được gửi tới email của bạn.');
            setForgotPasswordDialogVisible(false); // Close the dialog
        } catch (error) {
            console.error('Failed to send reset password email:', error);
            alert('Có lỗi xảy ra. Vui lòng thử lại.');
        }
    };

    return (
        <>
            <AppHeader />
            <div className={containerClassName}
                 style={{
                     backgroundImage: 'url("/demo/images/login/R12.jpg")',
                     backgroundSize: 'cover',
                     backgroundPosition: 'center',
                     backgroundRepeat: 'no-repeat'
                 }}
            >
                <div className="flex flex-column align-items-center justify-content-center">
                    <img src={`/layout/images/logo-${layoutConfig.colorScheme === 'light' ? 'dark' : 'white'}.svg`}
                         alt="Sakai logo" className="mb-5 w-6rem flex-shrink-0"/>
                    <div
                        style={{
                            borderRadius: '56px',
                            padding: '0.3rem',
                            background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)',
                            width:"963px"
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
                                <div className="ml-10 text-center flex-grow " style={{paddingBottom:'20px'}}>
                                    <div className="text-1200 text-3xl font-medium mb-3">Đăng nhập</div>
                                    <span className="text-600 font-medium">Chào mừng bạn đến với VIMC, vui lòng đăng nhập để tiếp tục</span>
                                </div>

                                <div>
                                    <InputText id="email1" type="text" placeholder="Địa chỉ email"
                                               value={email} onChange={(e) => setEmail(e.target.value)}
                                               className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }} />

                                    <Password inputId="password1" value={password}
                                              onChange={(e) => setPassword(e.target.value)}
                                              placeholder="Mật khẩu" className="w-full mb-5"
                                              inputClassName="w-full p-3 md:w-30rem" feedback={false}></Password>

                                    <Button
                                        label= "Đăng nhập"
                                        className="w-full p-3 text-xl"
                                        onClick={handleLogin}
                                        disabled={loading}
                                        loading={loading}
                                    ></Button>

                                    <div style={{ textAlign: 'center', marginTop: '10px' }}>
                                        <Button label="Quên mật khẩu?" className="p-button-text" onClick={() => setForgotPasswordDialogVisible(true)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Dialog header="Quên mật khẩu" visible={forgotPasswordDialogVisible} style={{ width: '30vw' }} onHide={() => setForgotPasswordDialogVisible(false)}>
                <div>
                    <label htmlFor="forgotPasswordEmail" className="block text-900 text-xl font-medium mb-2">
                        Nhập địa chỉ email của bạn
                    </label>
                    <InputText id="forgotPasswordEmail" type="text" placeholder="Địa chỉ email"
                               value={forgotPasswordEmail} onChange={(e) => setForgotPasswordEmail(e.target.value)}
                               className="w-full mb-5" style={{ padding: '1rem' }} />
                    <Button label="Gửi" className="w-full" onClick={handleForgotPassword} />
                </div>
            </Dialog>

        </>
    );
};

export default LoginPage;
