export const getJson = async () => {
    try{
        const res = await fetch(`https://mocki.io/v1/dfcf452e-d471-452d-99d4-fa90ae1a0acc`)
        const data = await res.json()
        await sleep()
        return data
    }catch(err){
        return false
    }
}

const sleep = async (ms: number = 1000) => {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

