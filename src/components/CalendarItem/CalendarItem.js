import React from "react";

// import './CalendarItem.css'
import classes from './styles.module.css'
export const CalendarItem = (props) => {

    const { firstName, lastName, email, date, time } = props;


    return (
        <li className={classes.calendarItem}>
            <div className={classes.calendarItem__field}>
                <h4 className={classes.calendarItem__title}>Imię: </h4>
                <h4 className={classes.calendarItem__text}>
                    {firstName}
                </h4>
            </div>
            <div className={classes.calendarItem__field}>
                <h4 className={classes.calendarItem__title}>Nazwisko:</h4>
                <h4 className={classes.calendarItem__text}>
                    {lastName}
                </h4>
            </div>
            <div className={classes.calendarItem__field}>
                <h4 className={classes.calendarItem__title}>Email:
                </h4>
                <h4 className={classes.calendarItem__text}>
                    {email}
                </h4>
            </div>
            <div className={classes.calendarItem__field}>
                <h4 className={classes.calendarItem__title}>Date:
                </h4>
                <h4 className={classes.calendarItem__text}>
                    {date}
                </h4>
            </div>
            <div className={classes.calendarItem__field}>
                <h4 className={classes.calendarItem__title}>Time:
                </h4>
                <h4 className={classes.calendarItem__text}>
                    {time}
                </h4>
            </div>
        </li>
    )
}

export default CalendarItem