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

        <ul style={{ listStyle: "none" }}>
            <li>{firstNameErrAnnouncement}</li>
            <li>{lastNameErrAnnouncement}</li>
            <li>{emailErrAnnouncement}</li>
            <li>{dateErrAnnouncement}</li>
            <li >{timeErrAnnouncement}</li>
        </ul>


    )
}

export default ErrorAnnouncement;