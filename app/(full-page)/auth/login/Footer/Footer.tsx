import React from 'react';
import './Footer.scss';
import { ImFacebook } from 'react-icons/im';
import { BsTwitter } from 'react-icons/bs';
import { AiFillInstagram } from 'react-icons/ai';

const Footer = () => {
    return (
        <div className='footer'>
            <div className="secContainer container grid">

                {/* Phần chứa hình ảnh */}
                <div className="footerLinks">
                    <span className="linkTitle"/>
                    <img
                        src="/demo/images/login/test.png" // Đường dẫn tới ảnh của bạn trong thư mục public
                        alt="Footer Image"
                        style={{ width: '50%', height: 'auto', borderRadius: '8px' }} // Styling cho ảnh
                    />
                </div>

                <div className="footerLinks">
                    <span className="linkTitle">
                        Scan the QR in here
                    </span>
                    <li>
                        <a href="#">Destination</a>
                    </li>
                    <li>
                        <a href="#">Support</a>
                    </li>
                </div>

                <div className="footerLinks">
                    <span className="linkTitle">
                        Contact Us
                    </span>
                    <span className="phone">+444 565 6655</span>
                    <span className="email">abc@outlook.com</span>
                </div>

                <div className="logoDiv">
                    <div className="footerLogo">
                        <a href="#" className='logo flex'>
                            <h1 className='font-bold text-2xl flex'>
                                Links contacts
                            </h1>
                        </a>
                    </div>

                    <div className="socials flex">
                        <ImFacebook className='icon'/>
                        <BsTwitter className='icon'/>
                        <AiFillInstagram className='icon'/>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Footer;
