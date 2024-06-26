"use client"
import React, { useState, useEffect } from 'react';
import Scheduler from 'devextreme-react/scheduler';
import axios from 'axios';
import 'devextreme/dist/css/dx.light.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const currentDate = new Date();
const views = ['week', 'month'];

// Define your custom status items
const statusItems = [
    { id: 'scheduled', name: 'Scheduled' },
    { id: 'inProgress', name: 'In Progress' },
    { id: 'completed', name: 'Completed' },
    { id: 'cancelled', name: 'Cancelled' }
];

// Define colors for different statuses
const colors = {
    scheduled: '#f06292', // Pink
    inProgress: '#4caf50', // Green
    completed: '#2196f3', // Blue
    cancelled: '#ff9800', // Orange
    default: '#607d8b' // Grey
};

const App = () => {
    const [appointments, setAppointments] = useState([]);
    const [routes, setRoutes] = useState([]);

    useEffect(() => {
        fetchAppointments();
        fetchRoutes();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/schedules');
            const mappedAppointments = response.data.map(item => ({
                ...item,
                startDate: new Date(item.departureTime), // Assume the backend returns time in the correct format
                endDate: new Date(item.estimatedArrivalTime), // Assume the backend returns time in the correct format
                text: item.notes,
                routeId: item.routeId,
                status: item.status // Ensure this mapping is correct
            }));
            setAppointments(mappedAppointments);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    const fetchRoutes = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/routes');
            setRoutes(response.data);
        } catch (error) {
            console.error('Error fetching routes:', error);
        }
    };

    const convertToLocalDateTimeString = (date) => {
        const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000); // Convert to local time
        return localDate.toISOString().slice(0, 19); // Format as 'YYYY-MM-DDTHH:mm:ss'
    };

    const handleAppointmentAdded = async (e) => {
        try {
            const appointment = e.appointmentData;
            await axios.post('http://localhost:8080/api/schedules', {
                departureTime: convertToLocalDateTimeString(appointment.startDate),
                estimatedArrivalTime: convertToLocalDateTimeString(appointment.endDate),
                notes: appointment.notes,
                routeId: appointment.routeId,
                status: appointment.status, // Ensure this mapping is correct
            });
            toast.success("Appointment added successfully!"); // Show success toast
            fetchAppointments(); // Fetch the latest appointments from the server
        } catch (error) {
            toast.error("Failed to add appointment."); // Show error toast
        }
    };

    const handleAppointmentUpdated = async (e) => {
        try {
            const appointment = e.appointmentData;
            await axios.put(`http://localhost:8080/api/schedules/${appointment.id}`, {
                departureTime: convertToLocalDateTimeString(appointment.startDate),
                estimatedArrivalTime: convertToLocalDateTimeString(appointment.endDate),
                notes: appointment.notes,
                routeId: appointment.routeId,
                status: appointment.status, // Ensure this mapping is correct
            });
            toast.success("Appointment updated successfully!"); // Show success toast
            fetchAppointments(); // Fetch the latest appointments from the server
        } catch (error) {
            toast.error("Failed to update appointment."); // Show error toast
        }
    };

    const handleAppointmentFormOpening = (e) => {
        const form = e.form;

        // Customizing the form fields
        form.option('items', [
            {
                dataField: 'routeId',
                editorType: 'dxSelectBox',
                editorOptions: {
                    dataSource: routes,
                    displayExpr: 'name', // Assuming the route object has a 'name' property
                    valueExpr: 'id',
                    value: e.appointmentData.routeId || ''
                },
                label: {
                    text: 'Route'
                }
            },
            {
                dataField: 'notes',
                editorType: 'dxTextBox',
                label: {
                    text: 'Notes'
                }
            },
            {
                dataField: 'startDate',
                editorType: 'dxDateBox',
                editorOptions: {
                    type: 'datetime'
                },
                label: {
                    text: 'Start Date'
                }
            },
            {
                dataField: 'endDate',
                editorType: 'dxDateBox',
                editorOptions: {
                    type: 'datetime'
                },
                label: {
                    text: 'End Date'
                }
            },
            {
                dataField: 'status',
                editorType: 'dxSelectBox',
                editorOptions: {
                    dataSource: statusItems,
                    displayExpr: 'name', // Display the 'name' property
                    valueExpr: 'id', // Use the 'id' property as the value
                    value: e.appointmentData.status || ''
                },
                label: {
                    text: 'Status'
                }
            },
        ]);
    };

    const applyCustomStyles = (e) => {
        const { appointmentData, appointmentElement } = e;
        const color = colors[appointmentData.status] || colors.default;
        appointmentElement.style.backgroundColor = color;
        appointmentElement.style.borderRadius = '4px';
        appointmentElement.style.color = '#ffffff'; // Adjust text color if needed
    };

    return (
        <div>
            <Scheduler
                timeZone="Asia/Ho_Chi_Minh" // Set the time zone to Vietnam
                dataSource={appointments}
                views={views}
                defaultCurrentView="week"
                defaultCurrentDate={currentDate}
                height={730}
                startDayHour={9}
                onAppointmentAdded={handleAppointmentAdded}
                onAppointmentUpdated={handleAppointmentUpdated}
                onAppointmentFormOpening={handleAppointmentFormOpening}
                onAppointmentRendered={applyCustomStyles} // Apply custom styles
            />
            <ToastContainer />
        </div>
    );
};

export default App;
