/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LayoutContext } from '@/layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown'; // Import Dropdown component
import { classNames } from 'primereact/utils';
import AppHeader from '../login/AppHeader';
import Footer from '../login/Footer/Footer';

// Danh sách các quốc gia
const countries = [
    { name: 'United States', code: 'US' },
    { name: 'Vietnam', code: 'VN' },
    { name: 'Japan', code: 'JP' },
    { name: 'Canada', code: 'CA' },
    { name: 'United Kingdom', code: 'UK' },
    // Thêm các quốc gia khác ở đây
];

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [checked, setChecked] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [companyName, setCompanyName] = useState(''); // Thêm state cho Company Name
    const [city, setCity] = useState(''); // Thêm state cho City
    const [selectedCountry, setSelectedCountry] = useState(null); // Thêm state cho Country
    const { layoutConfig } = useContext(LayoutContext);

    const router = useRouter();
    const containerClassName = classNames(
        'surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden',
        { 'p-input-filled': layoutConfig.inputStyle === 'filled' }
    );

    const handleRegister = () => {
        // Logic xử lý đăng ký
        if (password === confirmPassword) {
            // Đăng ký thành công
            console.log('User registered:', { firstName, lastName, phone, email, password, companyName, city, selectedCountry });
            // Điều hướng về trang chủ hoặc trang đăng nhập
            router.push('/login');
        } else {
            // Mật khẩu không khớp
            console.log('Passwords do not match');
        }
    };

    return (
        <>
            <AppHeader />
            <div className={containerClassName}
                 style={{
                     backgroundColor: 'lightblue', // Bạn có thể thay đổi màu nền nếu muốn
                     backgroundImage: 'url("/demo/images/login/R12.jpg")', // Đường dẫn tới ảnh nền
                     backgroundSize: 'cover',
                     backgroundPosition: 'center',
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
                        <div className="w-full surface-card py-8 px-5 sm:px-8 flex items-center justify-center"
                             style={{ borderRadius: '160px' }}>
                            <div>
                                <div className="ml-10 text-center flex-grow line-height-2 " style={{ height: '100px' }}>
                                    <div className="text-1200 text-3xl font-medium mb-3">Register</div>
                                    <span className="text-600 font-medium">Create your account. It’s free and only takes a minute.</span>
                                </div>

                                <div>
                                    <label htmlFor="firstName" className="block text-900 text-xl font-medium mb-2">
                                        First Name
                                    </label>
                                    <InputText id="firstName" keyfilter={/^[^<>*!%()_+=@#?/|$]+[ ]/} type="text" placeholder="First Name"
                                               className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }}
                                               value={firstName}
                                               onChange={(e) => setFirstName(e.target.value)} />

                                    <label htmlFor="lastName" className="block text-900 text-xl font-medium mb-2">
                                        Last Name
                                    </label>
                                    <InputText id="lastName" keyfilter={/^[^<>*!%()_+=@#?/|$]+[ ]/} type="text" placeholder="Last Name"
                                               className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }}
                                               value={lastName}
                                               onChange={(e) => setLastName(e.target.value)} />

                                    <label htmlFor="phone" className="block text-900 text-xl font-medium mb-2">
                                        Phone
                                    </label>
                                    <InputText id="phone" keyfilter={/^[^<>*!%()_+=@#?/|$]+[ ]/} type="tel" placeholder="Phone Number"
                                               className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }}
                                               value={phone}
                                               onChange={(e) => setPhone(e.target.value)} />

                                    <label htmlFor="email" className="block text-900 text-xl font-medium mb-2">
                                        Email
                                    </label>
                                    <InputText id="email" type="text" placeholder="Email address"
                                               className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }}
                                               value={email}
                                               onChange={(e) => setEmail(e.target.value)} />

                                    <label htmlFor="password" className="block text-900 font-medium text-xl mb-2">
                                        Password
                                    </label>
                                    <Password inputId="password"  value={password}
                                              onChange={(e) => setPassword(e.target.value)}
                                              placeholder="Password" toggleMask className="w-full mb-5"
                                              inputClassName="w-full p-3 md:w-30rem" />

                                    <label htmlFor="confirmPassword" className="block text-900 font-medium text-xl mb-2">
                                        Confirm Password
                                    </label>
                                    <Password inputId="confirmPassword" value={confirmPassword}
                                              onChange={(e) => setConfirmPassword(e.target.value)}
                                              placeholder="Confirm Password" toggleMask className="w-full mb-5"
                                              inputClassName="w-full p-3 md:w-30rem" />

                                    <label htmlFor="companyName" className="block text-900 text-xl font-medium mb-2">
                                        Company Name
                                    </label>
                                    <InputText id="companyName" type="text" placeholder="Company Name"
                                               className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }}
                                               value={companyName}
                                               onChange={(e) => setCompanyName(e.target.value)} />

                                    <label htmlFor="city" className="block text-900 text-xl font-medium mb-2">
                                        City
                                    </label>
                                    <InputText id="city" type="text" placeholder="City"
                                               className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }}
                                               value={city}
                                               onChange={(e) => setCity(e.target.value)} />

                                    <label htmlFor="country" className="block text-900 text-xl font-medium mb-2">
                                        Country
                                    </label>
                                    <Dropdown id="country" value={selectedCountry} options={countries} onChange={(e) => setSelectedCountry(e.value)}
                                              optionLabel="name" placeholder="Select a Country" className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }}/>

                                    <div className="flex align-items-center justify-content-between mb-5 gap-5">
                                        <div className="flex align-items-center">
                                            <Checkbox inputId="terms" checked={checked}
                                                      onChange={(e) => setChecked(e.checked ?? false)}
                                                      className="mr-2" />
                                            <label htmlFor="terms">I agree to the <a href="#" style={{ color: 'var(--primary-color)' }}>terms and conditions</a></label>
                                        </div>
                                    </div>

                                    <Button label="Register" className="w-full p-3 text-xl"
                                            onClick={handleRegister} />

                                    <div style={{ textAlign: 'center', marginTop: '10px' }}>
                                        <Button label="Already have an account?" className="p-button-text" onClick={() => router.push('/auth/login')} />
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

export default RegisterPage;
