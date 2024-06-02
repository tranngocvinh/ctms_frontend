"use client";
import React, {useState} from 'react';
import { Image } from 'primereact/image';
import {Button} from "primereact/button";
import {uploadImage} from "../../../api/client";
import InputDemo from "../input/page";
import { InputText } from "primereact/inputtext";



export default function PreviewDemo() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [resultMessage, setResultMessage] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async () => {

            const formData = new FormData();
            formData.append("image", selectedFile);

            uploadImage(formData)
                .then(res =>{
                    console.log("success")
                }).catch(err => {
                    console.log(err)

            }).finally(() => {
                console.log("finish")

            })


    };

        return (
            <>
                <div className="card flex justify-content-center">
                    <Image src="http://localhost:8080/image/coffee2021.png" alt="Image" width="250" preview/>
                </div>

                <div className="p-inputgroup flex-1">
                    <InputText  label={"jkjkj"} type="file" accept="image/*" onChange={handleFileChange} />
                    <Button label={"Upload"} onClick={handleUpload} disabled={!selectedFile}/>

                </div>
            </>
        )
    }


