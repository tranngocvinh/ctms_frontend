'use client';
/* eslint-disable @next/next/no-img-element */
import React, {useContext, useRef, useState} from 'react';
import Link from 'next/link';

import {StyleClass} from 'primereact/styleclass';
import {Button} from 'primereact/button';
import {Ripple} from 'primereact/ripple';
import {Divider} from 'primereact/divider';
import {LayoutContext} from '../../../layout/context/layoutcontext';
import {NodeRef} from '@/types';
import {classNames} from 'primereact/utils';
import {useRouter} from "next/navigation";

const LandingPage = () => {
    const [isHidden, setIsHidden] = useState(false);
    const {layoutConfig} = useContext(LayoutContext);
    const menuRef = useRef<HTMLElement | null>(null);
    const router = useRouter();

    const toggleMenuItemClick = () => {
        setIsHidden((prevState) => !prevState);
    };

    return (
        <div className="surface-0 flex justify-content-center">
            <div id="home" className="landing-wrapper overflow-hidden">
                <div
                    className="py-4 px-4 mx-0 md:mx-6 lg:mx-8 lg:px-8 flex align-items-center justify-content-between relative lg:static"
                    style={{}}>
                    <Link href="/" className="flex align-items-center">
                        <img src="layout/images/TTTTW1.png" alt="Logo" height="50" className="mr-0 lg:mr-2"/>
                    </Link>
                    <StyleClass nodeRef={menuRef as NodeRef} selector="@next" enterClassName="hidden"
                                leaveToClassName="hidden" hideOnOutsideClick>
                        <i ref={menuRef} className="pi pi-bars text-4xl cursor-pointer block lg:hidden text-700"></i>
                    </StyleClass>
                    <div
                        className={classNames('align-items-center surface-0 flex-grow-1 hidden lg:flex w-full px-6 lg:px-0 z-2', {hidden: isHidden})}
                    >
                        <div
                            className="flex justify-content-end w-full border-top-1 lg:border-top-none surface-border py-3 lg:py-0 mt-3 lg:mt-0">
                            <Button
                                label="Login Here!!"
                                text
                                rounded
                                className="border-none font-light line-height-2 text-blue-500"
                                icon="pi pi-user"
                                size="large"
                                onClick={() => router.push('/auth/login')}
                            />
                        </div>
                    </div>

                </div>

                <div
                    id="hero"
                    className="flex flex-column pt-4 px-4 lg:px-8 overflow-hidden"
                    style={{
                        background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, #ADD8E6 0%, #C3E3FA 100%)',
                        clipPath: 'ellipse(150% 87% at 93% 13%)'
                    }}
                >
                    <div className="mx-4 md:mx-8 mt-0 md:mt-4">
                        <h1 className="text-6xl font-bold text-gray-900 line-height-2">
                            <span className="font-light block">Vietnam Maritime Corporation</span>
                        </h1>
                        <p className="font-normal text-2xl line-height-3 md:mt-3 text-gray-700">Leading corporation of
                            supplying capacity in the maritime services chain</p>
                        <Link href="/"><Button type="button" label="Booking - VIMC" rounded
                                               className="text-xl border-none mt-3 bg-blue-500 font-normal line-height-3 px-3 text-white"></Button></Link>
                    </div>
                    <div className="flex justify-content-center md:justify-content-end">
                        <img src="demo/images/landing/landing2.png" alt="Image" className="w-9 md:w-auto"/>
                    </div>
                </div>

                <div id="features" className="py-4 px-4 lg:px-8 mt-5 mx-0 lg:mx-8">
                    <div className="grid justify-content-center">
                        <div className="col-12 text-center mt-8 mb-4">
                            <h2 className="text-900 font-normal mb-2">PHOTO</h2>
                        </div>

                        <div className="col-12 md:col-12 lg:col-4 p-0 lg:pr-5 lg:pb-5 mt-4 lg:mt-0">
                            <div
                                style={{
                                    height: '160px',
                                    padding: '2px',
                                    borderRadius: '10px',
                                    background: 'linear-gradient(90deg, rgba(253, 228, 165, 0.2), rgba(187, 199, 205, 0.2)), linear-gradient(180deg, rgba(253, 228, 165, 0.2), rgba(187, 199, 205, 0.2))'
                                }}
                            >
                                <div className="p-3 surface-card h-full" style={{borderRadius: '8px'}}>
                                    <img src="demo/images/landing/lan1.jpg" alt="lan1" height="135" width="355"/>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 md:col-12 lg:col-4 p-0 lg:pr-5 lg:pb-5 mt-4 lg:mt-0">
                            <div
                                style={{
                                    height: '160px',
                                    padding: '2px',
                                    borderRadius: '10px',
                                    background: 'linear-gradient(90deg, rgba(145,226,237,0.2),rgba(251, 199, 145, 0.2)), linear-gradient(180deg, rgba(253, 228, 165, 0.2), rgba(172, 180, 223, 0.2))'
                                }}
                            >
                                <div className="p-3 surface-card h-full" style={{borderRadius: '8px'}}>
                                    <img src="demo/images/landing/lan2.jpg" alt="lan2" height="135" width="355"/>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 md:col-12 lg:col-4 p-0 lg:pb-5 mt-4 lg:mt-0">
                            <div
                                style={{
                                    height: '160px',
                                    padding: '2px',
                                    borderRadius: '10px',
                                    background: 'linear-gradient(90deg, rgba(145, 226, 237, 0.2), rgba(172, 180, 223, 0.2)), linear-gradient(180deg, rgba(172, 180, 223, 0.2), rgba(246, 158, 188, 0.2))'
                                }}
                            >
                                <div className="p-3 surface-card h-full" style={{borderRadius: '8px'}}>
                                    <img src="demo/images/landing/lan3.jpg" alt="lan3" height="135" width="375"/>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 md:col-12 lg:col-4 p-0 lg:pr-5 lg:pb-5 mt-4 lg:mt-0">
                            <div
                                style={{
                                    height: '160px',
                                    padding: '2px',
                                    borderRadius: '10px',
                                    background: 'linear-gradient(90deg, rgba(187, 199, 205, 0.2),rgba(251, 199, 145, 0.2)), linear-gradient(180deg, rgba(253, 228, 165, 0.2),rgba(145, 210, 204, 0.2))'
                                }}
                            >
                                <div className="p-3 surface-card h-full" style={{borderRadius: '8px'}}>
                                    <img src="demo/images/landing/lan4.png" alt="lan4" height="135" width="355"/>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 md:col-12 lg:col-4 p-0 lg:pr-5 lg:pb-5 mt-4 lg:mt-0">
                            <div
                                style={{
                                    height: '160px',
                                    padding: '2px',
                                    borderRadius: '10px',
                                    background: 'linear-gradient(90deg, rgba(187, 199, 205, 0.2),rgba(246, 158, 188, 0.2)), linear-gradient(180deg, rgba(145, 226, 237, 0.2),rgba(160, 210, 250, 0.2))'
                                }}
                            >
                                <div className="p-3 surface-card h-full" style={{borderRadius: '8px'}}>
                                    <img src="demo/images/landing/lan5.jpg" alt="lan5" height="135" width="355"/>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 md:col-12 lg:col-4 p-0 lg:pb-5 mt-4 lg:mt-0">
                            <div
                                style={{
                                    height: '160px',
                                    padding: '2px',
                                    borderRadius: '10px',
                                    background: 'linear-gradient(90deg, rgba(251, 199, 145, 0.2), rgba(246, 158, 188, 0.2)), linear-gradient(180deg, rgba(172, 180, 223, 0.2), rgba(212, 162, 221, 0.2))'
                                }}
                            >
                                <div className="p-3 surface-card h-full" style={{borderRadius: '8px'}}>
                                    <img src="demo/images/landing/lan6.jpg" alt="lan6" height="135" width="375"/>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 md:col-12 lg:col-4 p-0 lg:pr-5 mt-4 lg:mt-0">
                            <div
                                style={{
                                    height: '160px',
                                    padding: '2px',
                                    borderRadius: '10px',
                                    background: 'linear-gradient(90deg, rgba(145, 210, 204, 0.2), rgba(160, 210, 250, 0.2)), linear-gradient(180deg, rgba(187, 199, 205, 0.2), rgba(145, 210, 204, 0.2))'
                                }}
                            >
                                <div className="p-3 surface-card h-full" style={{borderRadius: '8px'}}>
                                    <img src="demo/images/landing/lan7.jpg" alt="lan7" height="135" width="355"/>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 md:col-12 lg:col-4 p-0 lg:pr-5 mt-4 lg:mt-0">
                            <div
                                style={{
                                    height: '160px',
                                    padding: '2px',
                                    borderRadius: '10px',
                                    background: 'linear-gradient(90deg, rgba(145, 210, 204, 0.2), rgba(212, 162, 221, 0.2)), linear-gradient(180deg, rgba(251, 199, 145, 0.2), rgba(160, 210, 250, 0.2))'
                                }}
                            >
                                <div className="p-3 surface-card h-full" style={{borderRadius: '8px'}}>
                                    <img src="demo/images/landing/lan8.png" alt="lan8" height="135" width="355"/>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 md:col-12 lg:col-4 p-0 lg-4 mt-4 lg:mt-0">
                            <div
                                style={{
                                    height: '160px',
                                    padding: '2px',
                                    borderRadius: '10px',
                                    background: 'linear-gradient(90deg, rgba(160, 210, 250, 0.2), rgba(212, 162, 221, 0.2)), linear-gradient(180deg, rgba(246, 158, 188, 0.2), rgba(212, 162, 221, 0.2))'
                                }}
                            >
                                <div className="p-3 surface-card h-full" style={{borderRadius: '8px'}}>
                                    <img src="demo/images/landing/lan9.jpg" alt="lan9" height="135" width="375"/>
                                </div>
                            </div>
                        </div>

                        <div
                            className="col-12 mt-8 mb-8 p-2 md:p-8"
                            style={{
                                borderRadius: '20px',
                                background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, #EFE1AF 0%, #C3DCFA 100%)'
                            }}
                        >
                            <div
                                className="flex flex-column justify-content-center align-items-center text-center px-3 py-3 md:py-0">
                                <h3 className="text-gray-900 mb-2">History</h3>
                                <span className="text-gray-600 text-2xl">1995</span>
                                <p className="text-gray-900 sm:line-height-2 md:line-height-4 text-2xl mt-4"
                                   style={{maxWidth: '800px'}}>
                                    “1995: Decision No. 250 / TTg of the Prime Minister established Vietnam National
                                    Shipping Lines (Vinalines),
                                    a state-owned enterprise that plays a key role in Vietnam's maritime industry.
                                    Including 24 member enterprises,
                                    a fleet of 49 ships with a total tonnage of 400,000 DWT, average age of 21.5 years,
                                    seaport system with 6,900 m
                                    of berths, state capital of nearly 1,500 billion VND.”
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="highlights" className="py-4 px-4 lg:px-8 mx-0 my-6 lg:mx-8">
                    <div className="text-center">
                        <h2 className="text-900 font-normal mb-2">Core Business</h2>
                    </div>

                    <div className="grid mt-8 pb-2 md:pb-8">
                        <div
                            className="flex justify-content-center col-12 lg:col-6 bg-purple-100 p-0 flex-order-1 lg:flex-order-0"
                            style={{borderRadius: '8px'}}>
                            <img src="/demo/images/landing/port-VIMC.png" className="w-11" alt="mockup mobile"/>
                        </div>

                        <div
                            className="col-12 lg:col-6 my-auto flex flex-column lg:align-items-end text-center lg:text-right">
                            <div
                                className="flex align-items-center justify-content-center bg-purple-200 align-self-center lg:align-self-end"
                                style={{
                                    width: '4.2rem',
                                    height: '4.2rem',
                                    borderRadius: '10px'
                                }}
                            >
                                <i className="pi pi-fw pi-mobile text-5xl text-purple-700"></i>
                            </div>
                            <h2 className="line-height-1 text-900 text-4xl font-normal">Port Operation</h2>
                            <span className="text-700 text-2xl line-height-3 ml-0 md:ml-2" style={{maxWidth: '650px'}}>
                                15 Seaports hold a strategic position in the transportation<br/>
                                26% Of total national berths<br/>
                                17% Total length of national wharf<br/>
                                126 Annual production / million tons<br/>
                            </span>
                        </div>
                    </div>

                    <div className="grid my-8 pt-2 md:pt-8">
                        <div
                            className="col-12 lg:col-6 my-auto flex flex-column text-center lg:text-left lg:align-items-start">
                            <div
                                className="flex align-items-center justify-content-center bg-yellow-200 align-self-center lg:align-self-start"
                                style={{
                                    width: '4.2rem',
                                    height: '4.2rem',
                                    borderRadius: '10px'
                                }}
                            >
                                <i className="pi pi-fw pi-prime text-5xl text-yellow-700"></i>
                            </div>
                            <h2 className="line-height-1 text-900 text-4xl font-normal">Shipping</h2>
                            <span className="text-700 text-2xl line-height-3 mr-0 md:mr-2" style={{maxWidth: '650px'}}>
                                61 Largest fleet in the country <br/>
                                20% Of Vietnam's fleet tonnage<br/>
                                21997 DWT Average payload<br/>
                                20 YEARS Experience in shipping industry
                            </span>
                        </div>

                        <div
                            className="flex justify-content-end flex-order-1 sm:flex-order-2 col-12 lg:col-6 bg-yellow-100 p-0"
                            style={{borderRadius: '8px'}}>
                            <img src="/demo/images/landing/Logistics-VIMC.png" className="w-11" alt="mockup"/>
                        </div>
                    </div>
                </div>


                <div className="py-4 px-4 mx-0 mt-8 lg:mx-8">
                    <div className="grid justify-content-between">
                        <div>
                            <Link href="/"
                                  className="flex flex-wrap align-items-center justify-content-center md:justify-content-start md:mb-0 mb-3 cursor-pointer">
                                <img src="layout/images/TTTTW1.png" alt="Logo" height="50" className="mr-0 lg:mr-2"/>
                            </Link>
                        </div>
                        <div className="intro" style={{display: 'flex'}}>
                            <div>
                                <i className="pi pi-building"/>
                                International Maritime Trade Center Building (Ocean Park Building)<br/>
                                No.1 - Đào Duy Anh - Phương Mai - Đống Đa - Hà Nội
                            </div>
                        </div>
                    </div>
                    <div className="ul">
                        <i className="pi pi-phone"/> (024)35770825-29
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <i className="pi pi-whatsapp"/> (024)35770850/60
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <i className="pi pi-id-card"/> info@vimc.com
                    </div>
                </div>
            </div>
        </div>
    )
        ;
};

export default LandingPage;
