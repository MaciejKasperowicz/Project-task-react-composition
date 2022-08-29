import React from "react";

export const CalendarItem = (props) => {

    const { firstName, lastName, email, date, time } = props;


    return (
        <li>
            <h3>Imię: {firstName}</h3>
            <h3>Nazwisko: {lastName}</h3>
            <h4>Email: {email}</h4>
            <h4>Date: {date}</h4>
            <h4>Time: {time}</h4>
        </li>
    )
}

export default CalendarItem