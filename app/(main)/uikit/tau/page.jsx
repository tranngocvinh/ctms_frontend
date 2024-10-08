/* eslint react-hooks/rules-of-hooks: 0 */
"use client"
import React, {useEffect, useRef, useState} from 'react';
import {ProgressSpinner} from 'primereact/progressspinner';
import {getShip} from "../../../api/ship";
import Table from "../../../components/Ship/dataTable";
import {Toast} from 'primereact/toast';
import {isAdmin} from "../../../verifyRole";

export default function ShipManage() {
    const jwtToken = localStorage.getItem('jwtToken');
    const authToken = localStorage.getItem('authToken');
    if (!isAdmin(jwtToken, authToken)) {
        return <p>Trang này không tồn tại</p>;
    }
    const [ships, setShips] = useState([])
    const [loading, setLoading] = useState(false);
    const toast = useRef(null);  // Create the toast reference here

    const showToast = (severity, summary, detail) => {
        toast.current.show({severity, summary, detail});
    };
    const fetchShips = () => {
        setLoading(true);
        getShip(getAuthConfig).then(res => {
            setShips(res.data)
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setLoading(false)
        })
    }
    const getAuthConfig = () => ({
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
    });
    useEffect(() => {
        fetchShips();
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
            <Table ships={ships} fetchShips={fetchShips} showToast={showToast}/>
        </>
    )
}
