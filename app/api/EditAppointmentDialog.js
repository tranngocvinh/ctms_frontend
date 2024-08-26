import React, {useEffect, useState} from 'react';

const EditAppointmentDialog = ({ visible, onClose, onSave, appointment, routes }) => {
    const [text, setText] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [routeId, setRouteId] = useState('');

    useEffect(() => {
        if (appointment) {
            setText(appointment.text || '');
            setStartDate(appointment.startDate ? appointment.startDate.toISOString().substring(0, 16) : '');
            setEndDate(appointment.endDate ? appointment.endDate.toISOString().substring(0, 16) : '');
            setRouteId(appointment.route ? appointment.route.id : '');
        }
    }, [appointment]);

    const handleSave = () => {
        onSave({
            ...appointment,
            text,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            route: routes.find(route => route.id == routeId)
        });
    };

    if (!visible) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>{appointment ? 'Edit Appointment' : 'Add Appointment'}</h3>
                <label>Text:</label>
                <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
                <label>Start Date:</label>
                <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                <label>End Date:</label>
                <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                <label>Route:</label>
                <select value={routeId} onChange={(e) => setRouteId(e.target.value)}>
                    {routes.map(route => (
                        <option key={route.id} value={route.id}>{route.name}</option>
                    ))}
                </select>
                <button onClick={handleSave}>Save</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default EditAppointmentDialog;
