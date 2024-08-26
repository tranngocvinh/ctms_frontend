import React from 'react';
import {Dialog} from 'primereact/dialog';

const ScheduleDetailsModal = ({ visible, onHide, schedule }) => {
    return (
        <Dialog header="Chi tiết lịch trình" visible={visible} style={{ width: '50vw' }} onHide={onHide}>
            {schedule ? (
                <div>
                    <p><strong>Thời gian khởi hành:</strong> {new Date(schedule.departureTime).toLocaleString()}</p>
                    <p><strong>Thời gian đến dự kiến:</strong> {new Date(schedule.estimatedArrivalTime).toLocaleString()}</p>
                    <p><strong>Lộ trình:</strong> {schedule.routeName}</p>
                    <p><strong>Các cảng dừng:</strong></p>
                    <ul>
                        {schedule.waypoints.map((waypoint, index) => (
                            <li key={index}>{waypoint.portName}</li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </Dialog>
    );
};

export default ScheduleDetailsModal;
