import React from "react";

export const CalendarList = (props) => {
    const { meetings } = props;

    const calendarList = meetings.map(meeting => (
        <ul key={meeting.id}>
            <li>
                <h3>Imię: {meeting.firstName}</h3>
                <h3>Nazwisko: {meeting.lastName}</h3>
                <h4>Email: {meeting.email}</h4>
                <h4>Date: {meeting.date}</h4>
                <h4>Time: {meeting.time}</h4>
            </li>
        </ul>

    ))

    return (
        calendarList
    )
}

export default CalendarList