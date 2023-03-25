import React,{useEffect, useState} from 'react';
import {Modal} from 'react-bootstrap'
import 'whatwg-fetch'

export function Transactions(){
    const[firstdate, setFirstDate]=useState('')
    const[seconddate, setSecondDate]=useState('')
    const[minimum, setMinimum]=useState('')
    const[maximum, setMaximum]=useState('')
    const[merchant, setMerchant]=useState('')
    const[transactions, setTransactions]=useState([])
    const[balance, setBalance]=useState('')
    const [show, setShow]=useState(false)
    const [show2, setShow2]=useState(false)
    const [item, setItem]=useState({})
    useEffect(()=>{
        fetch('/api/transactions')
            .then(response=>response.json())
            .then(data=>setTransactions(data))
            .catch((error)=>{console.log(error)})
        fetch('/api/home')
            .then(response=>response.json())
            .then(data=>setBalance(data.balance))
            .catch((error)=>{console.log(error)})
    },[])
    function displaydata(){
       const transaction= transactions.map((item)=>{
           return(
            <div className={'list-group-item'} key={item.id} style={{display:'flex'}} onClick={()=>{
                setShow2(true)
                setItem(item)
            }}>
                <div style={{width:'30%'}}>{item.Date}</div>
                <div style={{width:'20%'}}>{item.Merchant}</div>
                <div style={{width:'20%'}}>{item.Total}</div>
                <div style={{width:'30%'}}>{item.Comment}</div>
            </div>)
       })
        return transaction
    }
    function loadData(string){
            //added at the last minute
            //should have been done in the backend but was in a rush
            fetch('/api/transactions').then(response=>response.json()).then(data=>{
                const filtereddate=data.filter((item)=>{
                    return item.Date===string
                })
                setTransactions(filtereddate)
            })
    }
    function handlemode(){
        return <Modal show={show} onHide={()=>setShow(false)} size={'lg'} centered>
            <Modal.Header closeButton>
                <Modal.Title>Welcome To Transaction History</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>This is a sample Bank App.</div><br/>
                <p>Try transferring and depositing money.</p><br/>
                <p>This demo is built using React.js and node.js.
                    You can find the source code and fork the project on GitLab.</p><br/>
            </Modal.Body>
            <Modal.Footer>
                <div><button className={'btn btn-primary'} onClick={(event)=>{event.preventDefault()
                    setShow(false)}}>Got it</button></div>
            </Modal.Footer>
        </Modal>
    }
    function handlemode2(obj){
        return <Modal key={obj.id} show={show2} onHide={()=>setShow2(false)} size={'lg'} centered>
            <Modal.Header closeButton>
                <Modal.Title>Show Transaction</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{display:'flex'}}>
                    <div style={{width:'50%'}}>
                        <div style={{marginTop:15}}>
                        <label className={'label label-default label-control'} htmlFor={'merchant'} style={{fontSize:14, fontWeight:'bold'}}>
                            Merchant
                        </label>
                        <div style={{textAlign:'center'}}>
                            <input style={{width:'95%',backgroundColor: '#DDE2E8'}} className={'form-control'} id={'merchant'}
                                   type={'text'} name={'merchant'} value={obj.Merchant}/>
                        </div>
                    </div>
                    <br/>
                    <div>
                        <div style={{marginTop:5}}>
                        <label className={'label label-default label-control'} htmlFor={'total2'} style={{fontSize:14, fontWeight:'bold'}}>
                            Total
                        </label>
                        <div style={{textAlign:'center'}}>
                            <input style={{width:'95%',backgroundColor: '#DDE2E8'}} className={'form-control'} id={'total2'}
                                   type={'text'} name={'total2'} value={obj.Total}/>
                        </div>
                    </div>
                    </div>
                        <br/>
                        <div>
                            <div style={{marginTop:5}}>
                                <label className={'label label-default label-control'} htmlFor={'date2'} style={{fontSize:14, fontWeight:'bold'}}>
                                    Date
                                </label>
                                <div style={{textAlign:'center'}}>
                                    <input style={{width:'95%',backgroundColor: '#DDE2E8'}} className={'form-control'} id={'date2'}
                                           type={'text'} name={'date2'} value={obj.Date}/>
                                </div>
                            </div>
                        </div>
                    <br/>
                        <div>
                            <div style={{marginTop:5}}>
                                <label className={'label label-default label-control'} htmlFor={'comment2'} style={{fontSize:14, fontWeight:'bold'}}>
                                    Comment
                                </label>
                                <div style={{textAlign:'center'}}>
                                    <input style={{width:'95%',backgroundColor: '#DDE2E8', height:80}} className={'form-control'} id={'comment2'}
                                           type={'text'} name={'comment2'} value={obj.Comment}/>
                                </div>
                            </div>
                        </div>
                        <br/>
                    </div>
                    <div style={{width:'50%'}}></div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div><button className={'btn btn-primary'} onClick={(event)=>{event.preventDefault()
                    setShow2(false)}}>Got it</button></div>
            </Modal.Footer>
        </Modal>
    }
    return(
        <div style={{height:'100%'}}>
            <div className={'fixed'}>+</div>
            <div className={'navigation-bar'}>
                <div className={'heading'}><h5><b style={{color:'#f5f9ff'}}>Transaction History</b></h5></div>
                <div className={'info'}><span style={{color:'black', cursor:'pointer'}} onClick={()=>setShow(true)}>INFO</span></div>
                <div className={'logout'}><span style={{color:'black'}}>LOGOUT</span></div>
            </div>
            <div className={'body'}>
                <div className={'second-aside box-shadow'}>
                    <div className={'aside-title'}>
                        <div className={'filter-expense'}>Filter Transactions</div>
                    </div>
                    <div style={{textAlign:'center'}}><hr style={{width:'87%', marginLeft:20, marginTop:20}}/></div>
                    <form className={'form-container'}>
                        <div>
                            <label className={'label label-default label-control'} htmlFor={'from'} style={{fontSize:14}}>
                                From
                            </label>
                            <div style={{textAlign:'center'}}>
                                <input style={{width:'95%',backgroundColor: '#DDE2E8'}} className={'form-control'} id={'from'}
                                       type={'date'} name={'date'} value={firstdate} onChange={(event)=>{
                                    setFirstDate(event.target.value)
                                    let stringeddate=`${event.target.value}`
                                           if(event.target.value!==''&&seconddate===''){
                                               loadData(stringeddate)
                                           }
                                       }
                                }/>
                            </div>
                        </div>
                        <div style={{marginTop:15}}>
                            <label className={'label label-default label-control'} htmlFor={'to'} style={{fontSize:14}}>
                                To
                            </label>
                            <div style={{textAlign:'center'}}>
                                <input style={{width:'95%',backgroundColor: '#DDE2E8'}} className={'form-control'} id={'to'}
                                       type={'date'} name={'date'} value={seconddate} onInput={(event)=>{
                                           setSecondDate(event.target.value)
                                           if(event.target.value!==''&&firstdate===''){
                                               let stringeddate=`${event.target.value}`
                                    loadData(stringeddate)
                                }
                                }}/>
                            </div>
                        </div>
                        <div style={{marginTop:15, display:'flex'}}>
                            <div style={{width:'44%'}}>
                                <label className={'label label-default label-control'} htmlFor={'min'} style={{fontSize:14}}>
                                Min
                                </label>
                                <div style={{textAlign:'center'}}>
                                    <input style={{width:'100%',backgroundColor: '#DDE2E8'}} className={'form-control'} id={'min'}
                                           type={'number'} name={'min'} value={minimum}/>
                                </div>
                            </div>
                            <div style={{marginTop:30, marginLeft:7, marginRight:7,textAlign:'center', width:'0 5px'}}><span>-</span></div>
                            <div style={{width:'44%'}}>
                                <label className={'label label-default label-control'} htmlFor={'max'} style={{fontSize:14}}>
                                    Max
                                </label>
                                <div style={{textAlign:'center'}}>
                                    <input style={{width:'100%',backgroundColor: '#DDE2E8'}} className={'form-control'} id={'max'}
                                           type={'number'} name={'max'} value={maximum}/>
                                </div>
                            </div>
                        </div>
                        <div style={{marginTop:15}}>
                            <label className={'label label-default label-control'} htmlFor={'merchant'} style={{fontSize:14}}>
                                Merchant
                            </label>
                            <div style={{textAlign:'center'}}>
                                <input style={{width:'95%',backgroundColor: '#DDE2E8'}} className={'form-control'} id={'merchant'}
                                       type={'text'} name={'merchant'} value={merchant}/>
                            </div>
                        </div>
                        <div style={{marginTop:15}}>
                            <label className={'label label-default label-control'} htmlFor={'status'} style={{fontSize:14}}>
                                Status
                            </label>
                            <div style={{display:'flex'}}>
                                <div style={{width:'50%', display:'flex'}}><input style={{backgroundColor: '#DDE2E8', height:20,
                                    marginTop:10, width:'30%'}} id={'status'}
                                            type={'checkbox'} name={'status'}/><label htmlFor={'status'}
                                                                                      style={{width:'70%',marginTop:10}}>New</label></div>
                                <div style={{width:'50%'}}><input style={{backgroundColor: '#DDE2E8', height:20,
                                    marginTop:10, width:'30%', paddingLeft:5}} id={'progress'}
                                            type={'checkbox'} name={'progress'}/><label htmlFor={'progress'}
                                                                                        style={{width:'70%', marginTop:10}}>In Progress</label></div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className={'centered'}>
                    <div style={{display:'flex', alignItems:'center', height:40, paddingTop:10, fontWeight:'bold',
                        position:'sticky', top:0, zIndex:99, backgroundColor:'white', height:60}}>
                        <div style={{width:'30%', paddingLeft:15, position:'sticky', top:0, zIndex:100}}>Date</div>
                        <div style={{width:'20%'}}>Merchant</div>
                        <div style={{width:'20%'}}> Total</div>
                        <div style={{width:'30%'}}>Comment</div>
                    </div>
                        <div className={'list-group'} style={{marginTop:0, paddingTop:0}}>
                        {displaydata()}
                        </div>
                </div>
                <div className={'second-aside'} style={{boxShadow:'0 2px 7px #69748E'}}>
                    <div className={'aside-title'}>
                        <div className={'filter-expense'}>Balance</div>
                    </div>
                    <div style={{textAlign:'center'}}><hr style={{width:'87%', marginLeft:20, marginTop:20}}/></div>
                    <div style={{textAlign:'center', marginTop:50}}><h2>${balance}</h2></div>
                </div>
            </div>
            {handlemode()}
            {handlemode2(item)}
        </div>
    )
}

