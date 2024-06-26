"use client"
import React, {useState, useEffect} from 'react';
import 'primeflex/primeflex.css';
import 'primereact/resources/themes/saga-blue/theme.css'; // theme
import 'primereact/resources/primereact.min.css'; // core css
import 'primeicons/primeicons.css'; // icons
import {Formik, Form, useField} from 'formik';
import {InputText} from 'primereact/inputtext';
import {Dropdown} from 'primereact/dropdown';
import {Message} from 'primereact/message';
import {Button} from 'primereact/button';
import * as Yup from 'yup';
import axios from 'axios';
import {add} from 'app/api/container'
const MyTextInput = ({label, ...props}) => {
    const [field, meta] = useField(props);

    return (
        <div className="field grid">
            <label class="col-12 mb-2 md:col-4" htmlFor={props.id || props.name}>{label}</label>
            <div class="col-12 md:col-8">
                <InputText id={props.id || props.name} {...field} {...props} />
                {meta.touched && meta.error ? (
                    <small className="p-error">{meta.error}</small>
                ) : null}
            </div>

        </div>
    );
};

const MyDropdown = ({label, options, onChange, ...props}) => {
    const [field, meta, helpers] = useField(props);

    return (
        <div class="field grid">
            <label class="col-12 mb-2 md:col-4 md:mb-0" htmlFor={props.id || props.name}>{label}</label>
            <div class="col-12 md:col-8">
                <Dropdown
                    id={props.id || props.name}
                    {...field}
                    options={options}
                    onChange={(e) => {
                        helpers.setValue(e.value);
                        if (onChange) onChange(e);
                    }}
                    placeholder="Chọn..."
                    style={{width: "60%"}}
                />
                {meta.touched && meta.error ? (
                    <small className="p-error">{meta.error}</small>
                ) : null}
            </div>

        </div>
    );
};

const CreateContainerForm = ({fetchContainers}) => {
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
            const response = await axios.get('http://localhost:8080/api/ships');
            setShips(response.data);
        } catch (error) {
            console.error('Error fetching ships:', error);
        }
    };

    const fetchSchedules = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/schedules');
            setSchedules(response.data);
        } catch (error) {
            console.error('Error fetching schedules:', error);
        }
    };

    const fetchContainerSizes = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/containers/sizes');
            setContainerSizes(response.data);
        } catch (error) {
            console.error('Error fetching container sizes:', error);
        }
    };

    const containerStatuses = [
        {label: 'Trong kho', value: 'In Storage'},
        {label: 'Trên tàu', value: 'On Ship'},
        {label: 'Đang vận chuyển', value: 'In Transit'},
        {label: 'Đã giao', value: 'Delivered'},
        {label: 'Hư hỏng', value: 'Damaged'},
        {label: 'Mất', value: 'Lost'}
    ];

    return (
        <div className="p-grid p-justify-center p-align-center">
            <div className="p-col-12 p-md-10">
                <Formik
                    initialValues={{
                        containerCode: '',
                        containerSizeId: '',
                        shipId: '',
                        scheduleId: '',
                        status: '',
                        location: '',
                    }}
                    validationSchema={Yup.object({
                        containerCode: Yup.string().required('Vui lòng nhập mã định danh'),
                        containerSizeId: Yup.string().required('Vui lòng chọn kích thước container'),
                        shipId: Yup.string().required('Vui lòng chọn tàu'),
                        scheduleId: Yup.string().required('Vui lòng chọn lịch trình'),
                        status: Yup.string().required('Vui lòng chọn trạng thái container'),
                        location: Yup.string().required('Vui lòng nhập vị trí container'),
                    })}
                    onSubmit={(values, {setSubmitting}) => {
                        add(values).then(res => {
                            fetchContainers()
                        }).catch(err => {
                            alert(err)
                        }).finally(() => {
                            setSubmitting(false);
                           alert("finish");
                        });
                    }}
                >
                    {({isSubmitting, setFieldValue}) => (
                        <Form className="">
                            <MyTextInput
                                label="Nhập mã định danh container"
                                name="containerCode"
                                type="text"
                                placeholder="Mã định danh"
                            />
                            <MyDropdown
                                label="Kích thước Container"
                                name="containerSizeId"
                                options={containerSizes.map(containerSize => ({
                                    label: `ID: ${containerSize.id}🔶kích thước: ${containerSize.length} x ${containerSize.width} x ${containerSize.height}`,
                                    value: containerSize.id
                                }))}
                                onChange={(e) => setFieldValue('containerSizeId', e.value)}
                            />
                            <MyDropdown
                                label="Tên hãng tàu vận chuyển"
                                name="shipId"
                                options={ships.map(ship => ({label: ship.name, value: ship.id}))}
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
                                <Button type="submit" label="Submit" className="p-button-primary"
                                        disabled={isSubmitting}/>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default CreateContainerForm;
