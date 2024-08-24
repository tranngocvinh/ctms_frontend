"use client"
import React, {useState, useEffect, useRef} from 'react';
import 'primeflex/primeflex.css';
import 'primereact/resources/themes/saga-blue/theme.css'; // theme
import 'primereact/resources/primereact.min.css'; // core css
import 'primeicons/primeicons.css'; // icons
import { Formik, Form, useField } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import * as Yup from 'yup';
import axios from 'axios';
import { add } from '/app/api/container';
import {MultiSelect} from "primereact/multiselect";
import { Toast } from 'primereact/toast';


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
                    style={{ width: "100%" }}
                    disabled={props.disabled} // Add the disabled prop here
                />
                {meta.touched && meta.error ? (
                    <small className="p-error">{meta.error}</small>
                ) : null}
            </div>
        </div>
    );
};

const MyMultiSelect = ({ label, options, onChange, ...props }) => {
    const [field, meta, helpers] = useField(props);

    return (
        <div className="field grid">
            <label className="col-12 mb-2 md:col-4 md:mb-0" htmlFor={props.id || props.name}>{label}</label>
            <div className="col-12 md:col-8">
                <MultiSelect
                    id={props.id || props.name}
                    {...field}
                    options={options}
                    onChange={(e) => {
                        helpers.setValue(e.value);
                        if (onChange) onChange(e);
                    }}
                    placeholder="Chọn..."
                    style={{ width: "100%" }}
                    disabled={props.disabled}
                />
                {meta.touched && meta.error ? (
                    <small className="p-error">{meta.error}</small>
                ) : null}
            </div>
        </div>
    );
};

const ResetFieldValues = ({ status, setFieldValue, setFieldTouched }) => {
    useEffect(() => {
        if (status !== 'In Transit') {
            setFieldValue('shipSchedules', []);
            setFieldTouched('shipSchedules', false);
        }
        if (status !== 'Under Maintenance') {
            setFieldValue('containerSupplier.id', '');
            setFieldTouched('containerSupplier.id', false);
        }
        if (status !== 'In Port' && status !== 'Under Maintenance') {
            setFieldValue('portLocation.id', '');
            setFieldTouched('portLocation.id', false);
        }
    }, [status, setFieldValue, setFieldTouched]);

    return null;
};

const CreateContainerForm = ({ fetchContainers,showToast }) => {
    const [ships, setShips] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [containerSizes, setContainerSizes] = useState([]);
    const [portLocations, setPortLocations] = useState([]);
    const [containerSuppliers, setContainerSuppliers] = useState([]);
    const [shipSchedules, setShipSchedules] = useState([]);
    const toast = useRef(null); // Create a reference for the Toast component

    useEffect(() => {
        fetchShips();
        fetchSchedules();
        fetchContainerSizes();
        fetchPortLocations();
        fetchContainerSuppliers();
        fetchShipSchedules();

    }, []);

    const fetchShips = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/ships`);
            setShips(response.data);
        } catch (error) {
            console.error('Error fetching ships:', error);
        }
    };

    const fetchSchedules = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/schedules`);
            setSchedules(response.data);
        } catch (error) {
            console.error('Error fetching schedules:', error);
        }
    };

    const fetchContainerSizes = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/containers/sizes`);
            setContainerSizes(response.data);
        } catch (error) {
            console.error('Error fetching container sizes:', error);
        }
    };

    const fetchPortLocations = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/ports`);
            setPortLocations(response.data);
        } catch (error) {
            console.error('Error fetching port locations:', error);
        }
    };

    const fetchContainerSuppliers = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/supplier`);
            setContainerSuppliers(response.data);
        } catch (error) {
            console.error('Error fetching container suppliers:', error);
        }
    };

    const fetchShipSchedules = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/shipSchedules`);
            setShipSchedules(response.data);
        } catch (error) {
            console.error('Error fetching ship schedules:', error);
        }
    };

    const containerStatuses = [
        { label: 'Đang di chuyển', value: 'In Transit' },
        { label: 'Đang sửa chữa', value: 'Under Maintenance' },
        { label: 'Đang nằm ở cảng', value: 'In Port' }
    ];

    return (

        <div className="p-grid p-justify-center p-align-center">

            <div className="p-col-12 p-md-10">

                <Formik
                    initialValues={{
                        containerCode: '',
                        containerSize: { id: '' },
                        shipSchedules: [{ schedule: { id: '' }, ship: { id: '' } }],
                        status: 'In Port',
                        portLocation: { id: '' },
                        containerSupplier: { id: '' }
                    }}
                    validationSchema={Yup.object({
                        containerCode: Yup.string().required('Vui lòng nhập mã định danh'),
                        containerSize: Yup.object().shape({
                            id: Yup.string().required('Vui lòng chọn kích thước container')
                        }),


                        portLocation: Yup.object().shape({
                            id: Yup.string().nullable()
                        }),

                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        const cleanedValues = {
                            ...values,
                            shipSchedules: values.shipSchedules.filter(ss => ss.schedule.id && ss.ship.id)
                        };

                        add(cleanedValues).then(res => {
                            showToast('success', 'Thành công', 'Thêm container thành công!');
                            setTimeout(() => {
                                fetchContainers();
                            }, 1000); // Delay the fetch by 1 second
                        }).catch(err => {
                            showToast('error', 'Lỗi', 'Đã tồn tại mã container trong hệ thống');
                        }).finally(() => {
                            setSubmitting(false);
                        });
                    }}

                >
                    {({ isSubmitting, setFieldValue, values, setFieldTouched }) => {
                        return (
                            <Form className="">
                                <ResetFieldValues status={values.status} setFieldValue={setFieldValue} setFieldTouched={setFieldTouched} />
                                <MyTextInput
                                    label="Nhập mã định danh container"
                                    name="containerCode"
                                    type="text"
                                    placeholder="Mã định danh"
                                />
                                <MyDropdown
                                    label="Kích thước Container"
                                    name="containerSize.id"
                                    options={containerSizes.map(containerSize => ({
                                        label: `ID: ${containerSize.id} - Kích thước: ${containerSize.length} x ${containerSize.width} x ${containerSize.height}`,
                                        value: containerSize.id
                                    }))}
                                    onChange={(e) => setFieldValue('containerSize.id', e.value)}
                                />


                                <MyDropdown
                                    label="Cảng"
                                    name="portLocation.id"
                                    options={portLocations.map(port => ({ label: port.portName, value: port.id }))}
                                    onChange={(e) => setFieldValue('portLocation.id', e.value)}
                                    disabled={values.status !== 'In Port' && values.status !== 'Under Maintenance'}
                                />


                                <div className="p-col-12">
                                    <Button type="submit" label="Submit" className="p-button-primary" disabled={isSubmitting} />

                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            </div>
        </div>
    );
};

export default CreateContainerForm;
