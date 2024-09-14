/* eslint react-hooks/rules-of-hooks: 0 */
"use client"
import React, {useEffect, useRef, useState} from 'react';
import {ProgressSpinner} from 'primereact/progressspinner';
import {getContainers} from "../../../api/container";
import Table from "../../../components/Containers/dataTable";
import {Toast} from 'primereact/toast';
import {isCustomer, isManager, isStaff} from "../../../verifyRole";

export default function ContainerStatus() {
    const jwtToken = localStorage.getItem('jwtToken');
    const authToken = localStorage.getItem('authToken');
    if (!isManager(jwtToken, authToken) && !isCustomer(jwtToken, authToken) && !isStaff(jwtToken, authToken)) {
        return <p>Trang này không tồn tại</p>;
    }
    const [containers, setContainers] = useState([])
    const [loading, setLoading] = useState(false);
    const toast = useRef(null);
    const showToast = (severity, summary, detail) => {
        toast.current.show({severity, summary, detail});
    };
    const fetchContainers = () => {
        setLoading(true);

        getContainers().then(res => {
            setContainers(res.data)
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setLoading(false)
        })
    }
    useEffect(() => {
        fetchContainers();
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
            <Table containers={containers} fetchContainers={fetchContainers} showToast={showToast}/>
        </>
    )
}
