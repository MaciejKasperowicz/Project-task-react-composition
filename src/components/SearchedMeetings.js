import React from "react";

export const SearchedMeetings = (props) => {
    const { searchedMeetings, setSearchInput } = props;
    const searchedMeetingsList = searchedMeetings.map(meeting => {
        return (<li
            key={meeting.id}
            onClick={setSearchInput}
        >{meeting.firstName}</li>)
    })
    return (
        <ul style={{ listStyle: "none" }}>
            {searchedMeetingsList}
        </ul>
    )
}

export default SearchedMeetings;