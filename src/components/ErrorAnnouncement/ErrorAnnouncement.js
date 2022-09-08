import React from "react";

import classes from './styles.module.css'

export const ErrorAnnouncement = (props) => {
    const isAnyError = Object.values(props).some(err => err);
    const {
        firstNameErrAnnouncement,
        lastNameErrAnnouncement,
        emailErrAnnouncement,
        dateErrAnnouncement,
        timeErrAnnouncement
    } = props

    return (
        isAnyError ?
            <ul className={classes.errorAnnouncement}>
                <li className={classes.errorAnnouncement__item}>{firstNameErrAnnouncement}</li>
                <li className={classes.errorAnnouncement__item}>{lastNameErrAnnouncement}</li>
                <li className={classes.errorAnnouncement__item}>{emailErrAnnouncement}</li>
                <li className={classes.errorAnnouncement__item}>{dateErrAnnouncement}</li>
                <li className={classes.errorAnnouncement__item}>{timeErrAnnouncement}</li>
            </ul> : null


    )
}

export default ErrorAnnouncement;