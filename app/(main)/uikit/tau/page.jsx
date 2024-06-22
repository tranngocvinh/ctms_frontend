"use client"
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { ProgressSpinner } from 'primereact/progressspinner';
import {getShip} from "../../../api/ship";
import Table from "../../../components/ship/dataTable";

export default function TemplateDemo() {
    const [ships,setShips] = useState([])
    const [loading, setLoading] = useState(false);

    const fetchShips = () =>{
        setLoading(true);

        getShip().then(res => {
            setShips(res.data)
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setLoading(false)
        })
    }
    useEffect(() => {
        fetchShips();
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
            <Table  ships={ships} fetchShips={fetchShips}/>
        </>
    )
}
