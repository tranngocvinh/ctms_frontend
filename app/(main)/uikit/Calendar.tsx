import React from 'react';
import './calendar.css'; // Adjust the path according to your file structure
const Calendar: React.FC = () => {
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const startDay = new Date(currentYear, currentMonth, 1).getDay();

    const days = [];
    for (let i = 0; i < startDay; i++) {
        days.push(<div key={`empty-${i}`} className="day empty"></div>);
    }
    for (let d = 1; d <= daysInMonth; d++) {
        const isToday = d === currentDay ? 'today' : '';
        days.push(
            <div key={d} className={`day ${isToday}`}>
                {d}
            </div>
        );
    }

    return (
        <div className="calendar">
            <div className="calendar-header">
                <h5>{today.toLocaleString('default', { month: 'long' })} {currentYear}</h5>
            </div>
            <div className="calendar-body">
                <div className="weekdays">
                    <div>Thứ 2</div>
                    <div>Thứ 3</div>
                    <div>Thứ 4</div>
                    <div>Thứ 5</div>
                    <div>Thứ 6</div>
                    <div>Thứ 7</div>
                    <div>Chủ nhật</div>
                </div>
                <div className="days">
                    {days}
                </div>
            </div>
        </div>
    );
};

export default Calendar;
