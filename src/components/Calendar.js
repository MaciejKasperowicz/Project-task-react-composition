import React from "react";

import CalendarList from "./CalendarList";
import CalendarForm from "./CalendarForm";
import ErrorAnnouncement from "./ErrorAnnouncement";


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
        meetings: null,
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

        console.log({ name, value });

        this.setState(prevState => (
            { newMeeting: { ...prevState.newMeeting, [name]: value } }
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
            const response = await this.addData(newMeeting);
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
                    meetings: [...prevState.meetings, newMeeting]
                }
            })
        }
    }

    async _fetch(options = {}, additionalPath = "") {
        const { urlAPI } = this.state;
        const url = `${urlAPI}${additionalPath}`
        const response = await fetch(url, options);
        const data = await response.json();
        return data
    }

    insertMeetings(data) {
        this.setState(() => {
            return {
                meetings: data
            }
        })
    }

    async loadData() {
        const data = await this._fetch();
        this.insertMeetings(data);
    }


    async addData(newData) {
        const options = {
            method: "POST",
            body: JSON.stringify(newData),
            headers: { "Content-Type": "application/json" }
        }

        const data = await this._fetch(options)
        return data
    }

    componentDidMount() {
        this.loadData()
    }

    render() {
        const { meetings, newMeeting, inputsStyles } = this.state;

        return (
            <div>
                <h1>Calendar</h1>
                {<CalendarForm
                    {...newMeeting}
                    {...inputsStyles}
                    handleInputChange={this.handleInputChange}
                    onSubmit={this.addNewMeeting}
                />}
                {<ErrorAnnouncement {...this.state.errorsAnnouncement} />}
                {meetings && <CalendarList meetings={meetings} />}
            </div>
        )
    }
}

export default Calendar;