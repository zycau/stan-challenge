import React, {useEffect, useContext, useState} from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {Program} from '../Program'
import classname from 'classnames/bind'
import style from './style.scss'
import {StanContextProvider} from '../../controller'

import { Nav } from '../Nav'
import { Home } from '../Home/Home'
const cx = classname.bind(style)

export const App = () => {
    return (
        <StanContextProvider>
            <Router>
                <div className={cx('wrapper')}>
                    <Nav />                
                    <Switch>
                        <Route path='/' exact>
                            <Home />
                        </Route>
                        <Route path='/program/:id'>
                            <Program />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </StanContextProvider>
    )
}