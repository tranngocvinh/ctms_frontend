"use client"
import React, { useState, useEffect, useRef} from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import {getImageById} from "../../../api/container_supplier";
import { ProgressSpinner } from 'primereact/progressspinner';
import {getContainers} from "../../../api/container_size";
import Table from "../../../components/ContainerCategories/dataTable";
import { Toast } from 'primereact/toast';


export default function TemplateDemo() {
    const [containers,setContainers] = useState([])
    const [loading, setLoading] = useState(false);
    const toast = useRef(null);  // Create the toast reference here

    const showToast = (severity, summary, detail) => {
        toast.current.show({ severity, summary, detail });
    };
    const fetchContainers = () =>{
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
