"use client"
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { ProgressSpinner } from 'primereact/progressspinner';
import {getRoute} from "../../../api/route";
import Table from "app/components/RouteDetail/dataTable";

export default function TemplateDemo() {
    const [routes,setRoutes] = useState([])
    const [loading, setLoading] = useState(false);

    const fetchRoutes = () =>{
        setLoading(true);

        getRoute().then(res => {
            setRoutes(res.data)
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setLoading(false)
        })
    }
    useEffect(() => {
        fetchRoutes();
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
            <Table  routes={routes} fetchRoutes={fetchRoutes}/>
        </>
    )
}
