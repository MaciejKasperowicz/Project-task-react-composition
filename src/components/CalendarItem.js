import React from "react";

import './CalendarItem.css'
export const CalendarItem = (props) => {

    const { firstName, lastName, email, date, time } = props;


    return (
        <li className="calendarItem">
            <div className="calendarItem__field">
                <h4 className="calendarItem__title">Imię: </h4>
                <h4 className="calendarItem__text">
                    {firstName}
                </h4>
            </div>
            <div className="calendarItem__field">
                <h4 className="calendarItem__title">Nazwisko:</h4>
                <h4 className="calendarItem__text">
                    {lastName}
                </h4>
            </div>
            <div className="calendarItem__field">
                <h4 className="calendarItem__title">Email:
                </h4>
                <h4 className="calendarItem__text">
                    {email}
                </h4>
            </div>
            <div className="calendarItem__field">
                <h4 className="calendarItem__title">Date:
                </h4>
                <h4 className="calendarItem__text">
                    {date}
                </h4>
            </div>
            <div className="calendarItem__field">
                <h4 className="calendarItem__title">Time:
                </h4>
                <h4 className="calendarItem__text">
                    {time}
                </h4>
            </div>
        </li>
    )
}

export default CalendarItem