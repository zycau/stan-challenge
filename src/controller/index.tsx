import React, {createContext, useState, useCallback, useEffect} from 'react'
import {getJson} from '../services'
import {StateType, DataType} from '../type'

export const stanContext = createContext({
    data: [] as StateType[],
    startNo: 0,
    currentNo: 0,
    loading: false,
    error: false,
    changeCurrentNo: (num: number) => {},
    changeStartNo: (num: number) => {},
    getCurrentProgram: (id?: string) => {return {} as StateType},
    changeError: (err: boolean) => {},
    getAllData: () => Promise.resolve(),
})

export const StanContextProvider = ({children}: {children: JSX.Element}) => {
    const [data, setData] = useState<StateType[]>([])
    const [startNo, setStartNo] = useState<number>(0)
    const [currentNo, setCurrentNo] = useState<number>(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        !data.length && getAllData()
    }, [])

    const getAllData = useCallback(async () => {
        setError(false)
        setLoading(true)
        const res = await getJson()
        
        if(!res) {
            setError(true)
            setLoading(false)
            return
        }

        const dataWithOrder = res.map((val: DataType, index: number) => ({
            ...val,
            order: index
        }))
        setData(dataWithOrder)
        setLoading(false)       
    }, [setError, setLoading, getJson, setData])
    
    const changeCurrentNo = useCallback((num: number) => {
        setCurrentNo(num)
    }, [setCurrentNo])

    const changeStartNo = useCallback((num: number) => {
        setStartNo(num)
    }, [setStartNo])

    const getCurrentProgram = useCallback((id?: string) => {
        return id? 
            data.find((val) => val.id.toString() === id)!:
            data.find((val) => val.order === currentNo)!       
    }, [data, currentNo])

    const changeError = useCallback((err: boolean) => {
        setError(err)
    }, [setError])

    return (
        <stanContext.Provider value={{data, startNo, currentNo, loading, error, changeCurrentNo, changeStartNo, getCurrentProgram, changeError, getAllData}}>
            {children}
        </stanContext.Provider>
    )
}





