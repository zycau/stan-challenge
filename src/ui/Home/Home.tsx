import React, {useContext, useEffect} from 'react'
import {stanContext} from '../../controller'
import classname from 'classnames/bind'
import style from './style.scss'
import { Carousel } from '../Carousel'
import { HomeLoading } from '../HomeLoading/HomeLoading'
import { Error } from '../Error'
const cx = classname.bind(style)

export const Home = () => {
    const {loading, error, changeError} = useContext(stanContext)

    useEffect(() => {
        changeError(false)
    }, [])

    return (
        <div className={cx('wrapper')} data-testid='home'>
            {
                loading?
                    <HomeLoading />:
                    error?
                        <Error /> :
                        <Carousel itemNum={6} render={
                            val => (
                                <>
                                <img src={val.image} alt={val.title} className={cx('image')} data-testid={`img${val.order}`}/>
                                </>
                            )
                        } />
            }
        </div>
    )

}