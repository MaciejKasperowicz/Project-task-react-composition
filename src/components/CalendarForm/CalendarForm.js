import React from "react";

// import './CalendarForm.css';

import classes from './styles.module.css'

export class CalendarForm extends React.Component {

    render() {
        const { firstName, firstNameStyle, lastName, lastNameStyle, email, emailStyle, date, dateStyle, time, timeStyle, handleInputChange, onSubmit } = this.props;
        return (
            <section className={classes.calendar}>
                <h3 className={classes.calendarForm__title}>Wprowadź nowe spotkanie:</h3>
                <form className={classes.calendar__form} onSubmit={onSubmit}>
                    <div className={classes.form__field}>
                        <label className={classes.field__label}>Imię:</label>
                        <input name="firstName" type="text"
                            className={classes.field__input}
                            value={firstName}
                            onChange={handleInputChange}
                            style={firstNameStyle}
                        />
                    </div>
                    <div className={classes.form__field}>
                        <label className={classes.field__label}>Nazwisko:</label>
                        <input name="lastName" type="text"
                            className={classes.field__input}
                            value={lastName}
                            onChange={handleInputChange}
                            style={lastNameStyle}
                        />
                    </div>
                    <div className={classes.form__field}>
                        <label className={classes.field__label}>Email:</label>
                        <input name="email" type="email"
                            className={classes.field__input}
                            value={email}
                            onChange={handleInputChange}
                            style={emailStyle}
                        />
                    </div>
                    <div className={classes.form__field}>
                        <label className={classes.field__label}>Data:</label>
                        <input name="date" type="date"
                            className={classes.field__input}
                            value={date}
                            onChange={handleInputChange}
                            style={dateStyle}
                        />
                    </div>
                    <div className={classes.form__field}>
                        <label className={classes.field__label}>Czas:</label>
                        <input name="time" type="time"
                            className={classes.field__input}
                            value={time}
                            onChange={handleInputChange}
                            style={timeStyle}
                        />
                    </div>
                    <div className={classes.form__field}>
                        <input type="submit" className={classes.form__submit} />
                    </div>
                </form>
            </section>

        )

    }
}

export default CalendarForm;