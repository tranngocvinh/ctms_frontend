'use client';
import React, {useState} from 'react';
import { FileUpload } from 'primereact/fileupload';
import {uploadImage} from "../../../api/container_supplier";

const FileUploadDemo = () => {

    const [selectedFile, setSelectedFile] = useState(null);


    const  invoiceUploadHandler = (e) => {
        setSelectedFile(e.target.files[0]);
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
    }

    return (
        <div>
            <h3>File Upload</h3>
            <FileUpload name="invoice"
                        accept="image/*"
                        customUpload={true}
                        onChange={invoiceUploadHandler}
                        mode="basic"
                        auto={true}
            />
        </div>
    );
};

export default FileUploadDemo;
