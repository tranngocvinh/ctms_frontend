"use client"
import React, { useState, useEffect } from 'react';
import 'primeflex/primeflex.css';
import 'primereact/resources/themes/saga-blue/theme.css'; // theme
import 'primereact/resources/primereact.min.css'; // core css
import 'primeicons/primeicons.css'; // icons
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import '/app/custom-autocomplete.css'
import { AutoComplete } from 'primereact/autocomplete';
import { Formik, Form, FieldArray, useField } from 'formik';
import * as Yup from 'yup';
import { Button } from 'primereact/button';
import ErrorGlobal from '/app/components/error_message_global';
import dynamic from 'next/dynamic';

// Dynamically import MapComponent with ssr: false to avoid server-side rendering
const MapComponent = dynamic(() => import('/app/components/Route/MapComponent'), { ssr: false });

const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <div className="field col-12 md:col-6">
            <label htmlFor={props.id || props.name}>{label}</label>
            <input
                type="text"
                className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                id={props.id || props.name} {...field} {...props} />
            {meta.touched && meta.error ? (
                <small className="p-error">{meta.error}</small>
            ) : null}
        </div>
    );
};

const MyTextInputArea = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <div className="field col-12">
            <label htmlFor={props.id || props.name}>{label}</label>
            <textarea
                rows="4"
                className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                id={props.id || props.name} {...field} {...props} />
            {meta.touched && meta.error ? (
                <small className="p-error">{meta.error}</small>
            ) : null}
        </div>
    );
};

const CustomPortAutoComplete = ({ label, name, onPortSelected, onRemove }) => {
    const [field, meta, helpers] = useField(name);
    const [suggestions, setSuggestions] = useState([]);

    const searchPort = async (event) => {
        if (!event.query) {
            setSuggestions([]);
            return;
        }

        try {
            const response = await axios.get(`https://auth.g42.biz/api/ports/search`, {
                params: {
                    name: event.query
                }
            });
            setSuggestions(response.data);
        } catch (error) {
            console.error("Error fetching port locations:", error);
        }
    };

    const handleSelect = (e) => {
        const selectedPort = e.value;
        if (selectedPort && selectedPort.lat !== undefined && selectedPort.lon !== undefined) {
            helpers.setValue(selectedPort.portName);
            onPortSelected(selectedPort);
        } else {
            helpers.setValue('');
        }
    };

    const handleChange = (e) => {
        helpers.setValue(e.target.value);
    };

    return (
        <div className="field col-12 md:col-12">
            <label htmlFor={name}>{label}</label>
            <div className="custom-autocomplete-wrapper">
                <AutoComplete
                    {...field}
                    suggestions={suggestions}
                    completeMethod={searchPort}
                    field="portName"
                    onChange={handleChange}
                    onSelect={handleSelect}
                    placeholder={label}
                    selectedItemTemplate={(item) => (item && item.portName ? item.portName : '')}
                    className="custom-autocomplete"
                />
                <Button
                    type="button"
                    icon="pi pi-times"
                    className="p-button-danger custom-remove-button"
                    onClick={onRemove}
                />
            </div>
            {meta.touched && meta.error ? (
                <small className="p-error">{meta.error}</small>
            ) : null}
        </div>
    );
};

