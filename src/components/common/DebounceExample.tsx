import React, { useState, useEffect} from 'react'
import InputBox from './InputBox'
import data from './countries.json'

const DebounceExample: React.FC = () => {
    const [value, setValue] = useState<string>('')
    const delay: number = 2000

    useEffect(() => {
        let debounce: number
        debounce = window.setTimeout(()=>console.log(value),delay)
        return ()=>{
            clearTimeout(debounce)
        }
    }, [value])

    return (
        <div>
            <InputBox label='value' value={value} data={data} onChange={e=>setValue(e.target.value)}/>
        </div>
    )
}

export default DebounceExample
