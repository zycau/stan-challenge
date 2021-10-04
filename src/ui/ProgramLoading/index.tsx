import React from 'react'
import classname from 'classnames/bind'
import style from './style.scss'
const cx = classname.bind(style)

export const ProgramLoading = () => {
    return (
        <div className={cx('wrapper')} data-testid='program-loading'>
            <div className={cx('left')} />
            <div className={cx('right')}>
                <div className={cx('top')} />
                <div className={cx('middle')} />
                <div className={cx('bottom')} />
            </div>
        </div>
    )
}
