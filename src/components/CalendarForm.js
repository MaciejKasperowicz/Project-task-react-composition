import React from "react";

export class CalendarForm extends React.Component {

    // state = {
    //     newMeetingName: null
    // }






    render() {
        const { value, onNewMeetingNameChange, onSubmit } = this.props;
        // console.log(this.props);
        return (
            <form onSubmit={onSubmit}>
                <label>
                    Imię:
                    <input name="firstName" type="text"
                        value={value}
                        onChange={onNewMeetingNameChange} />
                </label>
                {/* <label htmlFor="lastName">
                    Nazwisko:
                    <input name="lastName" type="text" />
                </label>
                <label htmlFor="email">Email:
                    <input name="email" type="email" />
                </label>
                <label htmlFor="date">Data:
                    <input name="date" type="text" />
                </label>
                <label htmlFor="time">Czas:
                    <input name="time" type="text" />
                </label> */}
                <input type="submit" />
            </form>
        )

    }
}

export default CalendarForm;