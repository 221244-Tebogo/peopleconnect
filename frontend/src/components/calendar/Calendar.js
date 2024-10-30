import React, { useState, useEffect } from "react";
import "./Calendar.css";

const Calendar = ({ events = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);

  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const daysArray = [];
    for (let i = firstDayOfMonth; i > 0; i--) {
      daysArray.push({
        day: daysInPrevMonth - i + 1,
        currentMonth: false,
      });
    }

    for (let i = 1; i <= daysInCurrentMonth; i++) {
      daysArray.push({
        day: i,
        currentMonth: true,
      });
    }

    setDaysInMonth(daysArray);
  }, [currentDate]);

  const addEventToDay = (day) => {
    if (!events || !Array.isArray(events)) return null; // Ensure events is a valid array

    const event = events.find(
      (e) =>
        new Date(e.date).getDate() === day &&
        new Date(e.date).getMonth() === currentDate.getMonth()
    );
    return event ? <div className="event">{event.name}</div> : null;
  };

  const renderDays = () => {
    return daysInMonth.map((dayObj, index) => (
      <div
        key={index}
        className={`day_num ${dayObj.currentMonth ? "" : "ignore"}`}
      >
        <span>{dayObj.day}</span>
        {dayObj.currentMonth && addEventToDay(dayObj.day)}
      </div>
    ));
  };

  return (
    <div className="calendar">
      <div className="header">
        <div className="month-year">
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </div>
      </div>
      <div className="days">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((dayName, i) => (
          <div key={i} className="day_name">
            {dayName}
          </div>
        ))}
        {renderDays()}
      </div>
    </div>
  );
};

export default Calendar;
