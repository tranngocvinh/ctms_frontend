import React from 'react';

const colors = {
    scheduled: '#f06292', // Pink
    inProgress: '#4caf50', // Green
    completed: '#2196f3', // Blue
    cancelled: '#ff9800', // Orange
    default: '#607d8b' // Grey
};

const CustomAppointment = ({ data }) => {
    const { appointmentData } = data;
    const color = colors[appointmentData.status] || colors.default;

    return (
        <div style={{ backgroundColor: color, borderRadius: '4px', padding: '10px' }}>
            <div>{appointmentData.text}</div>
            <div>{new Date(appointmentData.startDate).toLocaleTimeString()} - {new Date(appointmentData.endDate).toLocaleTimeString()}</div>
        </div>
    );
};

export default CustomAppointment;
