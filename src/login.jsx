import React, {useEffect, useState, useRef} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Error} from './components/Error.jsx'

export function Login(){
    const[tel, setTel]=useState('')
    const[password, setPassword]=useState('')
    const [fieldError, setFieldError]=useState({})
    const [error, setError]=useState({})
    const [disabled, setDisabled]=useState(true)
    const updatedvalue={tel:'none',password:'none', string:''}
    const updatedvalueerr={tel:'none',password:'none', string:''}
    const navigate=useNavigate()
    const ref=useRef()
    useEffect(()=>{
        if(tel && password){
            setDisabled(false)
        }
        else {
            setDisabled(true)
        }
    },[tel, password])

    function Validate(){
        let name= event.target.name
        let value= event.target.value
        switch(name){
            case 'firstname':
                if(value){
                    setFieldError({...fieldError, ...updatedvalue, firstname:'none', string:'' })
                    if(/[0-9]/.test(value)){
                        setError({...error, ...updatedvalueerr, firstname:'',string:'field cannot contain numbers'})
                        setFirstname('')
                    }
                    else{
                        setError({...error, ...updatedvalueerr, firstname:'none',string:''})
                    }
                }
                else{
                    setFieldError({...fieldError, ...updatedvalue, firstname:'', string:'Field cannot be empty' })
                }
                break
            case 'lastname':
                if(value){
                    setFieldError({...fieldError, ...updatedvalue, lastname:'none', string:'' })
                    if(/[0-9]/.test(value)){
                        setError({...error, ...updatedvalueerr, lastname:'',string:'field cannot contain numbers'})
                        setlastname('')
                    }
                    else{
                        setError({...error, ...updatedvalueerr, lastname:'none',string:''})
                    }
                }
                else{
                    setFieldError({...fieldError, ...updatedvalue, lastname:'', string:'Field cannot be empty' })
                }
                break
            case 'tel':
                if(value){
                    setFieldError({...fieldError, ...updatedvalue, tel:'none', string:'' })
                    if(/[a-zA-Z]/.test(value)){
                        setError({...error, ...updatedvalueerr, tel:'',string:'field cannot contain letters'})
                        setTel('')
                    }
                    else{
                        setError({...error, ...updatedvalueerr, tel:'none',string:''})
                    }
                }
                else{
                    setFieldError({...fieldError, ...updatedvalue, tel:'', string:'Field cannot be empty' })
                }
                break
            case 'password':
                if(value){
                    setFieldError({...fieldError, ...updatedvalue, password:'none', string:'' })
                }
                else{
                    setFieldError({...fieldError, ...updatedvalue, password:'', string:'Field cannot be empty' })
                }
                break
            case 'authpwd':
                if(value){
                    setFieldError({...fieldError, ...updatedvalue, authpwd:'none', string:'' })
                    if(value!==password){
                        setError({...error, ...updatedvalueerr, authpwd:'',string:'Password Confirmation failed'})
                    }
                    else{
                        setError({...error, ...updatedvalueerr, authpwd:'none',string:''})
                    }
                }
                else{
                    setFieldError({...fieldError, ...updatedvalue, authpwd:'', string:'Field cannot be empty' })
                }
                break
            case 'email':
                if(value){
                    setFieldError({...fieldError, ...updatedvalue, email:'none', string:'' })
                }
                else{
                    setFieldError({...fieldError, ...updatedvalue, email:'', string:'Field cannot be empty' })
                }
                break
        }

    }


    return<div style={{height:'100%'}}>
        <div className={`register-cont`}>
            <fieldset className={'df-form'}>
                <legend className={`caption-style`}>Log In</legend>
                <form formAction={'/login'} formMethod={'POST'}>
                    <div className={'displayflex'}>
                        <label className={`label-style`}>
                            Phone Number
                        </label>
                        <div>
                            <input className={`input-style`} name={`tel`} value={tel} onInput={(event)=>{
                                setTel(event.target.value)
                                Validate()
                            }}/>
                            <Error fieldErrorText={fieldError.string} ErrorText={error.string}
                                   fieldErrorDisplay={fieldError.tel} ErrorDisplay={error.tel}/>
                        </div>
                    </div>
                    <div className={'displayflex'}>
                        <label className={`label-style`}>
                            Password
                        </label>
                        <div>
                            <input className={`input-style`} name={`password`} value={password} onInput={(event)=>{
                                setPassword(event.target.value)
                                Validate()
                            }}/>
                            <Error fieldErrorText={fieldError.string} fieldErrorDisplay={fieldError.password}/>
                        </div>
                    </div>
                    <div className={'flex open-account sofia-font'}>
                        <input type={'submit'} className={`special-menu-item`} value={'Log In'}
                               onClick={(event)=>{
                            event.preventDefault()
                            let user={tel, password}
                            fetch('http://localhost:3000/login', {
                                method:'POST',
                                headers:{'Content-Type':'application/json'},
                                body:JSON.stringify(user)
                            })
                                .then(response=>(response.json()))
                                .then(data=>{
                                    if(data.token)
                                {
                                    localStorage.setItem('user',JSON.stringify(data))
                                    console.log(data)
                                    navigate('/home')
                                }
                                    else {
                                        navigate('/login')
                                        alert(data.errormsg)
                                    }
                                })
                                .catch(error=>{console.log(`error sending data to server, ERROR MESSAGE ${error}`)})
                        }} disabled={disabled}/>
                    </div>
                    <div className={'register-login'} style={{textAlign:'center'}}>Don't have an account?&nbsp;
                        <Link to={'/register'}>Register here</Link>
                    </div>
                </form>
            </fieldset>
        </div>
    </div>
}