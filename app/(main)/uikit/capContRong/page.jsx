/* eslint react-hooks/rules-of-hooks: 0 */
"use client";
import React, {useEffect, useRef, useState} from 'react';
import 'primeflex/primeflex.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {FieldArray, Form, Formik, useField} from 'formik';
import {Dropdown} from 'primereact/dropdown';
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import {Card} from 'primereact/card';
import {Toast} from 'primereact/toast';
import * as Yup from 'yup';
import axios from 'axios';
import {allocateContainersToShip} from 'app/api/container';
import 'app/components/AllocateEmptyContainersForm.css';
import {isCustomer} from "../../../verifyRole";

const MyDropdown = ({label, options, onChange, ...props}) => {
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
                    style={{width: "100%"}}
                    filter
                    showClear
                    filterBy="label"
                />
                {meta.touched && meta.error ? (
                    <small className="p-error">{meta.error}</small>
                ) : null}
            </div>
        </div>
    );
};

const AllocateEmptyContainers = () => {
    const jwtToken = localStorage.getItem('jwtToken');
    const authToken = localStorage.getItem('authToken');
    if (!isCustomer(jwtToken, authToken)) {
        return <p>Trang này không tồn tại</p>;
    }
    const [containerSizes, setContainerSizes] = useState([]);
    const [ships, setShips] = useState([]);
    const [ports, setPorts] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [allocationDetails, setAllocationDetails] = useState(null);
    const [containerCodes, setContainerCodes] = useState([]);
    const [containerDetails, setContainerDetails] = useState([]);
    const toast = useRef(null);


    useEffect(() => {
        fetchShips();
        fetchPorts();
        fetchContainerSizes();
    }, []);

    const getAuthConfig = () => ({
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
        }
    });

    const fetchContainerSizes = async () => {
        try {
            const response = await axios.get(`https://auth.g42.biz/api/containers/sizes`,getAuthConfig());
            setContainerSizes(response.data);
        } catch (error) {
            console.error('Error fetching container sizes:', error);
        }
    };

    const fetchContainerCodesByPort = async (portId) => {
        try {
            const response = await axios.get(`https://auth.g42.biz/api/containers/getByPort`, {
                params: {portId},
                ...getAuthConfig()
            });
            console.log(response.data);
            setContainerCodes(response.data);
        } catch (error) {
            console.error('Error fetching container codes:', error);
            setContainerCodes([]);
        }
    };

    const fetchShips = async () => {
        try {
            const response = await axios.get(`https://auth.g42.biz/api/ships`,getAuthConfig());
            setShips(response.data);
        } catch (error) {
            console.error('Error fetching ships:', error);
        }
    };

    const fetchPorts = async () => {
        try {
            const response = await axios.get(`https://auth.g42.biz/api/ports`,getAuthConfig());
            setPorts(response.data);
        } catch (error) {
            console.error('Error fetching ports:', error);
        }
    };

    const handlePortChange = (portId, setFieldValue) => {
        setFieldValue('portId', portId);
        fetchContainerCodesByPort(portId);
    };

    const handleSubmit = async (values, {setSubmitting}) => {
        try {
            const containerDetailsPromises = values.details.map(allocation =>
                axios.get(`https://auth.g42.biz/api/containers/${allocation.containerCode}`, getAuthConfig())
            );

            const containerDetailsResponses = await Promise.all(containerDetailsPromises);
            const fetchedContainerDetails = containerDetailsResponses.map(response => response.data);

            const totalCapacity = fetchedContainerDetails.reduce((sum, detail) => {
                return sum + (detail.containerSize.loadCapacity);
            }, 0);

            const requestData = {
                shipId: values.shipId,
                portId: values.portId,
                totalCapacity: totalCapacity,
                requestTime: new Date().toISOString(),
                details: values.details.map(allocation => ({
                    containerCode: allocation.containerCode
                }))
            };

            setAllocationDetails(requestData);
            setContainerDetails(fetchedContainerDetails);
            setIsModalVisible(true);
        } catch (error) {
            console.error('Error allocating containers:', error);
            alert('An error occurred');
        } finally {
            setSubmitting(false);
        }
    };

    const handleConfirm = async () => {
        try {
            await allocateContainersToShip(allocationDetails);
            toast.current.show({
                severity: 'success',
                summary: 'Success',
                detail: 'Thêm container thành công',
                life: 3000
            });
        } catch (error) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Tàu đã hết chỗ cho container này',
                life: 3000
            });
        } finally {
            setIsModalVisible(false);
        }
    };

    const renderAllocationDetails = () => {
        if (!allocationDetails || !containerDetails.length) return null;

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
                            <h2>Hợp đồng tạo ngày: {new Date().toLocaleDateString()} </h2>
                        </div>
                    </div>
                </header>

                <main>
                    <table style={{textAlignLast: "center"}}>
                        <thead>
                        <tr>
                            <th>Loại container</th>
                            <th>Mã container</th>
                            <th>Kích thước</th>
                            <th>Trọng tải</th>
                        </tr>
                        </thead>
                        <tbody>
                        {allocationDetails.details.map((detail, index) => {
                            const containerDetail = containerDetails[index];
                            const size = containerDetail.containerSize;

                            return (
                                <tr key={index}>
                                    <td>
                                        <b>{size.containerType.name} x {size.containerType.type}</b>
                                    </td>
                                    <td>{containerDetail.containerCode}</td>
                                    <td>{size.length} x {size.width} x {size.height}</td>
                                    <td>{size.weight}</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                    <div style={{textAlign: "-webkit-center"}}>
                        <table style={{maxWidth: "fit-content"}}>
                            <tbody>
                            <tr>
                                <th>Tổng trọng tải: {allocationDetails.totalCapacity} </th>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </main>
                <aside>
                    <hr/>
                    <div>
                        <div>
                            <b>Điều kiện &amp; Điều khoản</b>
                            <p>
                                Hợp đồng cấp container rỗng sẽ được admin phê duyệt trước 30 ngày.
                            </p>
                        </div>
                        <div>
                            <b>Chữ kí của bên công ty</b>
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
            <Toast ref={toast}/> {/* Add the Toast component */}
            <div className="p-col-12 p-md-10">
                <Formik
                    initialValues={{
                        shipId: '',
                        portId: '',
                        details: [
                            {containerCode: ''}
                        ]
                    }}
                    validationSchema={Yup.object().shape({
                        shipId: Yup.string().required('Vui lòng chọn Tàu'),
                        portId: Yup.string().required('Vui lòng chọn Cảng'),
                        details: Yup.array().of(
                            Yup.object().shape({
                                containerCode: Yup.string().required('Vui lòng chọn container'),
                            })
                        ),
                    })}
                    onSubmit={handleSubmit}
                >
                    {({values, isSubmitting, setFieldValue}) => (
                        <div>
                            <div className="card-header">
                                <h2>Bảng cấp rỗng</h2>
                            </div>
                            <Card className="custom-card">
                                <Form className="">
                                    <div className="card-content">
                                        <MyDropdown
                                            label='Chọn tàu'
                                            name="shipId"
                                            options={ships.map(ship => ({
                                                label: ship.name,
                                                value: ship.id
                                            }))}
                                            onChange={(e) => setFieldValue('shipId', e.value)}
                                            value={values.shipId}
                                        />

                                        <MyDropdown
                                            label="Chọn cảng"
                                            name="portId"
                                            options={ports.map(port => ({
                                                label: port.portName,
                                                value: port.id
                                            }))}
                                            onChange={(e) => handlePortChange(e.value, setFieldValue)}
                                            value={values.portId}
                                        />
                                        <FieldArray name="details">
                                            {({remove, push}) => (
                                                <div>
                                                    {values.details.length > 0 && values.details.map((allocation, index) => (
                                                        <div className="container-allocation" key={index}>
                                                            <MyDropdown
                                                                label="Mã Container"
                                                                name={`details.${index}.containerCode`}
                                                                options={containerCodes.map(code => ({
                                                                    label: code.containerCode,
                                                                    value: code.containerCode
                                                                }))}
                                                                onChange={(e) => setFieldValue(`details.${index}.containerCode`, e.value)}
                                                                value={allocation.containerCode}
                                                            />
                                                            <i className="pi pi-trash"
                                                               style={{
                                                                   fontSize: '1rem',
                                                                   marginRight: '10px',
                                                                   marginLeft: '10px',
                                                                   color: 'green'
                                                               }}
                                                               onClick={() => values.details.length > 1 && remove(index)}/>
                                                            <i className="pi pi-plus"
                                                               style={{
                                                                   fontSize: '1rem',
                                                                   marginRight: '10px',
                                                                   marginLeft: '10px',
                                                                   color: 'red'
                                                               }}
                                                               onClick={() => push({
                                                                   containerCode: ''
                                                               })}/>
                                                        </div>

                                                    ))}
                                                    <div className="p-col-12 text-left">
                                                        <Button
                                                            type="submit"
                                                            label="Xác nhận"
                                                            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300
                                                                font-medium rounded-lg text-sm py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700
                                                                dark:focus:ring-gray-700 dark:border-gray-700"
                                                            disabled={isSubmitting}
                                                            style={{marginTop: '20px'}}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </FieldArray>
                                    </div>
                                </Form>
                            </Card>
                        </div>
                    )}
                </Formik>
            </div>
            <Dialog
                header="Hợp đồng cấp container rỗng"
                visible={isModalVisible}
                onHide={() => setIsModalVisible(false)}
                footer={
                    <div>
                        <Button label="OK" icon="pi pi-check" onClick={handleConfirm}/>
                        <Button label="Cancel" icon="pi pi-times" onClick={() => setIsModalVisible(false)}
                                className="p-button-secondary"/>
                    </div>
                }
            >
                {renderAllocationDetails()}
            </Dialog>
        </div>
    );
};

export default AllocateEmptyContainers;
