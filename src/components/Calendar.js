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
        meetings: null
    }

    errors = {
        firstNameErr: false,
        lastNameErr: false,
        emailErr: false,
        dateErr: false,
        timeErr: false
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

    validateNewMeeting = (newMeeting) => {

        Object.keys(newMeeting).forEach(field => {
            switch (field) {
                case "firstName":
                    if (newMeeting[field].length < 2) {
                        this.errors = { ...this.errors, firstNameErr: true };

                        this.setState(prevState => (
                            { errorsAnnouncement: { ...prevState.errorsAnnouncement, firstNameErrAnnouncement: "Imię musi zawierać minimum dwa znaki" } }
                        ))
                    } else {
                        this.errors = { ...this.errors, firstNameErr: false };

                        this.setState(prevState => (
                            { errorsAnnouncement: { ...prevState.errorsAnnouncement, firstNameErrAnnouncement: null } }
                        ))
                    }
                    break;
                case "lastName":
                    if (newMeeting[field].length < 2) {
                        this.errors = { ...this.errors, lastNameErr: true };

                        this.setState(prevState => (
                            { errorsAnnouncement: { ...prevState.errorsAnnouncement, lastNameErrAnnouncement: "Nazwisko musi zawierać minimum dwa znaki" } }
                        ))
                    } else {
                        this.errors = { ...this.errors, lastNameErr: false };

                        this.setState(prevState => (
                            { errorsAnnouncement: { ...prevState.errorsAnnouncement, lastNameErrAnnouncement: null } }
                        ))
                    }
                    break;
                case "email":
                    const isValidEmail = this.validateEmail(newMeeting[field]);
                    console.log({ isValidEmail });
                    if (!isValidEmail) {
                        this.errors = { ...this.errors, emailErr: true };

                        this.setState(prevState => (
                            { errorsAnnouncement: { ...prevState.errorsAnnouncement, emailErrAnnouncement: "Wpisz poprawny adres email, zawierający @" } }
                        ))
                    } else {
                        this.errors = { ...this.errors, emailErr: false };

                        this.setState(prevState => (
                            { errorsAnnouncement: { ...prevState.errorsAnnouncement, emailErrAnnouncement: null } }
                        ))
                    }
                    break;
                case "date":
                    const isValidDate = this.validateDate(newMeeting[field]);
                    console.log({ isValidDate });
                    if (!isValidDate) {
                        this.errors = { ...this.errors, dateErr: true };

                        this.setState(prevState => (
                            { errorsAnnouncement: { ...prevState.errorsAnnouncement, dateErrAnnouncement: "Wprowadź datę w formacie: YYY-mm-dd" } }
                        ))
                    } else {
                        this.errors = { ...this.errors, dateErr: false };

                        this.setState(prevState => (
                            { errorsAnnouncement: { ...prevState.errorsAnnouncement, dateErrAnnouncement: null } }
                        ))
                    }
                    break;
                case "time":
                    const isValidTime = this.validateTime(newMeeting[field]);
                    console.log({ isValidTime });
                    if (!isValidTime) {
                        this.errors = { ...this.errors, timeErr: true };
                        // this.errorsAnnouncement = { ...this.errorsAnnouncement, timeErrAnnouncement: "Wprowadź czas w formacie: HH:mm" }
                        this.setState(prevState => (
                            { errorsAnnouncement: { ...prevState.errorsAnnouncement, timeErrAnnouncement: "Wprowadź czas w formacie: HH:mm" } }
                        ))
                    } else {
                        this.errors = { ...this.errors, timeErr: false };
                        // this.errorsAnnouncement = { ...this.errorsAnnouncement, ["timeErrAnnouncement"]: null }
                        this.setState(prevState => (
                            { errorsAnnouncement: { ...prevState.errorsAnnouncement, timeErrAnnouncement: null } }
                        ))
                    }
                    break;
                default:
                    break;
            }
        })
        const isValidInputs = !Object.values(this.errors).some(err => err === true);
        return isValidInputs;
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
        console.log(newMeeting);

        const isValidNewMeeting = this.validateNewMeeting(newMeeting)
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
        const { meetings, newMeeting } = this.state;
        const { firstName, lastName, email, date, time } = newMeeting;

        return (
            <div>
                <h1>Calendar</h1>
                {<CalendarForm
                    firstNameValue={firstName}
                    lastNameValue={lastName}
                    emailValue={email}
                    dateValue={date}
                    timeValue={time}
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