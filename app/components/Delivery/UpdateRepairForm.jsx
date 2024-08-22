"use client"
import React from 'react';
import {Formik, Form, useField, useFormikContext} from 'formik';
import * as Yup from 'yup';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Message} from 'primereact/message';
import 'primeflex/primeflex.css';
import {Dropdown} from "primereact/dropdown";
import {update} from "../../api/repair";
import {InputNumber} from "primereact/inputnumber";
import {Calendar} from "primereact/calendar";

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
                id={props.id || props.name} {...field} {...props}
                value={field.value}
                onValueChange={handleChange}
                inputId="locale-user"
                minFractionDigits={2}
            />

            {meta.touched && meta.error ? (
                <Message severity="warn" text={meta.error}/>
            ) : null}
        </div>
    );
};

const MyCalendar = ({ label, ...props }) => {
    const [field, meta, helpers] = useField(props);

    return (
        <div className="p-field p-col-12 p-md-6">
            <label className="col-12 mb-2 md:col-4" htmlFor={props.id || props.name}>{label}</label>
                <Calendar
                    id={props.id || props.name}
                    {...field}
                    {...props}
                    value={field.value || null}
                    onChange={(e) => helpers.setValue(e.value)}
                    showIcon/>
                {meta.touched && meta.error ? (
                    <small className="p-error">{meta.error}</small>
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
    {name: 'Đang hoạt động', value: 'Đang hoạt động'},
    {name: 'Đang bảo trì', value: 'Đang bảo trì'},
];

const CreateShipForm = ({ repair, fetchRepair }) => {
    const initialValues = {
        id: repair.id || '',
        containerCode: repair.containerCode || '',
        containerSupplierId: repair?.containerSupplierId || '',
        repairCode: repair?.repairCode || '',
        repairDate: repair?.repairDate ? new Date(repair.repairDate) : '', // Convert to Date object
        description: repair?.description || '',
    };

    return (
        <div className="p-grid p-justify-center p-align-center">
            <div className="p-col-12 p-md-8">
                <Formik
                    initialValues={initialValues}
                    validationSchema={Yup.object({
                        containerCode: Yup.string().required('Không được để trống'),
                        containerSupplierId: Yup.string().required('Không được để trống'),
                        repairCode: Yup.number().required('Không được để trống'),
                        repairDate: Yup.date().required('Không được để trống'), // Ensure it's a date
                        description: Yup.string().required('Không được để trống'),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        const formattedValues = {
                            ...values,
                            repairDate: values.repairDate.toISOString().split('T')[0], // Format to YYYY-MM-DD
                        };
                        update(values.id, formattedValues).then(res => {
                            fetchRepair();
                        }).catch(err => {
                            console.log(err);
                        }).finally(() => {
                            setSubmitting(false);
                            console.log("finish");
                        });
                    }}
                >
                    <Form className="p-fluid p-formgrid p-grid">
                        <MyTextInput
                            label="Mã container code"
                            name="containerCode"
                            type="text"
                            disabled
                        />

                        <MyDoubleInput
                            label="Giá sửa chữa"
                            name="repairCode"
                            type="text"
                        />

                        <MyCalendar
                            label="Ngày sửa chữa"
                            name="repairDate"
                            type="text"
                        />

                        <MyTextInput
                            label="Ghi chú"
                            name="description"
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

export default CreateShipForm;
