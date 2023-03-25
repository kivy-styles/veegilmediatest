import React, {useState, useEffect} from "react";
import {NavLink, useNavigate} from "react-router-dom"
import Typewriter from 'typewriter-effect'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPaperPlane, faMoneyBillWave, faHistory} from '@fortawesome/free-solid-svg-icons'

export function Home(){
    const[balance, setBalance]=useState('')
    const navigate=useNavigate()
    useEffect(()=>{
        fetch('/home', {
            method:'GET',
            headers:{
                'auth':JSON.parse(localStorage.getItem('user')).token
            }
        })
    },[])
    useEffect(()=>{
        fetch('/api/home', {
            method:'GET',
        })
            .then((response)=>(response.json()))
            .then((data)=>{
                setBalance(data.balance)
                console.log(data)
            })
            .catch((error)=>{console.log(error)})
    },[])
    return<div style={{height:'100%'}}>
       <div className={`home`} style={{height:'100%'}}>
           <div className={`aside box-shadow`}>
               <div className={`typewriter`}>
                   <Typewriter options={{
                       strings:[
                           'Connecting you to your loved ones....',
                           'Enjoy Free and Safe Transactions....',
                           'Transfer and receive money in different currencies'
                       ],
                       autoStart:true,
                       loop:true
                   }}/>
               </div>
           </div>
           <div className={`home-body`}>
               <div>
                   <ul className={`menu`}>
                       <li className={`logo cursor shift`} onClick={()=>{navigate('/home')}}>test.app</li>
                       <li className={`menu-item`}><NavLink style={{color:'initial', textDecoration:'none'}} to={'login'}>Log-out</NavLink></li>
                   </ul>
                   <hr/>
               </div>
               <div className={`account-balance`}>
                   <div className={`amount`}>BALANCE : ${balance}</div>
                   <div className={``}>
                       <div className={`home transaction-menu`}>
                           <div className={`transaction-menu-item cursor`} onClick={()=>{
                               navigate('/transfer')
                           }}>
                               <FontAwesomeIcon icon={faPaperPlane}/>
                               <div className={`transaction-names cursor`} onClick={()=>{
                                   navigate('/transfer')
                               }}>Transfer</div>
                           </div>
                           <div className={`transaction-menu-item cursor`} onClick={()=>{
                               navigate('/deposit')
                           }}>
                               <FontAwesomeIcon icon={faMoneyBillWave}/>
                               <div className={`transaction-names cursor`} onClick={()=>{
                                   navigate('/deposit')
                               }}>Deposit</div>
                           </div>
                           <div className={`transaction-menu-item history cursor`} onClick={()=>{
                               navigate('/transactions')
                           }}>
                               <FontAwesomeIcon icon={faHistory}/>
                               <div className={`transaction-names cursor`} onClick={()=>{
                                   navigate('/transactions')
                               }}>Transaction History</div>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       </div>
    </div>
}