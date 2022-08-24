import React from "react";

import CalendarList from "./CalendarList";
import CalendarForm from "./CalendarForm";

export class Calendar extends React.Component {

    state = {
        urlAPI: "http://localhost:3005/meetings",
        newMeetingName: "",
        meetings: null
    }

    onNewMeetingNameChange = (e) => {
        this.setState(() => (
            { newMeetingName: e.target.value }
        ))
    }

    addNewMeeting = (e) => {
        e.preventDefault();
        const { newMeetingName } = this.state;
        // console.log(newMeetingName);
        if (!newMeetingName) return

        const newMeeting = {
            firstName: newMeetingName
        }

        this.addData(newMeeting)
            .then(resp => newMeeting.id = resp.id)
            .then(() => {
                this.setState(prevState => {
                    return {
                        newMeetingName: "",
                        meetings: [...prevState.meetings, newMeeting]
                    }
                })
            })

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
        const { meetings, newMeetingName } = this.state
        return (
            <div>
                <h1>Calendar</h1>
                {<CalendarForm value={newMeetingName}
                    onNewMeetingNameChange={this.onNewMeetingNameChange}
                    onSubmit={this.addNewMeeting}
                />}
                {meetings && <CalendarList meetings={meetings} />}
            </div>
        )
    }
}

export default Calendar;