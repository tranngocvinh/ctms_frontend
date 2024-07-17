'use client';
import { useRouter } from 'next/navigation';
import React, { useState, useContext } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { LayoutContext } from '@/layout/context/layoutcontext';
import { classNames } from 'primereact/utils';
import AppHeader from '../login/AppHeader';
import Footer from '../login/Footer/Footer';

const ForgetPasswordPage = () => {
    const [email, setEmail] = useState('');
    const { layoutConfig } = useContext(LayoutContext);
    const router = useRouter();

    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Thêm logic xử lý gửi yêu cầu đặt lại mật khẩu ở đây
        console.log('Email for password reset:', email);
        // Sau khi xử lý, có thể chuyển hướng người dùng hoặc hiển thị thông báo thành công
    };

    return (
        <>
            <AppHeader />
            <div className={containerClassName}
                 style={{
                     backgroundImage: 'url("/demo/images/login/R12.jpg")', // Đường dẫn tới ảnh nền
                     backgroundSize: 'cover', // Ảnh sẽ được bao phủ toàn bộ khu vực
                     backgroundPosition: 'center', // Ảnh sẽ được căn giữa
                     backgroundRepeat: 'no-repeat' // Ảnh sẽ không lặp lại
                 }}>
                <div className="flex flex-column align-items-center justify-content-center">
                    <img src={`/layout/images/logo-${layoutConfig.colorScheme === 'light' ? 'dark' : 'white'}.svg`}
                         alt="Logo" className="mb-5 w-6rem flex-shrink-0"/>
                    <div
                        style={{
                            borderRadius: '56px',
                            padding: '0.3rem',
                            background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)'
                        }}
                    >
                        <div className="w-full surface-card py-8 px-5 sm:px-8 flex items-center justify-center"
                             style={{ borderRadius: '160px' }}>
                            <div className="flex-shrink-0">
                                <img src="/demo/images/login/test1.png" alt="Image"
                                     className="mr-5 py-8 px-3 object-cover rounded-lg"
                                     style={{height:"400px"}}/>
                            </div>
                            <div>
                                <div className="ml-10 text-center flex-grow">
                                    <div className="text-1200 text-3xl font-medium mb-3">Forget Password</div>
                                    <span className="text-600 font-medium">Please enter your email to reset your password.</span>
                                </div>
                                <form onSubmit={handleSubmit} className="mt-6">
                                    <label htmlFor="email" className="block text-900 text-xl font-medium mb-3">
                                        Email
                                    </label>
                                    <InputText id="email" keyfilter={/^[^\s@]+@[^\s@]+\.[^\s@]+$/} type="email"
                                               placeholder="Email address"
                                               className="w-full md:w-40rem mb-5" style={{padding: '1rem'}}
                                               value={email} onChange={(e) => setEmail(e.target.value)} required/>

                                    <Button label="Submit" type="submit" className="w-full p-3 text-xl"/>

                                    <div style={{textAlign: 'center', marginTop: '10px'}}>
                                        <Button label="Back to Login" className="p-button-text"
                                                onClick={() => router.push('/auth/login')}/>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default ForgetPasswordPage;
