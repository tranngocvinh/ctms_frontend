"use client"
import React, {useEffect, useRef, useState} from 'react';
import 'primeflex/primeflex.css';
import 'primereact/resources/themes/saga-blue/theme.css'; // theme
import 'primereact/resources/primereact.min.css'; // core css
import 'primeicons/primeicons.css'; // icons
import 'leaflet/dist/leaflet.css';
import {add} from "app/api/route";
import MapComponent from "../../../components/Route/MapComponent";
import axios from "axios";
import 'app/custom-autocomplete.css'
import {AutoComplete} from "primereact/autocomplete";
import {FieldArray, Form, Formik, useField} from 'formik';
import * as Yup from "yup";
import {Button} from "primereact/button";
import {Toast} from "primereact";
import {Dropdown} from "primereact/dropdown";
import ErrorGlobal from "../../../components/error_message_global";
import "./tuyenduong.css";

const {
    blankError,
    chooseStatusError,
    inputLengthError,
    inputRouteError,
    numberError
} = ErrorGlobal;

const requiredString = (errorMessage) => Yup.string().required(errorMessage);
const requiredNumber = (errorMessage) => Yup.number().typeError(numberError).required(errorMessage);

const InputText = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <div className="field col-12 md:col-6">
            <label htmlFor={props.id || props.name}>{label}</label>
            <input type="text"
                   className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                   style={{ height: '2.7rem' }}
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
            <textarea type="text" rows="4"
                      className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                      id={props.id || props.name} {...field} {...props} />
            {meta.touched && meta.error ? (
                <small className="p-error">{meta.error}</small>
            ) : null}
        </div>
    );
};

const ChooseStatus = ({ label, options, value, onChange, onBlur, error }) => {
    return (
        <div className="field col-12 md:col-6">
            <label htmlFor={label}>{label}</label>
            <Dropdown
                value={value}
                onChange={(e) => {
                    onChange(e.value);
                }}
                onBlur={onBlur}
                options={options}
                placeholder="Chọn trạng thái"
                style={{ height: '2.7rem' }}
                className={`w-full`}
            />
            {error && <small className="p-error">{error}</small>}
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
            console.error("Error fetching port locations");
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
                <div className="p-inputgroup flex-1">
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
                        outlined
                        severity="danger"
                        onClick={onRemove}
                    />
                </div>
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
    const toast = useRef(null);
    useEffect(() => {
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
            <Toast ref={toast} />

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
                        name: requiredString(inputRouteError),
                        estimatedTime: requiredNumber(blankError),
                        description: requiredString(blankError).min(10, inputLengthError + '10 kí tự'),
                        distance: requiredNumber(blankError),
                        status: requiredString(chooseStatusError)
                            .oneOf(['Hoạt động', 'Không hoạt động'], chooseStatusError),
                        waypoints: Yup.array().of(
                            Yup.object().shape({
                                portName: requiredString(blankError),
                                lat: Yup.number().nullable().required(blankError),
                                lon: Yup.number().nullable().required(blankError)
                            })
                        ).min(2, 'Cần ít nhất 2 điểm dừng')
                    })}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        const dataToSend = {
                            ...values,
                            waypoints
                        };
                        add(dataToSend)
                            .then(res => {
                                toast.current.show({
                                    severity: "success",
                                    summary: "Thành công",
                                    detail: "Tuyến đường đã được thêm",
                                    life: 3000,
                                });
                                resetForm(); // Reset the form after success
                                setWaypoints([{ portName: '', lat: null, lon: null }]); // Clear waypoints
                                setRouteSegments([]); // Clear route segments
                            })
                            .catch(err => {
                                alert(err);
                            })
                            .finally(() => {
                                setSubmitting(false);
                            });
                    }}
                >
                    {({ values, setFieldValue, touched, errors, setFieldTouched }) => (
                        <>
                            <div className="grid nested-grid">
                                <div className="col-8">
                                    <div className="p-col-12">
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
                                                                onClick={() => handleAddWaypoint(push)}
                                                                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"/>
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
                                         <InputText
                                             label="Tên tuyến"
                                                name="name"
                                                type="text"
                                                placeholder="Hà Đông - Hà Nội"
                                            />
                                        <ChooseStatus
                                            label="Trạng thái"
                                            value={values.status}
                                            onChange={(value) => setFieldValue('status', value)}
                                            onBlur={() => setFieldTouched('status')}
                                            error={touched.status && errors.status}
                                            options={[
                                                { label: 'Hoạt động', value: 'Hoạt động' },
                                                { label: 'Không hoạt động', value: 'Không hoạt động' },
                                            ]}
                                        />

                                        <InputText
                                            label="Thời gian ước tính"
                                            name="estimatedTime"
                                            placeholder="8 giờ"
                                        />
                                        <InputText
                                            label="Quãng đường"
                                            name="distance"
                                            placeholder="120 km"
                                        />

                                        <div className="p-col-12">
                                            <Button type="submit" label="Submit" icon="pi pi-check" iconPos="right" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" />
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
