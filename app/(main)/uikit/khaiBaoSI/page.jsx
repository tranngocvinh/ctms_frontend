/* eslint react-hooks/rules-of-hooks: 0 */
"use client"
import React, {useEffect, useState} from 'react';
import {getEmptyContainertoAddSI} from "../../../api/si";
import Table from "../../../components/SI/dataTable";
import {ProgressSpinner} from 'primereact/progressspinner';
import {isCustomer, isManager} from "../../../verifyRole";

export default function KhaiBaoSI() {
    const jwtToken = localStorage.getItem('jwtToken');
    const authToken = localStorage.getItem('authToken');
    if(!isManager(jwtToken, authToken) && !isCustomer(jwtToken, authToken)) {
        return <p>Trang này không tồn tại</p>;
    }
    const [SI,setSI] = useState([])
    const [loading, setLoading] = useState(false);

    const fetchSIs = () =>{
        setLoading(true);

        getEmptyContainertoAddSI().then(res => {
            setSI(res.data)
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setLoading(false)
        })
    }
    useEffect(() => {
        fetchSIs();
    }, [])

    if (loading) {
        return (
            <div className="card">
                <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
            </div>
        )
    }
    return(
        <>
            <Table  SIs={SI} fetchSIs={fetchSIs}/>
        </>
    )
}
