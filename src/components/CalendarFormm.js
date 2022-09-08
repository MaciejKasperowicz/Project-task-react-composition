import React from "react";

import './CalendarForm.css';

export class CalendarForm extends React.Component {

    render() {
        const { firstName, firstNameStyle, lastName, lastNameStyle, email, emailStyle, date, dateStyle, time, timeStyle, handleInputChange, onSubmit } = this.props;
        return (
            <section className="calendar">
                <h3 className="calendarForm__title">Wprowadź nowe spotkanie:</h3>
                <form className="calendar__form" onSubmit={onSubmit}>
                    <div className="form__field form__field--firstName">
                        <label className="field__label">Imię:</label>
                        <input name="firstName" type="text"
                            className="field__input"
                            value={firstName}
                            onChange={handleInputChange}
                            style={firstNameStyle}
                        />
                    </div>
                    <div className="form__field form__field--lastName">
                        <label className="field__label">Nazwisko:</label>
                        <input name="lastName" type="text"
                            className="field__input"
                            value={lastName}
                            onChange={handleInputChange}
                            style={lastNameStyle}
                        />
                    </div>
                    <div className="form__field form__field--email">
                        <label className="field__label">Email:</label>
                        <input name="email" type="email"
                            className="field__input"
                            value={email}
                            onChange={handleInputChange}
                            style={emailStyle}
                        />
                    </div>
                    <div className="form__field form__field--date">
                        <label className="field__label">Data:</label>
                        <input name="date" type="date"
                            className="field__input"
                            value={date}
                            onChange={handleInputChange}
                            style={dateStyle}
                        />
                    </div>
                    <div className="form__field form__field--time">
                        <label className="field__label">Czas:</label>
                        <input name="time" type="time"
                            className="field__input"
                            value={time}
                            onChange={handleInputChange}
                            style={timeStyle}
                        />
                    </div>
                    <div className="form__field form__field--submit">
                        <input type="submit" className="form__submit" />
                    </div>
                </form>
            </section>

        )

    }
}

export default CalendarForm;