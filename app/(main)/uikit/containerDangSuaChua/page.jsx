"use client"
import React, {useEffect, useState} from 'react';
import {ProgressSpinner} from 'primereact/progressspinner';
import {getAllRepair} from "../../../api/repair";
import Table from "../../../components/Repair/dataTable";

export default function TemplateDemo() {
    const [repair,setRepair] = useState([])
    const [loading, setLoading] = useState(false);

    const fetchRepair = () =>{
        setLoading(true);

        getAllRepair().then(res => {
            setRepair(res.data)
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setLoading(false)
        })
    }
    useEffect(() => {
        fetchRepair();
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
            <Table  repair={repair} fetchRepair={fetchRepair}/>
        </>
    )
}
