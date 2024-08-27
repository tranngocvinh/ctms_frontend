"use client"
import React, {useEffect, useRef, useState} from 'react';
import {getAllSIs} from "../../../api/drop_order";
import Table from "../../../components/DropOrder/dataTable";
import {ProgressSpinner} from 'primereact/progressspinner';
import {Toast} from 'primereact/toast';

export default function TemplateDemo() {
    const [SI,setSI] = useState([])
    const [loading, setLoading] = useState(false);
    const toast = useRef(null);

    const showToast = (severity,summary,detail) => {
        toast.current.show({severity:severity, summary: summary, detail:detail, life: 3000});
    }

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
            <Toast ref={toast} />
            <Table  SI={SI} fetchSI={fetchSI} showToast={showToast}/>
        </>
    )
}
