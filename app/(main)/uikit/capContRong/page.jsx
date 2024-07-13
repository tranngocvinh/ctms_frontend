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
import { Dialog } from 'primereact/dialog';
import * as Yup from 'yup';
import axios from 'axios';
import { allocateContainersToPort, allocateContainersToShip } from 'app/api/container'; // replace with your actual import
import jsPDF from 'jspdf';
import 'app/components/AllocateEmptyContainersForm.css';


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
    const [allocationType, setAllocationType] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [allocationDetails, setAllocationDetails] = useState(null);

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

    const handleSubmit = (values, { setSubmitting }) => {
        const totalCapacity = values.containerAllocations.reduce((sum, allocation) => {
            const size = containerSizes.find(size => size.id === allocation.containerSizeId);
            return sum + (size.weight * allocation.quantity);
        }, 0);

        const requestData = {
            totalCapacity: totalCapacity,
            shipId: allocationType === 'ship' ? values.shipId : null,
            portName: allocationType === 'port' ? values.portName : null,
            requestTime: new Date().toISOString(),
            details: values.containerAllocations.map(allocation => ({
                containerSizeId: allocation.containerSizeId,
                quantity: allocation.quantity
            }))
        };

        setAllocationDetails(requestData);
        setIsModalVisible(true);
        setSubmitting(false);
    };

    const handleConfirm = async () => {
        try {
            if (allocationType === 'ship') {
                await allocateContainersToShip(allocationDetails);
            } else if (allocationType === 'port') {
                await allocateContainersToPort(allocationDetails);
            }
            alert('Containers allocated successfully');
            downloadContractAsPDF();
        } catch (error) {
            alert('Error allocating containers');
        } finally {
            setIsModalVisible(false);
        }
    };

    const downloadContractAsPDF = () => {
        const doc = new jsPDF();
        doc.text("Hợp đồng cấp container rỗng", 20, 20);
        doc.text(`Tổng sức chứa: ${allocationDetails.totalCapacity}`, 20, 30);
        if (allocationType === 'ship') {
            doc.text(`Tàu: ${ships.find(ship => ship.id === allocationDetails.shipId)?.name}`, 20, 40);
        } else if (allocationType === 'port') {
            doc.text(`Cảng: ${allocationDetails.portName}`, 20, 40);
        }
        doc.text(`Thời gian yêu cầu: ${new Date(allocationDetails.requestTime).toLocaleString()}`, 20, 50);

        allocationDetails.details.forEach((detail, index) => {
            const size = containerSizes.find(size => size.id === detail.containerSizeId);
            doc.text(`Container ${index + 1}: ${size.length} x ${size.width} x ${size.height} - Số lượng: ${detail.quantity}`, 20, 60 + (index * 10));
        });

        doc.save('HopDongCapContainerRong.pdf');
    };

    const renderAllocationDetails = () => {
        if (!allocationDetails) return null;

        return (
            <div>
                <header>
                    <div className="headerSection">
                        <div className="logoAndName">
                            <img
                                src="https://vienphattriendoanhnghiep.vn/upload/thumb/202311/27/tong-cong-ty-hang-hai-viet-nam-ctcp-50.webp"
                                alt="Logo"
                                width="100px"
                                height="100px"
                            />
                            <h1>VIMC</h1>
                        </div>
                        <div className="invoiceDetails">
                            <h2>Hợp đồng ngày: </h2>
                            <p>
                                {new Date().toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </header>

                <main>
                    <table>
                        <thead>
                        <tr>
                            <th>Loại container</th>
                            <th>Kích thước</th>
                            <th>Số lượng</th>
                            <th>Trọng tải</th>
                        </tr>
                        </thead>
                        <tbody>
                        {allocationDetails.details.map((detail, index) => {
                            const size = containerSizes.find(size => size.id === detail.containerSizeId);
                            return (
                                <tr key={index}>
                                    <td>
                                        <b>{size.containerType.name} x {size.containerType.type}</b>

                                    </td>
                                    <td>{size.length} x {size.width} x {size.height}</td>
                                    <td>{detail.quantity}</td>
                                    <td>{size.weight * detail.quantity}</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                    <table className="summary">
                        <tbody>
                        <tr>
                            <th>Tổng trọng tải: </th>
                            <td>{allocationDetails.totalCapacity}</td>
                        </tr>
                        </tbody>
                    </table>
                </main>
                <aside>
                    <hr />
                    <div>
                        <div>
                            <b>Điều kiện &amp; Điều khoản</b>
                            <p>
                                Hợp đồng cấp container rỗng sẽ được admin phê duyệt trước 30 ngày.
                            </p>
                        </div>
                        <div>
                            <b>Chữ kí của công ty</b>
                            <ul>
                                <li>VIMC</li>
                                <li>Tổng công ty Hàng Hải Việt Nam</li>
                            </ul>
                        </div>
                    </div>
                </aside>
            </div>


        );
    };

    return (
        <div className="p-grid p-justify-center p-align-center">
            <div className="p-col-12 p-md-10">
                <Formik
                    initialValues={{
                        allocationType: '',
                        shipId: '',
                        portName: '',
                        containerAllocations: [
                            { containerSizeId: '', quantity: '' }
                        ]
                    }}
                    validationSchema={Yup.object().shape({
                        allocationType: Yup.string().required('Vui lòng chọn loại cấp rỗng'),
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
                                label="Loại cấp rỗng"
                                name="allocationType"
                                options={[
                                    { label: 'Theo tàu', value: 'ship' },
                                    { label: 'Theo cảng', value: 'port' }
                                ]}
                                onChange={(e) => {
                                    setAllocationType(e.value);
                                    setFieldValue('shipId', '');
                                    setFieldValue('portName', '');
                                }}
                            />
                            {allocationType === 'ship' && (
                                <MyDropdown
                                    label="Chọn tàu"
                                    name="shipId"
                                    options={ships.map(ship => ({ label: ship.name, value: ship.id }))}
                                    onChange={(e) => setFieldValue('shipId', e.value)}
                                />
                            )}
                            {allocationType === 'port' && (
                                <MyDropdown
                                    label="Chọn cảng"
                                    name="portName"
                                    options={ports.map(port => ({ label: port.portName, value: port.portName }))}
                                    onChange={(e) => setFieldValue('portName', e.value)}
                                />
                            )}

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
            <Dialog header="Hợp đồng cấp container rỗng" visible={isModalVisible} onHide={() => setIsModalVisible(false)} footer={
                <div>
                    <Button label="OK" icon="pi pi-check" onClick={handleConfirm} />
                    <Button label="Cancel" icon="pi pi-times" onClick={() => setIsModalVisible(false)} className="p-button-secondary" />
                </div>
            }>
                {renderAllocationDetails()}
            </Dialog>
        </div>
    );
};

export default AllocateEmptyContainersForm;
