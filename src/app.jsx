import React from 'react'
import ReactDom from 'react-dom'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {PublicPage} from './public.jsx'
import {Root} from './root.jsx'
import {Register} from './register.jsx'
import {Login} from './login.jsx'
import {Home} from './home.jsx'
import {Transactions} from './transactions.jsx'
import {Transfer} from './transfer.jsx'
import {Deposit} from './deposit.jsx'

let contentNode= document.getElementById('container')

function RoutedApp(){
    return(
            <Router>
                <Routes>
                    <Route path={'/'} element={<PublicPage/>}>
                        <Route index element={<Root/>}/>
                        <Route path='register' element={<Register/>}/>
                        <Route path='login' element={<Login/>}/>
                    </Route>
                    <Route path={'/home'} element={<Home/>}/>
                    <Route path={'/transactions'} element={<Transactions/>}/>
                    <Route path={'/transfer'} element={<Transfer/>}/>
                    <Route path={'/deposit'} element={<Deposit/>}/>
                </Routes>
            </Router>
    )
}

ReactDom.render(<RoutedApp/>, contentNode)
