"use client";
import React, { useState, useEffect } from 'react';
import 'primeflex/primeflex.css';
import 'primereact/resources/themes/saga-blue/theme.css'; // theme
import 'primereact/resources/primereact.min.css'; // core css
import 'primeicons/primeicons.css'; // icons
import { Formik, Form, useField, FieldArray } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import * as Yup from 'yup';
import axios from 'axios';
import { allocateToPort, allocateToShip } from 'app/api/container'; // replace with your actual import

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
                />
                {meta.touched && meta.error ? (
                    <small className="p-error">{meta.error}</small>
                ) : null}
            </div>
        </div>
    );
};

const AllocateEmptyContainersForm = () => {
    const [containerSizes, setContainerSizes] = useState([]);
    const [ships, setShips] = useState([]);
    const [ports, setPorts] = useState([]);

    useEffect(() => {
        fetchContainerSizes();
        fetchShips();
        fetchPorts();
    }, []);

    const fetchContainerSizes = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/containers/sizes');
            setContainerSizes(response.data);
        } catch (error) {
            console.error('Error fetching container sizes:', error);
        }
    };

    const fetchShips = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/ships');
            setShips(response.data);
        } catch (error) {
            console.error('Error fetching ships:', error);
        }
    };

    const fetchPorts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/ports');
            setPorts(response.data);
        } catch (error) {
            console.error('Error fetching ports:', error);
        }
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const totalCapacity = values.containerAllocations.reduce((sum, allocation) => {
                const size = containerSizes.find(size => size.id === allocation.containerSizeId);
                return sum + (size.weight * allocation.quantity);
            }, 0);

            const requestData = {
                shipId: values.shipId,
                portName: values.portName,
                totalCapacity: totalCapacity
            };

            if (values.shipId) {
                await allocateToShip(requestData);
            } else {
                await allocateToPort(requestData);
            }
            alert('Containers allocated successfully');
        } catch (error) {
            alert('Error allocating containers');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="p-grid p-justify-center p-align-center">
            <div className="p-col-12 p-md-10">
                <Formik
                    initialValues={{
                        shipId: '',
                        portName: '',
                        containerAllocations: [
                            { containerSizeId: '', quantity: '' }
                        ]
                    }}
                    validationSchema={Yup.object().shape({
                        containerAllocations: Yup.array().of(
                            Yup.object().shape({
                                containerSizeId: Yup.string().required('Vui lòng chọn kích thước container'),
                                quantity: Yup.number().required('Vui lòng nhập số lượng container').min(1, 'Số lượng phải lớn hơn 0'),
                            })
                        ),
                        eitherField: Yup.string().when(['shipId', 'portName'], {
                            is: (shipId, portName) => !shipId && !portName,
                            then: Yup.string().required('Vui lòng chọn tàu hoặc cảng')
                        })
                    })}
                    onSubmit={handleSubmit}
                >
                    {({ values, isSubmitting, setFieldValue }) => (
                        <Form className="">
                            <MyDropdown
                                label="Chọn tàu"
                                name="shipId"
                                options={ships.map(ship => ({ label: ship.name, value: ship.id }))}
                                onChange={(e) => setFieldValue('shipId', e.value)}
                            />
                            <MyDropdown
                                label="Chọn cảng"
                                name="portName"
                                options={ports.map(port => ({ label: port.portName, value: port.portName }))}
                                onChange={(e) => setFieldValue('portName', e.value)}
                            />

                            <FieldArray name="containerAllocations">
                                {({ insert, remove, push }) => (
                                    <div>
                                        {values.containerAllocations.length > 0 &&
                                            values.containerAllocations.map((allocation, index) => (
                                                <div className="field grid" key={index}>
                                                    <MyDropdown
                                                        label="Kích thước Container"
                                                        name={`containerAllocations.${index}.containerSizeId`}
                                                        options={containerSizes.map(size => ({
                                                            label: `${size.length} x ${size.width} x ${size.height}`,
                                                            value: size.id
                                                        }))}
                                                    />
                                                    <MyTextInput
                                                        label="Số lượng"
                                                        name={`containerAllocations.${index}.quantity`}
                                                        type="number"
                                                    />
                                                    <div className="col-12 md:col-2">
                                                        <Button
                                                            type="button"
                                                            label="Xóa"
                                                            className="p-button-danger"
                                                            onClick={() => remove(index)}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        <Button
                                            type="button"
                                            label="Thêm"
                                            className="p-button-secondary"
                                            onClick={() => push({ containerSizeId: '', quantity: '' })}
                                        />
                                    </div>
                                )}
                            </FieldArray>

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

export default AllocateEmptyContainersForm;
