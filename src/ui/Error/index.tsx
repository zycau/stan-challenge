import React from 'react'
import classname from 'classnames/bind'
import style from './style.scss'
const cx = classname.bind(style)

export const Error = () => {
    return (
        <div className={cx('wrapper')} data-testid='error'>
            <p>An unknown error occurred. Please try again later</p>
        </div>
    )
}