const App = () => {
    const [waypoints, setWaypoints] = useState([]);
    const [routeSegments, setRouteSegments] = useState([]);

    useEffect(() => {
        console.log("Route Segments Updated:", routeSegments);
    }, [routeSegments]);

    const handlePortSelected = async (index, port) => {
        const newWaypoints = [...waypoints];
        newWaypoints[index] = port;
        setWaypoints(newWaypoints);

        if (newWaypoints.length > 1) {
            const allSegments = [];
            for (let i = 0; i < newWaypoints.length - 1; i++) {
                try {
                    const response = await axios.post(`https://auth.g42.biz/api/proxy/waypoints`, {
                        fromPort: newWaypoints[i].portName,
                        toPort: newWaypoints[i + 1].portName
                    });
                    console.log("API Response:", response.data);
                    const coordinates = response.data.features[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
                    allSegments.push(coordinates);
                } catch (error) {
                    console.error("Error fetching route data:", error);
                }
            }
            setRouteSegments(allSegments);
        }
    };

    const handleAddWaypoint = (push) => {
        const newWaypoint = { portName: '', lat: null, lon: null };
        push(newWaypoint);
        setWaypoints((prevWaypoints) => [...prevWaypoints, newWaypoint]);
    };

    const handleRemoveWaypoint = (index, remove) => {
        remove(index);
        setWaypoints((prevWaypoints) => prevWaypoints.filter((_, i) => i !== index));
        setRouteSegments((prevSegments) => prevSegments.filter((_, i) => i !== index - 1));
    };

    return (
        <div className="p-grid p-justify-center p-align-center">
            <div className="p-col-12 p-md-10">
                <Formik
                    initialValues={{
                        name: '',
                        description: '',
                        estimatedTime: '',
                        distance: '',
                        status: '',
                        waypoints: [{ portName: '', lat: null, lon: null }]
                    }}
                    validationSchema={Yup.object({
                        name: Yup.string().required('Vui lòng nhập tên tuyến'),
                        estimatedTime: Yup.number().required('Vui lòng nhập thời gian ước tính').typeError('Khoảng cách phải là một số'),
                        description: Yup.string().min(10, 'Vui lòng nhập mô tả có độ dài lớn hơn 10 kí tự').required(ErrorGlobal.blankError),
                        distance: Yup.number().required(ErrorGlobal.blankError).typeError('Khoảng cách phải là một số'),
                        status: Yup.string().required(ErrorGlobal.blankError),
                        waypoints: Yup.array().of(
                            Yup.object().shape({
                                portName: Yup.string().required(ErrorGlobal.blankError),
                                lat: Yup.number().nullable().required(ErrorGlobal.blankError),
                                lon: Yup.number().nullable().required(ErrorGlobal.blankError)
                            })
                        ).min(2, 'Cần ít nhất 2 điểm dừng')
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        const dataToSend = {
                            ...values,
                            waypoints
                        };
                        add({ route: dataToSend })
                            .then(res => {
                                alert(res.data);
                            })
                            .catch(err => {
                                alert(err);
                            })
                            .finally(() => {
                                setSubmitting(false);
                            });
                    }}
                >
                    {({ values, setFieldValue }) => (
                        <>
                            <div className="grid nested-grid">
                                <div className="col-8">
                                    <div className="p-col-12">
                                        {/* Use dynamic MapComponent */}
                                        <MapComponent
                                            waypoints={waypoints.filter(wp => wp.lat !== null && wp.lon !== null)}
                                            routeSegments={routeSegments}
                                        />
                                    </div>
                                </div>
                                <div className="col-4">
                                    <Form className="formgrid grid">
                                        <FieldArray name="waypoints">
                                            {({ remove, push }) => (
                                                <>
                                                    <div className="p-field p-col-12 md:col-12">
                                                        <Button type="button" icon="pi pi-plus" label="Thêm điểm dừng"
                                                                onClick={() => handleAddWaypoint(push)} />
                                                    </div>
                                                    {values.waypoints.map((waypoint, index) => (
                                                        <div key={index} className="p-field p-col-12">
                                                            <CustomPortAutoComplete
                                                                label={`Điểm dừng ${index + 1}`}
                                                                name={`waypoints[${index}].portName`}
                                                                onPortSelected={(port) => {
                                                                    setFieldValue(`waypoints[${index}].lat`, port.lat);
                                                                    setFieldValue(`waypoints[${index}].lon`, port.lon);
                                                                    handlePortSelected(index, port);
                                                                }}
                                                                onRemove={() => handleRemoveWaypoint(index, remove)}
                                                            />
                                                        </div>
                                                    ))}
                                                </>
                                            )}
                                        </FieldArray>

                                        <MyTextInputArea
                                            label="Mô tả"
                                            name="description"
                                            placeholder="Chuyên cung cấp...."
                                        />

                                        <MyTextInput
                                            label="Tên tuyến"
                                            name="name"
                                            type="text"
                                            placeholder="Hà Đông - Hà Nội"
                                        />
                                        <MyTextInput
                                            label="Trạng thái"
                                            name="status"
                                            placeholder="Hoạt động"
                                        />

                                        <MyTextInput
                                            label="Thời gian ước tính"
                                            name="estimatedTime"
                                            placeholder="8 giờ"
                                        />
                                        <MyTextInput
                                            label="Quãng đường"
                                            name="distance"
                                            placeholder="120 km"
                                        />

                                        <div className="p-col-12">
                                            <Button type="submit" label="Submit" className="p-button-primary" />
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default App;
