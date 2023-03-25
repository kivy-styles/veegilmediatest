import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Error} from './components/Error.jsx'
import 'whatwg-fetch'



export function Register(){
    const[firstname, setFirstname]=useState('')
    const[lastname, setlastname]=useState('')
    const[email, setEmail]=useState('')
    const[tel, setTel]=useState('')
    const[password, setPassword]=useState('')
    const[authpwd, setAuthpwd]=useState('')
    const [fieldError, setFieldError]=useState({})
    const [error, setError]=useState({})
    const [disabled, setDisabled]=useState(true)
    const updatedvalue={firstname:'none', lastname:'none',email:'none', tel:'none',password:'none',authpwd:'none', string:''}
    const updatedvalueerr={firstname:'none', lastname:'none',email:'none', tel:'none',password:'none',authpwd:'none', string:''}
    useEffect(()=>{
        if(firstname && lastname && email && tel && password && authpwd && password===authpwd){
            setDisabled(false)
        }
        else {
            setDisabled(true)
        }
    },[firstname, lastname, email, tel, password, authpwd])

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
    return<div>
        <div className={`register-cont`}>
            <div>
                <fieldset className={'df-form'}>
                    <legend className={`caption-style`}>Registration form</legend>
                    <form>
                        <div className={'displayflex'}>
                            <label className={`label-style`}>
                                First Name
                            </label>
                            <div>
                                <input className={`input-style`} type={'text'} name={`firstname`} value={firstname} onInput={(event)=>{
                                setFirstname(event.target.value)
                                Validate()
                            }}/>
                                <Error fieldErrorText={fieldError.string} ErrorText={error.string}
                                       fieldErrorDisplay={fieldError.firstname} ErrorDisplay={error.firstname}/>
                            </div>
                        </div>
                        <div className={'displayflex'}>
                            <label className={`label-style`}>
                                Last Name
                            </label>
                            <div>
                                <input className={`input-style`} type={'text'} name={`lastname`} value={lastname} onInput={(event)=>{
                                    setlastname(event.target.value)
                                    Validate()
                                }}/>
                                <Error fieldErrorText={fieldError.string} ErrorText={error.string}
                                       fieldErrorDisplay={fieldError.lastname} ErrorDisplay={error.lastname}/>
                            </div>
                        </div>
                        <div className={'displayflex'}>
                            <label className={`label-style`}>
                                Email
                            </label>
                            <div>
                                <input className={`input-style`} type={'email'} name={`email`} value={email} onInput={(event)=>{
                                    setEmail(event.target.value)
                                    Validate()}}/>
                                <Error fieldErrorText={fieldError.string} fieldErrorDisplay={fieldError.email}/>
                            </div>
                        </div>
                        <div className={'displayflex'}>
                            <label className={`label-style`}>
                                Phone Number
                            </label>
                            <div>
                                <input className={`input-style`} type={'tel'} name={`tel`} value={tel} onInput={(event)=>{
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
                                <input className={`input-style`} type={'text'} name={`password`} value={password} onInput={(event)=>{
                                    setPassword(event.target.value)
                                    Validate()
                                }}/>
                                <Error fieldErrorText={fieldError.string} fieldErrorDisplay={fieldError.password}/>
                            </div>
                        </div>
                        <div className={'displayflex'}>
                            <label className={`label-style`}>
                                Confirm Password
                            </label>
                            <div>
                                <input className={`input-style`} type={'text'} name={`authpwd`} value={authpwd} onInput={(event)=>{
                                    setAuthpwd(event.target.value)
                                    Validate()
                                }}/>
                                <Error fieldErrorText={fieldError.string} ErrorText={error.string}
                                       fieldErrorDisplay={fieldError.authpwd} ErrorDisplay={error.authpwd}/>
                            </div>
                        </div>
                        <div className={'flex open-account sofia-font'}>
                                <button className={`special-menu-item`} style={{color:'initial', textDecoration:'none'}} disabled={disabled}>
                                    Create Account
                                </button>
                        </div>
                        <div className={'register-login'} style={{textAlign:'center'}}>Already have an account?&nbsp;
                            <Link to={'/login'}>Log in</Link>
                        </div>
                    </form>
                </fieldset>
            </div>
        </div>
    </div>
}