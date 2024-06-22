"use client"
import React, { useState } from 'react';
import 'primeflex/primeflex.css';
import 'primereact/resources/themes/saga-blue/theme.css';  // theme
import 'primereact/resources/primereact.min.css';           // core css
import 'primeicons/primeicons.css';                         // icons
import 'leaflet/dist/leaflet.css';

import MapComponent from "../../../components/Route/MapComponent";
import axios from "axios";
import { AutoComplete } from "primereact/autocomplete";
import { Formik, Form, FieldArray } from 'formik';
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";
import { InputTextarea } from "primereact/inputtextarea";
import * as Yup from "yup";
import { Button } from "primereact/button";

const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <div className="field col-12 md:col-6">
            <label htmlFor={props.id || props.name}>{label}</label>
            <InputText id={props.id || props.name} {...field} {...props} />

            {meta.touched && meta.error ? (
                <Message severity="warn" text={meta.error} />
            ) : null}
        </div>
    );
};

const MyTextInputArea = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <div className="field col-12">
            <label htmlFor={props.id || props.name}>{label}</label>
            <textarea id={props.id || props.name} {...field} {...props} rows="4" className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
            {meta.touched && meta.error ? (
                <Message severity="warn" text={meta.error} />
            ) : null}
        </div>
    );
};
const PortAutoComplete = ({ apiKey, label, name, onPortSelected }) => {
    const [suggestions, setSuggestions] = useState([]);

    const searchPort = async (event) => {
        if (!event.query) {
            setSuggestions([]);
            return;
        }

        const response = await axios.get('https://api.datalastic.com/api/v0/port_find', {
            params: {
                'api-key': apiKey,
                name: event.query,
                fuzzy: 1
            }
        });

        setSuggestions(response.data.data);
    };

    return (
        <div className="field col-12 md:col-6">
            <label htmlFor={name}>{label}</label>
            <AutoComplete
                field="port_name"
                suggestions={suggestions}
                completeMethod={searchPort}
                onChange={(e) => onPortSelected(e.value)}
                placeholder={label}
                selectedItemTemplate={(item) => (item && item.port_name ? item.port_name : '')}
            />
        </div>
    );
};



const App = () => {
    const apiKey = 'd0b62312-ba29-4d76-8da3-7f874fb6dfa2';
    const [waypoints, setWaypoints] = useState([]);

    return (
        <div className="p-grid p-justify-center p-align-center">
            <div className="p-col-12 p-md-8">
                <Formik
                    initialValues={{
                        name: '',
                        description: '',
                        estimated_time: '',
                        distance: '',
                        status: '',
                        waypoints: [{ port_name: '' }]
                    }}
                    validationSchema={Yup.object({
                        name: Yup.string().required('Vui lòng nhập tên hãng'),
                        estimated_time: Yup.string().required('Vui lòng nhập thời gian ước tính'),
                        description: Yup.string().min(10, 'Vui lòng nhập mô tả có độ dài lớn hơn 10 kí tự').required('Không được để trống'),
                        distance: Yup.string().required('Không được để trống'),
                        status: Yup.string().required('Không được để trống'),
                        waypoints: Yup.array().of(
                            Yup.object().shape({
                                port_name: Yup.string().required('Không được để trống')
                            })
                        ).min(2, 'Cần ít nhất 2 điểm dừng')
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        axios.post('/api/routes', values)
                            .then(res => {
                                console.log(res.data);
                            })
                            .catch(err => {
                                console.log(err);
                            })
                            .finally(() => {
                                setSubmitting(false);
                            });
                    }}
                >
                    {({ values, setFieldValue }) => (
                        <>
                            <div className="p-col-12">
                                <MapComponent
                                    waypoints={values.waypoints}
                                />
                            </div>
                            <Form className="formgrid grid">
                                <FieldArray name="waypoints">
                                    {({ remove, push }) => (
                                        <>
                                            {values.waypoints.map((waypoint, index) => (
                                                <div key={index} className="p-field p-col-12 p-md-6">
                                                    <PortAutoComplete
                                                        apiKey={apiKey}
                                                        label={`Điểm dừng ${index + 1}`}
                                                        name={`waypoints[${index}].port_name`}
                                                        onPortSelected={(port) => setFieldValue(`waypoints[${index}].port_name`, port.port_name)}
                                                    />
                                                    <Button type="button" icon="pi pi-times" className="p-button-danger" onClick={() => remove(index)} />
                                                </div>
                                            ))}
                                            <div className="p-col-12">
                                                <Button type="button" icon="pi pi-plus" label="Thêm điểm dừng" onClick={() => push({ port_name: '' })} />
                                            </div>
                                        </>
                                    )}
                                </FieldArray>
                                <MyTextInput
                                    label="Tên tuyến"
                                    name="name"
                                    type="text"
                                    placeholder="Hà Đông - Hà Nội"
                                />
                                <MyTextInput
                                    label="Thời gian ước tính"
                                    name="estimated_time"
                                    placeholder="8 giờ"
                                />
                                <MyTextInput
                                    label="Quãng đường"
                                    name="distance"
                                    placeholder="120 km"
                                />
                                <MyTextInput
                                    label="Trạng thái"
                                    name="status"
                                    placeholder="Hoạt động"
                                />
                                <MyTextInputArea
                                    label="Mô tả"
                                    name="description"
                                    placeholder="Chuyên cung cấp...."
                                />
                                <div className="p-col-12">
                                    <Button type="submit" label="Submit" className="p-button-primary" />
                                </div>
                            </Form>
                        </>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default App;
