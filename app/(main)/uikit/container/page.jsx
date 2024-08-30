/* eslint react-hooks/rules-of-hooks: 0 */
"use client"
import React, {useEffect, useRef, useState} from 'react';
import {ProgressSpinner} from 'primereact/progressspinner';
import {getContainers} from "../../../api/container_size";
import Table from "../../../components/ContainerCategories/dataTable";
import {Toast} from 'primereact/toast';
import {isAdmin} from "../../../verifyRole";

export default function ContainerType() {
    const jwtToken = localStorage.getItem('jwtToken');
    const authToken = localStorage.getItem('authToken');
    if(!isAdmin(jwtToken, authToken)) {
        return <p>Trang này không tồn tại</p>;
    }
    const [containers,setContainers] = useState([])
    const [loading, setLoading] = useState(false);
    const toast = useRef(null);

    const showToast = (severity, summary, detail) => {
        toast.current.show({ severity, summary, detail });
    };
    const fetchContainers = () =>{
        setLoading(true);
        getContainers().then(res => {
            setContainers(res.data)
        }).catch(err => {

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
                <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
            </div>
        )
    }
    return(
        <>
            <Toast ref={toast} />
            <Table  containers={containers} fetchContainers={fetchContainers} showToast={showToast}/>
        </>
    )
}
