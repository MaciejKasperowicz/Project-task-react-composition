import React from "react";

export class CalendarForm extends React.Component {

    // state = {
    //     newMeetingName: null
    // }






    render() {
        const { firstNameValue, lastNameValue, emailValue, dateValue, timeValue, handleInputChange, onSubmit } = this.props;
        // console.log(this.props);
        return (
            <form onSubmit={onSubmit}>
                <label>
                    Imię:
                    <input name="firstName" type="text"
                        value={firstNameValue}
                        // onChange={onNewMeetingNameChange}
                        onChange={handleInputChange}
                    />
                </label>
                <label htmlFor="lastName">
                    Nazwisko:
                    <input name="lastName" type="text"
                        value={lastNameValue}
                        onChange={handleInputChange}
                    />
                </label>
                <label htmlFor="email">Email:
                    <input name="email" type="email"
                        value={emailValue}
                        onChange={handleInputChange}
                    />
                </label>
                <label htmlFor="date">Data:
                    <input name="date" type="date"
                        value={dateValue}
                        onChange={handleInputChange}
                    />
                </label>
                <label htmlFor="time">Czas:
                    <input name="time" type="time"
                        value={timeValue}
                        onChange={handleInputChange}
                    />
                </label>
                <input type="submit" />
            </form>
        )

    }
}

export default CalendarForm;