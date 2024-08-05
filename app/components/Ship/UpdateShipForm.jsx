"use client"
import React from 'react';
import {Formik, Form, useField, useFormikContext} from 'formik';
import * as Yup from 'yup';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Message} from 'primereact/message';
import 'primeflex/primeflex.css';
import {Dropdown} from "primereact/dropdown";
import {update} from "../../api/ship";
import {InputNumber} from "primereact/inputnumber";

const MyTextInput = ({label, ...props}) => {
    const [field, meta] = useField(props);

    return (
        <div className="p-field p-col-12 p-md-6">
            <label htmlFor={props.id || props.name}>{label}</label>
            <InputText id={props.id || props.name} {...field} {...props} />

            {meta.touched && meta.error ? (
                <Message severity="warn" text={meta.error}/>
            ) : null}
        </div>
    );
};

const MyDoubleInput = ({label, ...props}) => {
    const {setFieldValue} = useFormikContext();
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
                <Message severity="warn" text={meta.error}/>
            ) : null}
        </div>
    );
};

const FormikDropdown = ({label, ...props}) => {
    const {setFieldValue, values} = useFormikContext();
    const [field, meta] = useField(props);

    const handleChange = (e) => {
        setFieldValue(field.name, e.value);
    };

    return (
        <div className="p-field">
            <label htmlFor={props.name}>{label}</label>
            <Dropdown
                {...field}
                {...props}
                value={values[props.name] || ''}
                onChange={handleChange}
                className="w-full md:w-14rem"
                optionLabel="name"
            />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
};

const status_ship = [
    {name: 'Đang hoạt động', value: 'ACTIVE'},
    {name: 'Không hoạt động', value: 'INACTIVE'},
    {name: 'Đang bảo trì', value: 'UNDER_MAINTENANCE'},
];

const CreateShipForm = ({fetchShips, ships}) => {
    const initialValues = {
        id: ships?.id || '' ,
        name: ships?.name || '',
        company: ships?.company || '',
        capacity: ships?.capacity || '',
        registrationNumber: ships?.registrationNumber || '',
        yearBuilt: ships?.yearBuilt || '',
        status: ships?.status || '', // Sửa lại để lấy đúng giá trị từ ships
    };
    return (
        <div className="p-grid p-justify-center p-align-center">
            <div className="p-col-12 p-md-8">
                <Formik
                    initialValues={initialValues}
                    validationSchema={Yup.object({
                        name: Yup.string().required('Không được để trống'),
                        company: Yup.string().required('Không được để trống'),
                        capacity: Yup.number().required('Không được để trống'),
                        registrationNumber: Yup.string().required('Không được để trống'),
                        yearBuilt: Yup.number().required('Không được để trống').max(new Date().getFullYear(), 'Năm phải nhỏ hơn hoặc bằng năm hiện tại'),
                    })}
                    onSubmit={(values, {setSubmitting}) => {
                        update(values.id, values).then(res => {
                            fetchShips();
                        }).catch(err => {
                            console.log(err)
                        }).finally(() => {
                            setSubmitting(false);
                            console.log("finish");
                        });
                    }}
                >
                    <Form className="p-fluid p-formgrid p-grid">
                        <MyTextInput
                            label="Tên"
                            name="name"
                            type="text"
                        />
                        <MyTextInput
                            label="Công ty"
                            name="company"
                            type="text"
                        />
                        <MyDoubleInput
                            label="Trọng tải"
                            name="capacity"
                            type="number"
                        />
                        <MyTextInput
                            label="Số đăng ký"
                            name="registrationNumber"
                            type="text"
                        />
                        <MyTextInput
                            label="Năm thành lập"
                            name="yearBuilt"
                            type="text"
                        />
                        <FormikDropdown
                            name="status"
                            options={status_ship}
                            optionLabel="name"
                            placeholder="Chọn trạng thái tàu"
                            className="w-full md:w-14rem"
                            label="Trạng Thái"
                        />
                        <div className="p-col-12">
                            <Button type="submit" label="Submit" className="p-button-primary"/>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default CreateShipForm;
