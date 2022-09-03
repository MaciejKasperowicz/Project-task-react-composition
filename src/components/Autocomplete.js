import React from "react";
import SearchedMeetings from "./SearchedMeetings";

export const Autocomplete = (props) => {
    // console.log(props);
    const { searchValue, handleSearchInputChange, searchedMeetings, setSearchInput } = props;
    return (
        <div>
            <label>
                Wyszukaj spotkanie:
                <br />
                <input type="text" name="searchValue"
                    value={searchValue}
                    onChange={handleSearchInputChange}

                />
            </label>
            {searchedMeetings && <SearchedMeetings
                searchedMeetings={searchedMeetings}
                setSearchInput={setSearchInput}
            />}
        </div>
    )
}

export default Autocomplete;