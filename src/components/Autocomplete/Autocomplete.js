import React from "react";
import SearchedMeetings from "../SearchedMeetings";

import classes from './styles.module.css'

export const Autocomplete = (props) => {
    const { searchValue, handleSearchInputChange, searchedMeetings, setSearchInput } = props;
    return (
        <div className={classes.autocomplete}>
            <label className={classes.autocomplete__label}>
                Wyszukaj spotkanie:
            </label>
            <input type="text" name="searchValue"
                className={classes.autocomplete__input}
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