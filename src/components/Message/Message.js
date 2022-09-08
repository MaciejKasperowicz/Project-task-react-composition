import React from 'react'

import classes from './styles.module.css'

export const Message = (props) => {
    const {
        children,
        ...otherProps
    } = props

    return (
        <div
            className={classes.message}
            {...otherProps}
        >
            {children}
        </div>
    )
}


export default Message