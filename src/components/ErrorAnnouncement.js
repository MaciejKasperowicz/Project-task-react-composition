import React from "react";

export const ErrorAnnouncement = (props) => {

    const {
        firstNameErrAnnouncement,
        lastNameErrAnnouncement,
        emailErrAnnouncement,
        dateErrAnnouncement,
        timeErrAnnouncement
    } = props

    return (
        <ul>
            <h5>{firstNameErrAnnouncement}</h5>
            <h5>{lastNameErrAnnouncement}</h5>
            <h5>{emailErrAnnouncement}</h5>
            <h5>{dateErrAnnouncement}</h5>
            <h5>{timeErrAnnouncement}</h5>


        </ul>
    )
}

export default ErrorAnnouncement;