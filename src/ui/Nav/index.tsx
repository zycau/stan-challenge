import React, {memo} from 'react'
import logo from '../assets/logo.svg'
import {Link} from 'react-router-dom'
import classname from 'classnames/bind'
import style from './style.scss'
const cx = classname.bind(style)

export const Nav = memo(() => {

    const navItems = ['Home', 'TV Shows', 'Movies']

    return (
        <div className={cx('wrapper')} data-testid='nav'>
            <Link to='/'>
                <img src={logo} alt='Stan logo' className={cx('logo')} />
            </Link>
            <ul className={cx('nav')}>
                {
                    navItems.map((val, index)=>(
                        <li className={cx('item', index===0 && 'home')} key={index}>
                            {val}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
})