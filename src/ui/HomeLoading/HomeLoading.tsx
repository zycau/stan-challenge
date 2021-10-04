import React from 'react'
import classname from 'classnames/bind'
import style from './style.scss'
const cx = classname.bind(style)

export const HomeLoading = () => {
    return (
        <div className={cx('wrapper')} data-testid='home-loading'>
            {
                [...Array(6).keys()].map((_, index) => (
                    <div key={index} className={cx('load')} />
                ))
            }
        </div>
    )
}