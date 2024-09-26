"use client"
import React, {useEffect, useState} from 'react';
import {Dropdown} from 'primereact/dropdown';
import {Calendar} from 'primereact/calendar';
import {Button} from 'primereact/button';
import axios from 'axios';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const ScheduleForm = ({ onSave }) => {
    const [routes, setRoutes] = useState([]);
    const [ships, setShips] = useState([]);
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [selectedShip, setSelectedShip] = useState(null);
    const [scheduleSegments, setScheduleSegments] = useState([]);
    const [scheduleData, setScheduleData] = useState({
        routeId: null,
        departureTime: null,
        estimatedArrivalTime: null,
        actualDepartureTime: null,
        actualArrivalTime: null,
        status: 'Scheduled',
        notes: '',
        ships: [],
        scheduleSegments: []
    });
    const getAuthConfig = () => ({
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
    });
    useEffect(() => {
        // Fetch routes and ships from the API
        axios.get(`https://auth.g42.biz/api/routes`,getAuthConfig()).then(response => {
            setRoutes(response.data);
        });

        axios.get(`https://auth.g42.biz/api/ships`,getAuthConfig()).then(response => {
            setShips(response.data);
        });
    }, []);

    useEffect(() => {
        if (selectedRoute) {
            setScheduleSegments(selectedRoute.routeSegments.map(segment => ({
                routeSegmentId: segment.id,
                departureTime: null,
                arrivalTime: null
            })));
        }
    }, [selectedRoute]);

    const handleRouteChange = (e) => {
        setSelectedRoute(e.value);
        setScheduleData({ ...scheduleData, routeId: e.value.id });
    };

    const handleShipChange = (e) => {
        setSelectedShip(e.value);
        setScheduleData({ ...scheduleData, ships: [e.value.id] });
    };

    const handleSegmentTimeChange = (index, field, value) => {
        const updatedSegments = [...scheduleSegments];
        updatedSegments[index][field] = value;
        setScheduleSegments(updatedSegments);
    };

    const handleSubmit = () => {
        const dataToSubmit = {
            ...scheduleData,
            scheduleSegments: scheduleSegments.map(segment => ({
                routeSegmentId: segment.routeSegmentId,
                departureTime: segment.departureTime,
                arrivalTime: segment.arrivalTime
            }))
        };

        axios.post(`https://auth.g42.biz/api/schedules`, dataToSubmit)
            .then(response => {
                console.log('Schedule added successfully', response.data);
                // Reset form or show success message
                if (onSave) onSave();
            })
            .catch(error => {
                console.error('Error adding schedule', error);
            });
    };

    const getSegmentTitle = (index) => {
        if (selectedRoute && selectedRoute.waypoints && selectedRoute.waypoints.length > index + 1) {
            const startPort = selectedRoute.waypoints[index].portName;
            const endPort = selectedRoute.waypoints[index + 1].portName;
            return `${startPort} - ${endPort}`;
        }
        return `Chặng ${index + 1}`;
    };

    return (
        <div className="card">
            <h2>Thêm lịch hạ hàng</h2>
            <div className="p-field">
                <label htmlFor="route">Chọn Route</label>
                <Dropdown value={selectedRoute} options={routes} onChange={handleRouteChange} optionLabel="name" placeholder="Chọn Route" />
            </div>
            <div className="p-field">
                <label htmlFor="ship">Chọn Tàu</label>
                <Dropdown value={selectedShip} options={ships} onChange={handleShipChange} optionLabel="name" placeholder="Chọn Tàu" />
            </div>
            <div className="p-field">
                <label htmlFor="departureTime">Thời gian khởi hành</label>
                <Calendar id="departureTime" value={scheduleData.departureTime} onChange={(e) => setScheduleData({ ...scheduleData, departureTime: e.value })} showTime showSeconds />
            </div>
            <div className="p-field">
                <label htmlFor="estimatedArrivalTime">Thời gian dự kiến đến</label>
                <Calendar id="estimatedArrivalTime" value={scheduleData.estimatedArrivalTime} onChange={(e) => setScheduleData({ ...scheduleData, estimatedArrivalTime: e.value })} showTime showSeconds />
            </div>
            {scheduleSegments.map((segment, index) => (
                <div key={index} className="p-field">
                    <h5>Chặng {index + 1}: {getSegmentTitle(index)}</h5>
                    <label htmlFor={`segmentDepartureTime-${index}`}>Thời gian khởi hành</label>
                    <Calendar id={`segmentDepartureTime-${index}`} value={segment.departureTime} onChange={(e) => handleSegmentTimeChange(index, 'departureTime', e.value)} showTime showSeconds />
                    <label htmlFor={`segmentArrivalTime-${index}`}>Thời gian đến</label>
                    <Calendar id={`segmentArrivalTime-${index}`} value={segment.arrivalTime} onChange={(e) => handleSegmentTimeChange(index, 'arrivalTime', e.value)} showTime showSeconds />
                </div>
            ))}
            <div className="p-field">
                <label htmlFor="notes">Ghi chú</label>
                <textarea id="notes" rows={3} value={scheduleData.notes} onChange={(e) => setScheduleData({ ...scheduleData, notes: e.target.value })} className="p-inputtext p-component p-filled" />
            </div>
            <Button label="Thêm Lịch" icon="pi pi-check" onClick={handleSubmit} />
        </div>
    );
};
export default ScheduleForm;
