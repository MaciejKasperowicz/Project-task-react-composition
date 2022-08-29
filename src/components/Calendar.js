import React from "react";

import CalendarList from "./CalendarList";
import CalendarForm from "./CalendarForm";


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
                        this.errors = { ...this.errors, ["firstNameErr"]: true };
                    } else {
                        this.errors = { ...this.errors, ["firstNameErr"]: false };
                    }
                    break;
                case "lastName":
                    if (newMeeting[field].length < 2) {
                        this.errors = { ...this.errors, ["lastNameErr"]: true };
                    } else {
                        this.errors = { ...this.errors, ["lastNameErr"]: false };
                    }
                    break;
                case "email":
                    const isValidEmail = this.validateEmail(newMeeting[field]);
                    console.log({ isValidEmail });
                    if (!isValidEmail) {
                        this.errors = { ...this.errors, ["emailErr"]: true };
                    } else {
                        this.errors = { ...this.errors, ["emailErr"]: false };
                    }
                    break;
                case "date":
                    const isValidDate = this.validateDate(newMeeting[field]);
                    console.log({ isValidDate });
                    if (!isValidDate) {
                        this.errors = { ...this.errors, ["dateErr"]: true };
                    } else {
                        this.errors = { ...this.errors, ["dateErr"]: false };
                    }
                    break;
                case "time":
                    const isValidTime = this.validateTime(newMeeting[field]);
                    console.log({ isValidTime });
                    if (!isValidTime) {
                        this.errors = { ...this.errors, ["timeErr"]: true };
                    } else {
                        this.errors = { ...this.errors, ["timeErr"]: false };
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

    // _fetch(options = {}, additionalPath = "") {
    //     const { urlAPI } = this.state;
    //     const url = `${urlAPI}${additionalPath}`;
    //     return fetch(url, options)
    //         .then(resp => {
    //             if (resp.ok) { return resp.json() }
    //             return Promise.reject(resp);
    //         })
    //         .catch(err => console.log("Error:", err))
    // }


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
    // loadData() {
    //     this._fetch()
    //         .then(data => this.insertMeetings(data))
    //         .catch(err => console.error(err))
    // }

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
        const { firstName, lastName, email, date, time } = newMeeting
        return (
            <div>
                <h1>Calendar</h1>
                {<CalendarForm
                    firstNameValue={firstName}
                    lastNameValue={lastName}
                    emailValue={email}
                    dateValue={date}
                    timeValue={time}
                    // onNewMeetingNameChange={this.onNewMeetingNameChange}
                    handleInputChange={this.handleInputChange}
                    onSubmit={this.addNewMeeting}
                />}
                {meetings && <CalendarList meetings={meetings} />}
            </div>
        )
    }
}

export default Calendar;