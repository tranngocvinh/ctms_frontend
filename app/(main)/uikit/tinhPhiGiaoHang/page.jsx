/* eslint react-hooks/rules-of-hooks: 0 */
"use client"
import React, {useEffect, useState} from 'react';
import {ProgressSpinner} from 'primereact/progressspinner';
import Table from "../../../components/Delivery/dataTable";
import axios from "axios";
import {isCustomer, isManager, isStaff} from "../../../verifyRole";
export default function DeliveryOrderFee() {
    const jwtToken = localStorage.getItem('jwtToken');
    const authToken = localStorage.getItem('authToken');
    if(!isManager(jwtToken, authToken) && !isCustomer(jwtToken, authToken) && !isStaff(jwtToken, authToken)){
        return <p>Trang này không tồn tại</p>;
    }
    const [delivery,setDelivery] = useState([])
    const [loading, setLoading] = useState(false);
    const getAuthConfig = () => ({
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
        }
    })
    const fetchDelivery = () =>{
        setLoading(true);

        axios
            .get(`https://auth.g42.biz/api/delivery-orders`,getAuthConfig())
            .then(res => {
            setDelivery(res.data)
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setLoading(false)
        })
    }
    useEffect(() => {
        fetchDelivery();
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
            <Table  delivery={delivery} fetchDelivery={fetchDelivery}/>
        </>
    )
}
