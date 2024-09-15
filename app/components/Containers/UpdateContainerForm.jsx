"use client"
import React, {useEffect, useState} from 'react';
import 'primeflex/primeflex.css';
import 'primereact/resources/themes/saga-blue/theme.css'; // theme
import 'primereact/resources/primereact.min.css'; // core css
import 'primeicons/primeicons.css'; // icons
import {Form, Formik, useField} from 'formik';
import {InputText} from 'primereact/inputtext';
import {Dropdown} from 'primereact/dropdown';
import {Calendar} from 'primereact/calendar';
import {Button} from 'primereact/button';
import * as Yup from 'yup';
import axios from 'axios';

const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <div className="field grid">
            <label className="col-12 mb-2 md:col-4" htmlFor={props.id || props.name}>{label}</label>
            <div className="col-12 md:col-8">
                <InputText id={props.id || props.name} {...field} {...props} />
                {meta.touched && meta.error ? (
                    <small className="p-error">{meta.error}</small>
                ) : null}
            </div>
        </div>
    );
};

const MyDropdown = ({ label, options, onChange, ...props }) => {
    const [field, meta, helpers] = useField(props);

    return (
        <div className="field grid">
            <label className="col-12 mb-2 md:col-4 md:mb-0" htmlFor={props.id || props.name}>{label}</label>
            <div className="col-12 md:col-8">
                <Dropdown
                    id={props.id || props.name}
                    {...field}
                    options={options}
                    onChange={(e) => {
                        helpers.setValue(e.value);
                        if (onChange) onChange(e);
                    }}
                    placeholder="Chọn..."
                    style={{ width: "60%" }}
                />
                {meta.touched && meta.error ? (
                    <small className="p-error">{meta.error}</small>
                ) : null}
            </div>
        </div>
    );
};

const MyCalendar = ({ label, ...props }) => {
    const [field, meta, helpers] = useField(props);

    return (
        <div className="field grid">
            <label className="col-12 mb-2 md:col-4" htmlFor={props.id || props.name}>{label}</label>
            <div className="col-12 md:col-8">
                <Calendar
                    id={props.id || props.name}
                    {...field}
                    {...props}
                    value={field.value || null}
                    onChange={(e) => helpers.setValue(e.value)}
                    showIcon
                />
                {meta.touched && meta.error ? (
                    <small className="p-error">{meta.error}</small>
                ) : null}
            </div>
        </div>
    );
};

const RepairContainerForm = ({ container, fetchContainers }) => {
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        fetchSuppliers();
    }, []);

    const fetchSuppliers = async () => {
        try {
            const response = await axios.get(`https://auth.g42.biz/api/v1/supplier`);
            setSuppliers(response.data);
        } catch (error) {
            console.error('Error fetching suppliers:', error);a
        }
    };

    return (
        <div className="p-grid p-justify-center p-align-center">
            <div className="p-col-12 p-md-10">
                <Formik
                    initialValues={{
                        supplier: {supplierId:''},
                        repairCost: '',
                        repairDate: '',
                        description: ''
                    }}
                    validationSchema={Yup.object({
                        // supplier: Yup.object().shape({
                        //     supplierId: Yup.string().required('Vui lòng chọn loại container')
                        // ),
                        repairCost: Yup.number().required('Vui lòng nhập chi phí sửa chữa').min(1, 'Chi phí phải lớn hơn 0'),
                        repairDate: Yup.date().required('Vui lòng chọn ngày sửa chữa'),
                        description: Yup.string().required('Vui lòng nhập mô tả chi tiết về việc sửa chữa'),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        const repairData = {
                            container: { containerCode: container.containerCode },
                            supplier: { supplierId: values.supplierId },
                            repairCost: values.repairCost,
                            repairDate: values.repairDate,
                            description: values.description
                        };

                        axios.post(`https://auth.g42.biz/api/v1/repair`, repairData)
                            .then(res => {
                                fetchContainers();
                            })
                            .catch(err => {
                                alert("Error: " + err);
                            })
                            .finally(() => {
                                setSubmitting(false);
                                alert("Sửa chữa thành công!");
                            });
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <MyDropdown
                                label="Đơn vị sửa chữa"
                                name="supplierId"
                                options={suppliers.map(s => ({ label: s.name, value: s.supplierId }))}
                            />
                            <MyTextInput
                                label="Chi phí sửa chữa (VND)"
                                name="repairCost"
                                type="number"
                                keyfilter="num"
                                placeholder="Nhập chi phí sửa chữa"
                            />
                            <MyCalendar
                                label="Ngày sửa chữa"
                                name="repairDate"
                                placeholder="Chọn ngày sửa chữa"
                            />
                            <MyTextInput
                                label="Mô tả"
                                name="description"
                                type="text"
                                placeholder="Nhập mô tả chi tiết"
                            />
                            <div className="p-col-12">
                                <Button type="submit" label="Submit" className="p-button-primary" disabled={isSubmitting} />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default RepairContainerForm;
