/* eslint-disable @next/next/no-img-element */
'use client';
import React from 'react';


const Dashboard = () => {


    return (
        <div className="h1"><img alt="picture" src="https://vimc.co/wp-content/uploads/2020/08/Slide-vimc-3.png"/><br/>
            About us<br/>
            <div className="h2">Our Company</div>
            <br/>
            <div className="left-column">
                Established in 1995 under the Prime Minister's Decision No. 250 / TTg with the mission of being
                the core and key enterprise of Vietnam's maritime industry. Over 29 years of establishment and
                development, VIMC is one of leading businesses in opening up cooperation, international integration,
                providing maritime services on a global scale, making an important contribution to the development
                of Vietnam's marine economy. VIMC changed to operate as a joint stock company from August 18,
                2020<br/><br/>
                Vietnamese name: Vietnam Maritime Corporation - Joint Stock Company<br/><br/>
                English name: Vietnam Maritime Corporation<br/><br/>
                International name: VIMC<br/><br/>
                Date of establishment: 29/04/1995<br/><br/>
                Address: Ocean Park Building - No.1 Dao Duy Anh, Phuong Mai, Dong Da, Hanoi
            </div>
            <div className="right-column">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/bQogMM1PEpM?si=ilQ260qK59bNktol" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen></iframe>
            </div>
            <div className="ul"><div className=""></div></div>
        </div>
    );
};

export default Dashboard;
