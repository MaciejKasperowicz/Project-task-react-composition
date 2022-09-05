import React from "react";

import CalendarItem from "./CalendarItem";

import './CalendarList.css';

export const CalendarList = (props) => {
    const { meetings } = props;

    const calendarList = meetings.map(item =>
        <CalendarItem key={item.id} {...item} />
    )

    return (
        <section className="calendarList">
            <h3 className="calendarList__title">Lista wszystkich spotkań:</h3>
            <ul className="calendarList__list">
                {calendarList}
            </ul>
        </section>

    )
}

export default CalendarList