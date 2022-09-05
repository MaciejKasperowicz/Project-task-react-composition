import React from "react";

import './SearchedMeetings.css'

export const SearchedMeetings = (props) => {
    const { searchedMeetings, setSearchInput } = props;
    const searchedMeetingsList = searchedMeetings.map(meeting => {
        return (
            <li
                className="searchedMeetings__item"
                key={meeting.id}
                onClick={setSearchInput}
            >{meeting.firstName}</li>)
    })
    return (
        <ul className="searchedMeetings__list">
            {searchedMeetingsList}
        </ul>
    )
}

export default SearchedMeetings;