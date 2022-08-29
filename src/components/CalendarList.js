import React from "react";

import CalendarItem from "./CalendarItem";

export const CalendarList = (props) => {
    const { meetings } = props;

    const calendarList = meetings.map(item =>
        <CalendarItem key={item.id} {...item} />
    )

    return (
        <ul>
            {calendarList}


        </ul>
    )
}

export default CalendarList