"use client"
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import {getImageById} from "../../../api/container_supplier";
import { ProgressSpinner } from 'primereact/progressspinner';
import {getAllRepair} from "../../../api/repair";
import Table from "../../../components/Delivery/dataTable";
import axios from "axios";

export default function TemplateDemo() {
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
            .get(`http://localhost:8080/api/delivery-orders`,getAuthConfig())
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
