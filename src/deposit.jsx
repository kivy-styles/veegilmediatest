import React, {useState, useEffect} from 'react'
import {Link, NavLink, useNavigate} from 'react-router-dom'
import {Error} from './components/Error.jsx'
import 'whatwg-fetch'

export function Deposit(){
    const[total, setTotal]=useState('')
    const[comment, setComment]=useState('')
    const[ttype, setTtype]=useState('')
    const [fieldError, setFieldError]=useState({})
    const [error, setError]=useState({})
    const [disabled, setDisabled]=useState(true)
    const updatedvalue={total:'none',comment:'none', ttype:'none',string:''}
    const updatedvalueerr={total:'none', comment:'none', ttype:'none',string:''}
    const navigate = useNavigate()
    useEffect(()=>{
        if(total && comment){
            console.log(disabled)
            setDisabled(false)
            console.log(disabled)
        }
        else {
            setDisabled(true)
        }
    },[total, comment])

    function Validate(){
        let name= event.target.name
        let value= event.target.value
        switch(name){
            case 'comment':
                if(value){
                    setFieldError({...fieldError, ...updatedvalue, comment:'none', string:'' })
                    if(/[0-9]/.test(value)){
                        setError({...error, ...updatedvalueerr, comment:'',string:'field cannot contain numbers'})
                        setComment('')
                    }
                    else{
                        setError({...error, ...updatedvalueerr, comment:'none',string:''})
                    }
                }
                else{
                    setFieldError({...fieldError, ...updatedvalue, comment:'', string:'Field cannot be empty' })
                }
                break
            case 'total':
                if(value){
                    setFieldError({...fieldError, ...updatedvalue, total:'none', string:'' })
                    if(/[a-zA-Z]/.test(value)){
                        setError({...error, ...updatedvalueerr, total:'',string:'field cannot contain letters'})
                        setTotal('')
                    }
                    else{
                        setError({...error, ...updatedvalueerr, total:'none',string:''})
                    }
                }
                else{
                    setFieldError({...fieldError, ...updatedvalue, total:'', string:'Field cannot be empty' })
                }
                break
        }

    }
    return<div>
        <div>
            <ul className={`menu`}>
                <li className={`logo cursor shift`} onClick={()=>{navigate('/home')}}>test.app</li>
                <li className={`menu-item`}><NavLink style={{color:'initial', textDecoration:'none'}} to={'login'}>Log-out</NavLink></li>
            </ul>
            <hr/>
        </div>
        <div className={`register-cont`}>
            <div>
                <fieldset className={'df-form'}>
                    <legend className={`caption-style`}>Deposit form</legend>
                    <form formAction={'/deposit'} formMethod={'POST'}>
                        <div className={'displayflex'}>
                            <label className={`label-style`}>
                                Comment:
                            </label>
                            <div>
                                <textarea className={`input-style`} rows={5} cols={22} name={`comment`} value={comment} onInput={(event)=>{
                                    setComment(event.target.value)
                                    Validate()
                                }}/>
                                <Error fieldErrorText={fieldError.string} ErrorText={error.string}
                                       fieldErrorDisplay={fieldError.comment} ErrorDisplay={error.comment}/>
                            </div>
                        </div>
                        <div className={'displayflex'}>
                            <label className={`label-style`}>
                                Total:
                            </label>
                            <div>
                                <input className={`input-style`} type={'total'} name={`total`} value={total} onInput={(event)=>{
                                    setTotal(event.target.value)
                                    Validate()
                                }}/>
                                <Error fieldErrorText={fieldError.string} ErrorText={error.string}
                                       fieldErrorDisplay={fieldError.total} ErrorDisplay={error.total}/>
                            </div>
                        </div>
                        <div className={'flex open-account sofia-font'}>
                            <button type={`submit`} className={`special-menu-item`} style={{color:'initial', textDecoration:'none'}} onClick={(event)=>{
                                event.preventDefault()
                                let newdebittransaction={Date:'2023-03-24', Total:`$${total}`, Comment:comment, ttype:'credit'}
                                fetch('/deposit', {
                                    method:'POST',
                                    headers:{'Content-Type':'application/json'},
                                    body:JSON.stringify(newdebittransaction)
                                })
                                    .then(response=>(response.json()))
                                    .then(data=>{
                                        if(data)
                                        {
                                            console.log(data)
                                            navigate('/home')
                                            alert('Transaction Successful')
                                        }
                                        else {
                                            navigate('/deposit')
                                            alert('Transaction Failed')
                                        }
                                    })
                                    .catch(error=>{console.log(`error sending data to server, ERROR MESSAGE ${error}`)})
                            }} disabled={disabled} >
                                Save
                            </button>
                        </div>
                    </form>
                </fieldset>
            </div>
        </div>
    </div>
}