"use client"
import React, {useEffect, useState} from 'react';
import {ProgressSpinner} from 'primereact/progressspinner';
import {getRoutes} from "/app/api/routes";
import Table from "/app/components/RouteDetail/dataTable";

export default function TemplateDemo() {
    const [routes,setRoutes] = useState([])
    const [loading, setLoading] = useState(false);

    const fetchRoutes = () =>{
        setLoading(true);

        getRoutes().then(res => {
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
