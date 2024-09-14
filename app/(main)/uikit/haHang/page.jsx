/* eslint react-hooks/rules-of-hooks: 0 */
"use client"
import React, {useEffect, useRef, useState} from 'react';
import {getAllSIs} from "../../../api/drop_order";
import DropOrderTable from "../../../components/DropOrder/dataTable";
import {ProgressSpinner} from 'primereact/progressspinner';
import {Toast} from 'primereact/toast';
import {isCustomer, isManager} from "../../../verifyRole";

export default function DropOrder() {
    const jwtToken = localStorage.getItem('jwtToken');
    const authToken = localStorage.getItem('authToken');
    if (!isManager(jwtToken, authToken) && !isCustomer(jwtToken, authToken)) {
        return <p>Trang này không tồn tại</p>;
    }
    const [SI, setSI] = useState([])
    const [loading, setLoading] = useState(false);
    const toast = useRef(null);

    const showToast = (severity, summary, detail) => {
        toast.current.show({severity: severity, summary: summary, detail: detail, life: 3000});
    }

    const fetchSI = () => {
        setLoading(true);

        getAllSIs().then(res => {
            setSI(res.data)
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setLoading(false)
        })
    }
    useEffect(() => {
        fetchSI();
    }, [])

    if (loading) {
        return (
            <div className="card">
                <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" fill="var(--surface-ground)"
                                 animationDuration=".5s"/>
            </div>
        )
    }
    return (
        <>
            <Toast ref={toast}/>
            <DropOrderTable SI={SI} fetchSI={fetchSI} showToast={showToast}/>
        </>
    )
}
