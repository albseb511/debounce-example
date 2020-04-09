import React, { useState, useEffect} from 'react'
import InputBox from './InputBox'
import data from './countries.json'

const DebounceExample: React.FC = () => {
    const [value, setValue] = useState<string>('')

    return (
        <div>
            <h4>Finds degree of similarity between two strings, based on Dice's Coefficient</h4>
            <h1>Search for countries by from the input field</h1>
            <h4>There is a delay effect added to show results</h4>
            <InputBox label='country name' value={value} data={data} onChange={e=>setValue(e.target.value)}/>
        </div>
    )
}

export default DebounceExample
