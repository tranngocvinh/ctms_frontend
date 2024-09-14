"use client"
import React, {useEffect} from 'react';
import {Form, Formik, useField, useFormikContext} from 'formik';
import * as Yup from 'yup';
import {InputNumber} from 'primereact/inputnumber';
import {Button} from 'primereact/button';
import {Dropdown} from "primereact/dropdown";
import ErrorGlobal from "../error_message_global";
import {add} from "../../api/container_size";

const MyTextInput = ({ label, ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(props);

    const handleChange = (e) => {
        setFieldValue(field.name, e.value);
    };

    return (
        <div className="p-field p-col-12 p-md-6 them-container-field">
            <label htmlFor={props.id || props.name}>{label}</label>
            <InputNumber
                id={props.id || props.name}
                value={field.value}
                onValueChange={handleChange}
                {...props}
                maxFractionDigits={3}
                locale="vi-VN"
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
        <div className="p-field them-container-dropdown">
            <label htmlFor={props.containerTypeId || props.name}>{label}</label>
            <Dropdown
                {...field}
                {...props}
                value={props.options.find(option => option.containerTypeId === field.value) || null}
                onChange={handleChange}
                className="w-full md:w-14rem them-container-dropdown-2"
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

const CreateSupplierForm = ({ fetchContainers, showToast }) => {
    const blankError = Yup.number().required(ErrorGlobal.blankError).positive("Giá trị phải lớn hơn 0");
    return (
        <div className="p-grid p-justify-center p-align-center them-container-form">
            <div className="p-col-12 p-md-8 them-container-form-md">
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
                            showToast('success', 'Thành công', 'Thêm container thành công!');
                            setTimeout(() => {
                                fetchContainers();
                            },1000)
                        }).catch(err => {
                            showToast('error', 'Thất bại', 'Thêm container thất bại!');
                        }).finally(() => {
                            console.log("finish");
                        });
                        setSubmitting(false);
                    }}
                >
                    {({ values, setFieldValue }) => {
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        useEffect(() => {
                            if (values.containerType?.id) {
                                if (values.containerType.id === 4) { //lanh 40ft
                                    setFieldValue('length', 12.19);
                                    setFieldValue('width', 2.44);
                                    setFieldValue('height', 2.59);
                                    setFieldValue('volume', 58.9);
                                    setFieldValue('weight', 4.11);
                                    setFieldValue('loadCapacity', 28.39);
                                    setFieldValue('maxLoad', 32.5);

                                }
                                if (values.containerType.id === 3) { //lanh 20ft
                                    setFieldValue('length', 6.06);
                                    setFieldValue('width', 2.44);
                                    setFieldValue('height', 2.59);
                                    setFieldValue('volume', 28.4);
                                    setFieldValue('weight', 3.2);
                                    setFieldValue('loadCapacity', 27.28);
                                    setFieldValue('maxLoad', 30.48);

                                }
                                if (values.containerType.id === 2) { //thuong 40ft
                                    setFieldValue('length', 12.19);
                                    setFieldValue('width', 2.44);
                                    setFieldValue('height', 2.59);
                                    setFieldValue('volume', 67.6);
                                    setFieldValue('weight', 3.73);
                                    setFieldValue('loadCapacity', 26.75);
                                    setFieldValue('maxLoad', 30.48);

                                }
                                if (values.containerType.id === 1) { //thuong 20ft
                                    setFieldValue('length', 6.06);
                                    setFieldValue('width', 2.44);
                                    setFieldValue('height', 2.59);
                                    setFieldValue('volume', 33.2);
                                    setFieldValue('weight', 2.2);
                                    setFieldValue('loadCapacity', 28.28);
                                    setFieldValue('maxLoad', 30.48);

                                }
                            }
                        }, [values.containerType, setFieldValue]);

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
                                    suffix =" mét"

                                />
                                <MyTextInput
                                    label="Chiều rộng"
                                    name="width"
                                    type="text"
                                    suffix =" mét"
                                />
                                <MyTextInput
                                    label="Chiều cao"
                                    name="height"
                                    type="text"
                                    suffix =" mét"
                                />
                                <MyTextInput
                                    label="Thể tích"
                                    name="volume"
                                    type="text"
                                    suffix =" m³"
                                    disabled
                                />
                                <MyTextInput
                                    label="Cân nặng"
                                    name="weight"
                                    type="text"
                                    suffix =" tấn"
                                />
                                <MyTextInput
                                    label="Tải trọng chứa hàng"
                                    name="loadCapacity"
                                    type="text"
                                    suffix =" tấn"
                                />
                                <MyTextInput
                                    label="Tải trọng tối đa"
                                    name="maxLoad"
                                    type="text"
                                    suffix =" tấn"
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
