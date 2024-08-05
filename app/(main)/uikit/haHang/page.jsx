"use client"
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import {getAllSIs} from "../../../api/drop_order";
import Table from "../../../components/DropOrder/dataTable";
import { ProgressSpinner } from 'primereact/progressspinner';

export default function TemplateDemo() {
    const [SI,setSI] = useState([])
    const [loading, setLoading] = useState(false);

    const fetchSI = () =>{
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
                <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
            </div>
        )
    }
    return(
        <>
            <Table  SI={SI} fetchSI={fetchSI}/>
        </>
    )
}
