import React, {useContext, useEffect, useState, useCallback} from 'react'
import {stanContext} from '../../controller'
import {useHistory, useParams} from 'react-router-dom'
import classname from 'classnames/bind'
import style from './style.scss'
import { ProgramLoading } from '../ProgramLoading'
import { Error } from '../Error'
const cx = classname.bind(style)

export const Program = () => {
    const {data, loading, error, getCurrentProgram, changeError, changeCurrentNo} = useContext(stanContext)
    const history = useHistory()
    const [currentProgram, setCurrentProgram] = useState({
        image: '', 
        title: '', 
        rating: '', 
        year: 2000, 
        genre: '', 
        language: '', 
        description: ''
    })
    const {id} = useParams<{id: string}>()
    
    useEffect(() => {
        changeError(false)
        if(data.length){
            if(getCurrentProgram(id)){
                setCurrentProgram(getCurrentProgram(id))
                changeCurrentNo(getCurrentProgram(id).order)
            }else{
                changeError(true)
            }
        }
    }, [data])

    const {image, title, rating, year, genre, language, description} = currentProgram

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        e.preventDefault()
        if(e.key === 'Backspace'){
            history.push(`/`)
        }
    }, [history])

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    return (
        <>
        {
            loading?
                <ProgramLoading />:
                error?
                    <Error />:
                    <div className={cx('wrapper')} data-testid='program'>
                        <div className={cx('left')}>
                            <img src={image} alt={title}/>
                        </div>
                        <div className={cx('right')}>
                            <h1>{title}</h1>
                            <p className={cx('subtitle')}>{`${rating} | ${year} | ${genre} | ${language}`}</p>
                            <p className={cx('description')}>{description}</p>
                        </div>
                    </div>
        }
        </>      
    )
}