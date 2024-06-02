"use client"
import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import {getImageById} from "../api/client";

export default function CardContainer({supplierId,name,email,detailService}) {
    const header = (
        <img alt="Card" src={getImageById(supplierId)} />
    );
    const footer = (
        <>
            <Button label="Save" icon="pi pi-check" />
            <Button label="Cancel" severity="secondary" icon="pi pi-times" style={{ marginLeft: '0.5em' }} />
        </>
    );

    return (
        <div className="card flex justify-content-center">
            <Card title={email} subTitle={name} footer={footer} header={header} className="md:w-25rem">
                <p className="m-0">
                    {detailService}
                </p>
            </Card>
        </div>
    )
}
