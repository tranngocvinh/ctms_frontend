"use client"
import React, {useEffect, useState} from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import SizeDemo from "@/app/components/sidebar";
import {Stack} from "immutable";
import 'primeflex/primeflex.css';
import 'primereact/resources/themes/saga-blue/theme.css';  // Theme
import 'primereact/resources/primereact.min.css';          // Core CSS
import 'primeicons/primeicons.css';                        // Icons
import 'primeflex/primeflex.css';
import {getContainers, getImageById} from "../../../api/client";
import CardContainer from "../../../components/card";

export default function AdvancedDemo() {

    const [containers,setContainers] = useState([])
    const [loading, setLoading] = useState(false);

    const fetchContainers = () =>{
        getContainers().then(res => {
            setContainers(res.data)
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            console.log(err);
        })
    }
    useEffect(() => {
        fetchContainers();
    }, [])





    return (
        <>
            <div class="flex flex-wrap" >
                {containers.map((container, index) => (

                    // eslint-disable-next-line react/jsx-key
                         <CardContainer {...container}/>

                ))}

            </div>
        </>
    );

}

