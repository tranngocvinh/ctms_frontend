"use client"
import React, {useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import {Formik, Form, useField} from 'formik';
import * as Yup from 'yup';
import {InputText} from 'primereact/inputtext';
import {InputTextarea} from 'primereact/inputtextarea';
import {Button} from 'primereact/button';
import {Message} from 'primereact/message';
import {FileUpload} from 'primereact/fileupload';
import 'primeflex/primeflex.css';
import {Toast} from 'primereact/toast';
import {uploadImage} from "../../api/container_supplier";
import SeverityDemo from "./Toast";

const MyTextInput = ({label, ...props}) => {
    const [field, meta] = useField(props);

    return (
        <div className="p-field p-col-12 p-md-6">
            <span className="p-float-label">
                <InputText id={props.id || props.name} {...field} {...props} />
                <label htmlFor={props.id || props.name}>{label}</label>
            </span>
            {meta.touched && meta.error ? (
                <Message severity="warn" text={meta.error}/>
            ) : null}
        </div>
    );
};

const MyTextInputArea = ({label, ...props}) => {
    const [field, meta] = useField(props);

    return (
        <div className="p-field p-col-12">
            <span className="p-float-label">
                <InputTextarea id={props.id || props.name} {...field} {...props} />
                <label htmlFor={props.id || props.name}>{label}</label>
            </span>
            {meta.touched && meta.error ? (
                <Message severity="warn" text={meta.error}/>
            ) : null}
        </div>
    );
};

const MyFileUpload = ({label, ...props}) => {
    const [field, meta, helpers] = useField(props);
    const { setValue } = helpers;
    const [fileName, setFileName] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
            setValue(file);
        }
    };

    const handleButtonClick = () => {
        document.getElementById(props.id || props.name).click();
    };

    return (
        <div className="p-field p-col-12">
            <input
                id={props.id || props.name}
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                style={{ display: 'none' }}
            />
            <Button type="button" label={label || 'Chọn ảnh'} onClick={handleButtonClick} className="p-button-outlined" />
            {fileName && <span className="p-ml-2">{fileName}</span>}
            {meta.touched && meta.error ? (
                <Message severity="warn" text={meta.error} />
            ) : null}
        </div>
    );
};


//check test
const CreateSupplierForm = ({fetchContainers}) => {

    return (
        <>

            <div className="p-grid p-justify-center p-align-center">

                <div className="p-col-12 p-md-8">
                    <Formik
                        initialValues={{
                            name: '',
                            address: '',
                            detailService: '',
                            email: '',
                            website: '',
                            phoneNumber: '',
                            image: null,
                        }}
                        validationSchema={Yup.object({
                            name: Yup.string()
                                .required('Vui lòng nhập tên hãng'),
                            address: Yup.string()
                                .required('Vui lòng nhập địa chỉ'),
                            detailService: Yup.string()
                                .min(10, 'Vui lòng nhập mô tả có độ dài lớn hơn 10 kí tự')
                                .required('Không được để trống'),
                            email: Yup.string()
                                .email('Vui lòng nhập đúng định dạng email')
                                .required('Không được để trống'),
                            website: Yup.string()
                                .matches(
                                    /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                                    'Vui lòng nhập đúng định dạng website'
                                )
                                .required('Không được để trống'),
                            phoneNumber: Yup.string()
                                .matches(/^[0-9]{10}$/, 'Vui lòng nhập đúng định dạng số điện thoại')
                                .required('Không được để trống'),
                            image: Yup.mixed()
                                .required('Vui lòng tải lên một hình ảnh'),
                        })}
                        onSubmit={(values, {setSubmitting}) => {

                            uploadImage(values).then(res => {

                                fetchContainers();


                            }).catch(err => {
                                console.log(err)
                            }).finally(() => {
                                console.log("finish")

                            })
                            setSubmitting(false);

                        }}
                    >
                        <Form className="p-fluid p-formgrid p-grid">
                            <MyTextInput
                                label="Tên"
                                name="name"
                                type="text"
                                placeholder="Cảng Hải Phòng"
                            />
                            <MyTextInput
                                label="Địa chỉ"
                                name="address"
                                type="text"
                                placeholder="Hà Đông - Hà Nội"
                            />

                            <MyTextInputArea
                                cols={25}
                                rows={10}
                                autoResize
                                label="Mô tả"
                                name="detailService"
                                type="text"
                                placeholder="Chuyên cung cấp...."
                            />

                            <MyTextInput
                                label="Email"
                                name="email"
                                type="email"
                                placeholder="jane@formik.com"
                            />

                            <MyTextInput
                                label="Website"
                                name="website"
                                type="text"
                                placeholder="vinacom.com.vn"
                            />

                            <MyTextInput
                                label="Số điện thoại"
                                name="phoneNumber"
                                type="text"
                                placeholder="0326260456"
                            />

                            <MyFileUpload
                                label=""
                                name="image"
                                mode="basic"
                            />

                            <div className="p-col-12">
                                <Button type="submit" label="Submit" className="p-button-primary"/>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </>
    );
};

export default CreateSupplierForm;
