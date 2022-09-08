import React from "react";

import classes from './styles.module.css'

export const SearchedMeetings = (props) => {
    const { searchedMeetings, setSearchInput } = props;
    const searchedMeetingsList = searchedMeetings.map(meeting => {
        return (
            <li
                className={classes.searchedMeetings__item}
                key={meeting.id}
                onClick={setSearchInput}
            >{meeting.firstName}</li>)
    })
    return (
        <ul className={classes.searchedMeetings__list}>
            {searchedMeetingsList}
        </ul>
    )
}

export default SearchedMeetings;