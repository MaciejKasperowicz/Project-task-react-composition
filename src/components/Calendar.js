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

    // onNewMeetingNameChange = (e) => {
    //     console.log(e.target);
    //     const firstName = e.target.value
    //     this.setState((prevState) => {
    //         return {
    //             newMeeting: { ...prevState.newMeeting, firstName }
    //         }
    //     })
    // }

    errors = {
        firstNameErr: false,
        lastNameErr: false,
        emailErr: false,
        dateErr: false,
        timeErr: false
    }

    validateInputs = (inputName, inputValue) => {
        switch (inputName) {
            case "firstName":
                if (inputValue.length < 2) {
                    this.errors = { ...this.errors, ["firstNameErr"]: true };
                } else {
                    this.errors = { ...this.errors, ["firstNameErr"]: false };
                }
                break;
            case "lastName":
                if (inputValue.length < 2) {
                    this.errors = { ...this.errors, ["lastNameErr"]: true };
                } else {
                    this.errors = { ...this.errors, ["lastNameErr"]: false };
                }
                break;

            default:
                break;
        }
        // return this.errors
        const isValidInputs = !Object.values(this.errors).some(err => err === true);
        return isValidInputs;
    }

    handleInputChange = (e) => {
        const { target } = e;
        const { name, value } = target;

        console.log({ name, value });


        const isValidInputs = this.validateInputs(name, value);
        console.log(isValidInputs);

        if (isValidInputs) {
            this.setState(prevState => (
                { newMeeting: { ...prevState.newMeeting, [name]: value } }
            ))
        }
    }

    validateNewMeeting = (newMeeting) => {
        const isValidNewMeeting = !Object.values(newMeeting).some(value => value === "");
        return isValidNewMeeting;
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
        console.log(data);
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