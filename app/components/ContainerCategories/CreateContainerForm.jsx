"use client"
import React, { useEffect } from 'react';
import { Formik, Form, useField, useFormikContext } from 'formik';
import * as Yup from 'yup';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Dropdown } from "primereact/dropdown";
import ErrorGlobal from "../error_message_global";

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
                minFractionDigits={2}
                {...props}
            />
            {meta.touched && meta.error ? (
                <small className="p-error">{meta.error}</small>
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
            <label htmlFor={props.containerTypeId || props.name}>{label}</label>
            <Dropdown
                {...field}
                {...props}
                value={props.options.find(option => option.containerTypeId === field.value) || null}
                onChange={handleChange}
                className="w-full md:w-14rem"
            />
            {meta.touched && meta.error ? (
                <small className="p-error">{meta.error}</small>
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

const CreateSupplierForm = ({ fetchContainers }) => {
    const blankError = Yup.number().required(ErrorGlobal.blankError);
    return (
        <div className="p-grid p-justify-center p-align-center">
            <div className="p-col-12 p-md-8">
                <Formik
                    initialValues={{
                        containerType: { id: '' },
                        length: '',
                        width: '',
                        height: '',
                        volume: '',
                        weight: '',
                        loadCapacity: '',
                        maxLoad: '',
                    }}

                    validationSchema={Yup.object({
                        containerType: Yup.object().shape({
                            id: Yup.string().required('Vui lòng chọn loại container')
                        }),
                        length: blankError,
                        width: blankError,
                        height: blankError,
                        volume: blankError,
                        weight: blankError,
                        loadCapacity: blankError,
                        maxLoad: blankError,
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        add(values).then(res => {
                            fetchContainers();
                        }).catch(err => {
                            console.log(err);
                        }).finally(() => {
                            console.log("finish");
                        });
                        setSubmitting(false);
                    }}
                >
                    {({ values, setFieldValue }) => {
                        useEffect(() => {
                            if (values.length && values.width && values.height) {
                                const volume = values.length * values.width * values.height;
                                setFieldValue('volume', volume);
                            }
                        }, [values.length, values.width, values.height, setFieldValue]);

                        return (
                            <Form className="p-fluid p-formgrid p-grid">
                                <FormikDropdown
                                    name="containerType.id"
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
                                    disabled
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
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
};

export default CreateSupplierForm;
