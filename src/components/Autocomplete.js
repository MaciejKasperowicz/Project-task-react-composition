import React from "react";
import SearchedMeetings from "./SearchedMeetings";

import './Autocomplete.css'

export const Autocomplete = (props) => {
    // console.log(props);
    const { searchValue, handleSearchInputChange, searchedMeetings, setSearchInput } = props;
    return (
        <div className="autocomplete">
            <label className="autocomplete__label">
                Wyszukaj spotkanie:
            </label>
            <input type="text" name="searchValue"
                className="autocomplete__input"
                value={searchValue}
                onChange={handleSearchInputChange}

            />
            {searchedMeetings && <SearchedMeetings
                searchedMeetings={searchedMeetings}
                setSearchInput={setSearchInput}
            />}
        </div>
    )
}

export default Autocomplete;