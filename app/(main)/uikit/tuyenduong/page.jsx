"use client"
import React, {useState} from 'react';
import 'primeflex/primeflex.css';
import 'primereact/resources/themes/saga-blue/theme.css'; // theme
import 'primereact/resources/primereact.min.css'; // core css
import 'primeicons/primeicons.css'; // icons
import 'leaflet/dist/leaflet.css';
import {add} from "app/api/route";
import MapComponent from "../../../components/Route/MapComponent";
import axios from "axios";
import {AutoComplete} from "primereact/autocomplete";
import {Formik, Form, FieldArray, useField} from 'formik';
import {InputText} from "primereact/inputtext";
import {Message} from "primereact/message";
import {InputTextarea} from "primereact/inputtextarea";
import * as Yup from "yup";
import {Button} from "primereact/button";

const MyTextInput = ({label, ...props}) => {
    const [field, meta] = useField(props);

    return (
        <div className="field col-12 md:col-6">
            <label htmlFor={props.id || props.name}>{label}</label>
            <input type="text"
                   class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                   id={props.id || props.name} {...field} {...props} />
            {meta.touched && meta.error ? (
                <small className="p-error">{meta.error}</small>
            ) : null}
        </div>
    );
};

const MyTextInputArea = ({label, ...props}) => {
    const [field, meta] = useField(props);

    return (
        <div className="field col-12">
            <label htmlFor={props.id || props.name}>{label}</label>
            <textarea type="text" rows="4"
                      class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                      id={props.id || props.name} {...field} {...props} />
            {meta.touched && meta.error ? (
                <small className="p-error">{meta.error}</small>
            ) : null}
        </div>
    );
};

const CustomPortAutoComplete = ({label, name, onPortSelected, onRemove}) => {
    const [field, meta, helpers] = useField(name);
    const [suggestions, setSuggestions] = useState([]);

    const searchPort = async (event) => {
        if (!event.query) {
            setSuggestions([]);
            return;
        }

        try {
            const response = await axios.get('http://localhost:8080/api/ports/search', {
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

    const handlePortSelected = (index, port) => {
        const newWaypoints = [...waypoints];
        newWaypoints[index] = port;
        setWaypoints(newWaypoints);
    };

    const handleAddWaypoint = (push) => {
        const newWaypoint = {portName: '', lat: null, lon: null};
        push(newWaypoint);
        setWaypoints((prevWaypoints) => [...prevWaypoints, newWaypoint]);
    };

    const handleRemoveWaypoint = (index, remove) => {
        remove(index);
        setWaypoints((prevWaypoints) => prevWaypoints.filter((_, i) => i !== index));
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
                        waypoints: [{portName: '', lat: null, lon: null}]
                    }}
                    validationSchema={Yup.object({
                        name: Yup.string().required('Vui lòng nhập tên tuyến'),
                        estimatedTime: Yup.number().required('Vui lòng nhập thời gian ước tính'),
                        description: Yup.string().min(10, 'Vui lòng nhập mô tả có độ dài lớn hơn 10 kí tự').required('Không được để trống'),
                        distance: Yup.number().required('Không được để trống'),
                        status: Yup.string().required('Không được để trống'),
                        waypoints: Yup.array().of(
                            Yup.object().shape({
                                portName: Yup.string().required('Không được để trống'),
                                lat: Yup.number().nullable().required('Không được để trống'),
                                lon: Yup.number().nullable().required('Không được để trống')
                            })
                        ).min(2, 'Cần ít nhất 2 điểm dừng')
                    })}
                    onSubmit={(values, {setSubmitting}) => {
                        const dataToSend = {
                            ...values,
                            waypoints
                        };
                        add(dataToSend)
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
                    {({values, setFieldValue}) => (
                        <>
                            <div class="grid nested-grid">
                                <div class="col-6">
                                    <div className="p-col-12">
                                        <MapComponent
                                            waypoints={waypoints.filter(wp => wp.lat !== null && wp.lon !== null)}
                                        />
                                    </div>
                                </div>
                                <div class="col-6">
                                    <Form className="formgrid grid">
                                        <FieldArray name="waypoints">
                                            {({remove, push}) => (
                                                <>
                                                    <div className="p-field p-col-12 md:col-12">
                                                        <Button type="button" icon="pi pi-plus" label="Thêm điểm dừng"
                                                                onClick={() => handleAddWaypoint(push)}/>
                                                    </div>
                                                    {values.waypoints.map((waypoint, index) => (
                                                        <div key={index} className="p-field p-col-12 md:col-6">
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
                                            <Button type="submit" label="Submit" className="p-button-primary"/>
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
