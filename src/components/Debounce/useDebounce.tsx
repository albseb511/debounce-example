import {useState, useCallback, useRef}  from 'react';
import stringSimilarity from 'string-similarity'

const defDelay = 500


const useDebouce = (func: (...val:any)=>void,delay: number = defDelay) => {
    let debounce: number = 0
    let [output, setOutput] = useState<any>()
    const debouncer = useCallback(
        (val:string) => {
            debounce && clearTimeout(debounce)
            debounce = window.setTimeout(()=>{
                let res = func(val)
                setOutput(res)
            },delay)
        },
        [debounce,delay],
    )
    return [output,debouncer]
} 


export default useDebouce