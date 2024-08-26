/* eslint-disable @next/next/no-img-element */

import React, {useContext} from 'react';
import {LayoutContext} from './context/layoutcontext';
import './custom-style/footer.css';

const AppFooter = () => {
    const { layoutConfig } = useContext(LayoutContext);

    return (
        <div className="layout-footer">
            <img src={`/layout/images/logo-${layoutConfig.colorScheme === 'light' ? 'dark' : 'white'}.svg`} alt="Logo" height="20" className="mr-2" />
            by
            <span className="font-medium ml-2">SEP490_G42 Summer 2024</span>
        </div>
    );
};

export default AppFooter;
