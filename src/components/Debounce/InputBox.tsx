import React, {useState, useEffect} from 'react';
import styles from './Input.module.css';
import stringSimilarity, {BestMatch} from 'string-similarity';
import useDebouce from './useDebounce'


interface InputProps {
    value?: string   ,
    type?: React.InputHTMLAttributes<unknown>['type'],
    required?: boolean,
    name?: string,
    id?: string,
    color?: 'primary' | 'secondary',
    label?: string,
    data?: Array<string>,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputBox: React.FC <InputProps> = (props) => {

    const {
        value='',
        type='text',
        id='',
        color,
        label,
        onChange,
        data = []
    } = props

    let [results, setResults] = useState<BestMatch>()
    let [show, setShow] = useState<boolean>(false)
    const delay:number = 500
   
    const compute = () => {
        let res = stringSimilarity.findBestMatch( value, data )
        setResults(res)
        setShow(true)
    }

    useEffect(() => {
        let debounce: number
        setShow(false)
        debounce = window.setTimeout(()=>compute(),delay)
        return () => {
            clearTimeout(debounce)
        }
    }, [value])

    const style={
        color: color==='primary'?'#f44336':'#e91e63',
    }
    return (
        <div className={styles.container}>
            <div className={styles.group}>
                <input 
                    style={style}
                    value={value}
                    type={type}
                    id={id}
                    onChange={onChange}
                    />
                <label className={`${value?styles.active:null}`}>
                    { label}
                </label>
                <div style={{position:'absolute'}}>
                {value 
                    && show 
                    && results  
                    && results.ratings
                    .sort((a,b)=>a.rating>b.rating?-1:1)
                    .filter((a,i)=>a.rating!==0 && i<10)
                    .map((item,index)=>(
                        <div key={index}  className={styles.results}>{item.target}</div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default InputBox