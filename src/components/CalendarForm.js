import React from "react";

export class CalendarForm extends React.Component {

    render() {
        const { firstName, firstNameStyle, lastName, lastNameStyle, email, emailStyle, date, dateStyle, time, timeStyle, handleInputChange, onSubmit } = this.props;
        return (
            <form onSubmit={onSubmit}>
                <label>
                    Imię:
                    <input name="firstName" type="text"
                        value={firstName}
                        onChange={handleInputChange}
                        style={firstNameStyle}
                    />
                </label>
                <label htmlFor="lastName">
                    Nazwisko:
                    <input name="lastName" type="text"
                        value={lastName}
                        onChange={handleInputChange}
                        style={lastNameStyle}
                    />
                </label>
                <label htmlFor="email">Email:
                    <input name="email" type="email"
                        value={email}
                        onChange={handleInputChange}
                        style={emailStyle}
                    />
                </label>
                <label htmlFor="date">Data:
                    <input name="date" type="date"
                        value={date}
                        onChange={handleInputChange}
                        style={dateStyle}
                    />
                </label>
                <label htmlFor="time">Czas:
                    <input name="time" type="time"
                        value={time}
                        onChange={handleInputChange}
                        style={timeStyle}
                    />
                </label>
                <input type="submit" />
            </form>
        )

    }
}

export default CalendarForm;