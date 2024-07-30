/* eslint-disable @next/next/no-img-element */

import React, {useContext} from 'react';
import {LayoutContext} from './context/layoutcontext';

const AppFooter = () => {
    const {layoutConfig} = useContext(LayoutContext);

    return (
        <div className="layout-footer">
            {/*<img src={`/layout/images/logo-${layoutConfig.colorScheme === 'light' ? 'dark' : 'white'}.svg`} alt="Logo" height="20" className="mr-2" />*/}
            {/*by*/}
            {/*<span className="font-medium ml-2">SEP490_G42 Summer 2024</span>*/}
            <div className="left-column"><img src="layout/images/TTTTW1.png" width="200" height="50"/></div>
            <div className="right-column">
                <div className="intro"><div>Tổng công ty Hàng Hải Việt Nam<br/>
                    <div> Công ty cổ phần</div></div><div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <i className="pi pi-building"/>
                International Maritime Trade Center Building (Ocean Park Building)<br/>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    No.1 - Đào Duy Anh - Phương Mai - Đống Đa - Hà Nội</div></div></div>
                <div className="ul">
                    <i className="pi pi-phone"/> (024)35770825-29
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <i className="pi pi-whatsapp"/> (024)35770850/60
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <i className="pi pi-id-card"/> info@vimc.com
                </div>
            </div>
        </div>

            );
            };

            export default AppFooter;
