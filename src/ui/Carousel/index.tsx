import React, {useEffect, useContext, useCallback} from 'react'
import {stanContext} from '../../controller'
import {Link, useHistory} from 'react-router-dom'
import {StateType} from '../../type'
import classname from 'classnames/bind'
import style from './style.scss'
const cx = classname.bind(style)

export const Carousel = ({itemNum, render}: Props) => {
    const {data, startNo, currentNo, changeCurrentNo, changeStartNo, getCurrentProgram} = useContext(stanContext)
    const history = useHistory()

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        e.preventDefault()
        if(e.key === 'ArrowLeft' && currentNo > 0){
            changeCurrentNo(currentNo-1)
        }
        if(e.key === 'ArrowRight' && currentNo < data.length-1){
            changeCurrentNo(currentNo+1)
        }
        if(e.key === 'Enter'){
            history.push(`/program/${getCurrentProgram().id}`)
        }
    }, [data, currentNo, changeCurrentNo, getCurrentProgram, history])

    useEffect(() => {
        if(currentNo >= startNo + itemNum-1){
            changeStartNo(currentNo+2-itemNum)
        }else if(currentNo < startNo){
            changeStartNo(currentNo)
        }
    }, [currentNo])    

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [data, currentNo])
    
   
    return (
        <div className={cx('wrapper')} data-testid='carousel'>
            <ul>
                {
                    data.filter((_, index) => index >= startNo && index < startNo + itemNum).map((val, index) => (
                        <li key={index} className={cx(val.order === currentNo && 'current')} data-testid={`item${val.order}`}>
                            <Link to={`/program/${val.id}`}>
                                {render(val)}
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>        
    )
}

interface Props{
    itemNum: number, 
    render: (val: StateType) => JSX.Element
}