import React from "react";

import CalendarList from "./CalendarList";
import CalendarForm from "./CalendarForm";
import ErrorAnnouncement from "./ErrorAnnouncement";
import Autocomplete from "./Autocomplete";

import './Calendar.css';

import { loadData, addData, getSearchData } from '../api'

export class Calendar extends React.Component {

    state = {
        urlAPI: "http://localhost:3005/meetings",
        newMeeting: {
            firstName: "",
            lastName: "",
            email: "",
            date: "",
            time: "",
        },
        isLoading: true,
        hasAPIError: false,
        meetings: null,
        searchedMeetings: null,
        errorsAnnouncement: {
            firstNameErrAnnouncement: null,
            lastNameErrAnnouncement: null,
            emailErrAnnouncement: null,
            dateErrAnnouncement: null,
            timeErrAnnouncement: null
        },
        errors: {
            firstNameErr: false,
            lastNameErr: false,
            emailErr: false,
            dateErr: false,
            timeErr: false
        },
        inputsStyles: {
            firstNameStyle: null,
            lastNameStyle: null,
            emailStyle: null,
            dateStyle: null,
            timeStyle: null,
        },
        searchInput: "",
        meetingsToShow: null,
    }

    validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email)
    }

    validateDate = (date) => {
        const re = /^\d{4}-\d{2}-\d{2}$/;
        return re.test(date);
    }

    validateTime = (time) => {
        const re = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/;
        return re.test(time);
    }

    setError = (field, message) => {
        this.setState(prevState => (
            {
                errors: { ...prevState.errors, [`${field}Err`]: true },
                errorsAnnouncement: { ...prevState.errorsAnnouncement, [`${field}ErrAnnouncement`]: message },
                inputsStyles: { ...prevState.inputsStyles, [`${field}Style`]: { border: "3px solid red" } }
            }
        ))
    }

    unsetError = (field) => {
        this.setState(prevState => (
            {
                errors: { ...prevState.errors, [`${field}Err`]: false },
                errorsAnnouncement: { ...prevState.errorsAnnouncement, [`${field}ErrAnnouncement`]: null },
                inputsStyles: { ...prevState.inputsStyles, [`${field}Style`]: { border: "3px solid green" } }
            }
        ))
    }
    validateNewMeeting = async (newMeeting) => {
        Object.keys(newMeeting).forEach(field => {
            switch (field) {
                case "firstName":
                    if (newMeeting[field].length < 2) {
                        this.setError(field, "Imię musi zawierać minimum dwa znaki.")
                    } else {
                        this.unsetError(field)
                    }
                    break;
                case "lastName":
                    if (newMeeting[field].length < 2) {
                        this.setError(field, "Nazwisko musi zawierać minimum dwa znaki.")
                    } else {
                        this.unsetError(field)
                    }
                    break;
                case "email":
                    const isValidEmail = this.validateEmail(newMeeting[field]);
                    if (!isValidEmail) {
                        this.setError(field, "Wpisz poprawny adres email, zawierający @.")
                    } else {
                        this.unsetError(field)
                    }
                    break;
                case "date":
                    const isValidDate = this.validateDate(newMeeting[field]);
                    if (!isValidDate) {
                        this.setError(field, "Wprowadź datę w formacie: YYY-mm-dd.")
                    } else {
                        this.unsetError(field)
                    }
                    break;
                case "time":
                    const isValidTime = this.validateTime(newMeeting[field]);
                    if (!isValidTime) {
                        this.setError(field, "Wprowadź czas w formacie: HH:mm.")
                    } else {
                        this.unsetError(field)
                    }
                    break;
                default:
                    break;
            }
        })
    }

    handleInputChange = (e) => {
        const { target } = e;
        const { name, value } = target;

        // console.log({ name, value });

        this.setState(prevState => (
            { newMeeting: { ...prevState.newMeeting, [name]: value } }
        ))
    }

    handleSearchInputChange = async (e) => {
        // console.log(e.target.value);
        const searchInputValue = e.target.value;

        this.setState(prevState => (
            { searchInput: searchInputValue }
        ))

        // this.getSearchData(searchInputValue)
        try {
            const searchedData = await getSearchData(searchInputValue);
            this.setState(() => (
                {
                    searchedMeetings: searchedData,
                    meetings: searchedData,
                    hasAPIError: false
                }
            ))
        } catch (error) {
            this.setState(() => ({
                hasAPIError: true
            }))
        } finally {
            this.setState(() => ({
                isLoading: false
            }))
        }
    }


    setSearchInput = (e) => {
        const searchedValue = e.target.textContent
        const allMeetings = this.state.meetings;
        const meetingsToShow = allMeetings.filter(meeting => {
            return meeting.firstName === searchedValue
        })
        console.log(meetingsToShow);
        this.setState(() => (
            {
                searchInput: searchedValue,
                searchedMeetings: null,
                meetings: meetingsToShow
            }
        ))
    }


    addNewMeeting = async (e) => {
        e.preventDefault();
        const { newMeeting } = this.state;
        // console.log(newMeeting);


        await this.validateNewMeeting(newMeeting);
        const isValidNewMeeting = !Object.values(this.state.errors).some(err => err === true);
        console.log(isValidNewMeeting);



        if (isValidNewMeeting) {
            // const response = await this.addData(newMeeting);
            try {
                const response = await addData(newMeeting)
                newMeeting.id = response.id
                this.setState(prevState => {
                    return {
                        newMeeting: {
                            firstName: "",
                            lastName: "",
                            email: "",
                            date: "",
                            time: "",
                        },
                        inputsStyles: {
                            firstNameStyle: null,
                            lastNameStyle: null,
                            emailStyle: null,
                            dateStyle: null,
                            timeStyle: null,
                        },
                        meetings: [...prevState.meetings, newMeeting],
                        hasAPIError: false
                    }
                })
            } catch (error) {
                this.setState(() => ({
                    hasAPIError: true
                }))
            } finally {
                this.setState(() => ({
                    isLoading: false
                }))
            }

        }
    }

    async componentDidMount() {
        // this.loadData()
        try {
            const meetings = await loadData();
            this.setState(() => {
                return {
                    meetings: meetings,
                    hasAPIError: false
                }
            })
        } catch (error) {
            this.setState(() => ({
                hasAPIError: true
            }))
        } finally {
            this.setState(() => ({
                isLoading: false
            }))
        }
    }

    render() {
        const { meetings, newMeeting, inputsStyles, searchInput, searchedMeetings } = this.state;

        return (
            <main className="calendar__main">
                <h1 className="calendar__title">Calendar</h1>
                <section className="calendar__section">
                    <section className="calendar__left">
                        {<CalendarForm
                            {...newMeeting}
                            {...inputsStyles}
                            handleInputChange={this.handleInputChange}
                            onSubmit={this.addNewMeeting}
                        />}
                        {<ErrorAnnouncement {...this.state.errorsAnnouncement} />}
                        {<Autocomplete
                            searchValue={searchInput}
                            handleSearchInputChange={this.handleSearchInputChange}
                            searchedMeetings={searchedMeetings}
                            setSearchInput={this.setSearchInput}
                        />}
                    </section>
                    <section className="calendar__right">
                        {meetings && <CalendarList meetings={meetings} />}
                    </section>
                </section>


            </main>
        )
    }
}

export default Calendar;