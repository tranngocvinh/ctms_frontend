/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react';
import { LayoutContext } from './context/layoutcontext';

const AppFooter = () => {
    const { layoutConfig } = useContext(LayoutContext);

    return (
        <div className="layout-footer">
            {/*<img src={`/layout/images/logo-${layoutConfig.colorScheme === 'light' ? 'dark' : 'white'}.svg`} alt="Logo" height="20" className="mr-2" />*/}
            {/*by*/}
            {/*<span className="font-medium ml-2">SEP490_G42 Summer 2024</span>*/}
            <div className="left-column">Tổng công ty Hàng Hải Việt Nam<br/>
                Công ty cổ phần</div>
            <div className="right-column"><i className="pi pi-building"/>
                International Maritime Trade Center Building (Ocean Park Building)<br/>
                No.1 - Đào Duy Anh - Phương Mai - Đống Đa - Hà Nội
            </div>
            <div className="ul">
                <i className="pi pi-phone"/> (024)35770825-29
                <i className="pi pi-whatsapp"/> (024)35770850/60
                <i className="pi pi-id-card"/> info@vimc.com
            </div>
        </div>
    );
};

export default AppFooter;
