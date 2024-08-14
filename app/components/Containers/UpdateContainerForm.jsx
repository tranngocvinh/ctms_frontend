"use client"
import React, { useState, useEffect } from 'react';
import 'primeflex/primeflex.css';
import 'primereact/resources/themes/saga-blue/theme.css'; // theme
import 'primereact/resources/primereact.min.css'; // core css
import 'primeicons/primeicons.css'; // icons
import { Formik, Form, useField } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Message } from 'primereact/message';
import { Button } from 'primereact/button';
import * as Yup from 'yup';
import axios from 'axios';
import { update } from '/app/api/container';

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

const UpdateContainerForm = ({ fetchContainers, container }) => {
    const [ships, setShips] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [containerSizes, setContainerSizes] = useState([]);

    useEffect(() => {
        fetchShips();
        fetchSchedules();
        fetchContainerSizes();
    }, []);

    const fetchShips = async () => {
        try {
            const response = await axios.get(`https://auth.g42.biz/api/ships`);
            setShips(response.data);
        } catch (error) {
            console.error('Error fetching ships:', error);
        }
    };

    const fetchSchedules = async () => {
        try {
            const response = await axios.get(`https://auth.g42.biz/api/schedules`);
            setSchedules(response.data);
        } catch (error) {
            console.error('Error fetching schedules:', error);
        }
    };

    const fetchContainerSizes = async () => {
        try {
            const response = await axios.get(`https://auth.g42.biz/api/containers/sizes`);
            setContainerSizes(response.data);
        } catch (error) {
            console.error('Error fetching container sizes:', error);
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
                        containerSizeId: container?.containerSizeId || '',
                        shipId: container?.shipId || '',
                        scheduleId: container?.scheduleId || '',
                        status: container?.status || '',
                        location: container.location || '',
                    }}
                    validationSchema={Yup.object({
                        containerSizeId: Yup.string().required('Vui lòng chọn kích thước container'),
                        shipId: Yup.string().required('Vui lòng chọn tàu'),
                        scheduleId: Yup.string().required('Vui lòng chọn lịch trình'),
                        status: Yup.string().required('Vui lòng chọn trạng thái container'),
                        location: Yup.string().required('Vui lòng nhập vị trí container'),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        update(container.containerCode, values).then(res => {
                            fetchContainers()
                        }).catch(err => {
                            alert(err)
                        }).finally(() => {
                            setSubmitting(false);
                            alert("finish");
                        });
                    }}
                >
                    {({ isSubmitting, setFieldValue }) => (
                        <Form className="">
                            <MyDropdown
                                label="Kích thước Container"
                                name="containerSizeId"
                                options={containerSizes.map(containerSize => ({
                                    label: `ID: ${containerSize.id} - kích thước: ${containerSize.length} x ${containerSize.width} x ${containerSize.height}`,
                                    value: containerSize.id
                                }))}
                                onChange={(e) => setFieldValue('containerSizeId', e.value)}
                            />
                            <MyDropdown
                                label="Tên hãng tàu vận chuyển"
                                name="shipId"
                                options={ships.map(ship => ({ label: ship.name, value: ship.id }))}
                            />
                            <MyDropdown
                                label="Lịch trình di chuyển"
                                name="scheduleId"
                                options={schedules.map(schedule => ({
                                    label: `${schedule.notes} - ${new Date(schedule.departureTime).toLocaleString()} đến ${new Date(schedule.estimatedArrivalTime).toLocaleString()}`,
                                    value: schedule.id
                                }))}
                            />
                            <MyDropdown
                                label="Trạng thái Container"
                                name="status"
                                options={containerStatuses}
                            />
                            <MyTextInput
                                label="Vị trí hiện tại Container"
                                name="location"
                                type="text"
                                placeholder="Vị trí Container"
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

export default UpdateContainerForm;
