import React from "react";

import CalendarItem from "../CalendarItem"

import classes from './styles.module.css'


export const CalendarList = (props) => {
    const { meetings } = props;

    const calendarList = meetings.map(item =>
        <CalendarItem key={item.id} {...item} />
    )

    return (
        <section className={classes.calendarList}>
            <h3 className={classes.calendarList__title}>Lista wszystkich spotkań:</h3>
            <ul className={classes.calendarList__list}>
                {calendarList}
            </ul>
        </section>

    )
}

export default CalendarList