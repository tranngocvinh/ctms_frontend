"use client"
import React, {useRef, useState} from 'react';
import { Formik, Form, useField, useFormikContext } from 'formik';
import * as Yup from 'yup';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { update } from "../../api/container_size";

const MyTextInput = ({ label, ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(props);

    const handleChange = (e) => {
        setFieldValue(field.name, e.value);
    };

    return (
        <div className="p-field p-col-12 p-md-6">
            <label htmlFor={props.id || props.name}>{label}</label>
            <InputNumber
                id={props.id || props.name}
                value={field.value}
                onValueChange={handleChange}
                inputId="locale-user"
                minFractionDigits={2}
                {...props}
            />
            {meta.touched && meta.error ? (
                <Message severity="warn" text={meta.error} />
            ) : null}
        </div>
    );
};

const FormikDropdown = ({ label, ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(props);

    const handleChange = (e) => {
        setFieldValue(field.name, e.value.containerTypeId);
    };

    return (
        <div className="p-field">
            <label htmlFor={props.name}>{label}</label>
            <Dropdown
                {...field}
                {...props}
                value={props.options.find(option => option.containerTypeId === field.value) || null}
                onChange={handleChange}
                className="w-full md:w-14rem"
            />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
};

const containertype = [
    { name: 'Thường 20 feet', containerTypeId: 1 },
    { name: 'Thường 40 feet', containerTypeId: 2 },
    { name: 'Đông lạnh 20 feet', containerTypeId: 3 },
    { name: 'Đông lạnh 40 feet', containerTypeId: 4 },
];

const CreateSupplierForm = ({ fetchContainers, container }) => {
    const initialValues = {
        id: container?.id || '',
        containerTypeId: container?.containerTypeId || '',
        length: container?.length || '',
        width: container?.width || '',
        height: container?.height || '',
        volume: container?.volume || '',
        weight: container?.weight || '',
        loadCapacity: container?.loadCapacity || '',
        maxLoad: container?.maxLoad || '',
    };

    return (
        <div className="p-grid p-justify-center p-align-center">
            <div className="p-col-12 p-md-8">
                <Formik
                    initialValues={initialValues}
                    validationSchema={Yup.object({
                        containerTypeId: Yup.number().required('Không được để trống'),
                        length: Yup.number().required('Không được để trống'),
                        width: Yup.number().required('Không được để trống'),
                        height: Yup.number().required('Không được để trống'),
                        volume: Yup.number().required('Không được để trống'),
                        weight: Yup.number().required('Không được để trống'),
                        loadCapacity: Yup.number().required('Không được để trống'),
                        maxLoad: Yup.number().required('Không được để trống'),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        update(values.id, values).then(res => {
                            fetchContainers();
                        }).catch(err => {
                            console.log(err);
                        }).finally(() => {
                            setSubmitting(false);
                            console.log("finish");
                        });
                    }}
                >
                    <Form className="p-fluid p-formgrid p-grid">
                        <FormikDropdown
                            name="containerTypeId"
                            options={containertype}
                            optionLabel="name"
                            placeholder="Chọn loại container"
                            className="w-full md:w-14rem"
                            label="Loại container"
                        />
                        <MyTextInput
                            label="Chiều dài"
                            name="length"
                            type="text"
                        />
                        <MyTextInput
                            label="Chiều rộng"
                            name="width"
                            type="text"
                        />
                        <MyTextInput
                            label="Chiều cao"
                            name="height"
                            type="text"
                        />
                        <MyTextInput
                            label="Thể tích"
                            name="volume"
                            type="text"
                        />
                        <MyTextInput
                            label="Cân nặng"
                            name="weight"
                            type="text"
                        />
                        <MyTextInput
                            label="Tải trọng chứa hàng"
                            name="loadCapacity"
                            type="text"
                        />
                        <MyTextInput
                            label="Tải trọng tối đa"
                            name="maxLoad"
                            type="text"
                        />
                        <div className="p-col-12">
                            <Button type="submit" label="Submit" className="p-button-primary" />
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default CreateSupplierForm;
