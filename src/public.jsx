import React from 'react'
import {Link, Outlet, NavLink, useNavigate} from 'react-router-dom'

export function PublicPage(){
    const navigate=useNavigate()
    return <div>
        <div className={`top-banner`}>Keep your money safe with us</div>
            <div>
                <ul className={`menu`}>
                    <li className={`logo cursor`} onClick={()=>{navigate('/')}}>test.app</li>
                    <li className={`special-menu-item shift`}><div style={{color:'initial', textDecoration:'none'}}>Personal</div></li>
                    <li className={`menu-item`}><div style={{color:'initial', textDecoration:'none'}}>Pricing</div></li>
                    <li className={`menu-item`}><div style={{color:'initial', textDecoration:'none'}}>Help</div></li>
                    <li className={`menu-item`}><div style={{color:'initial', textDecoration:'none'}}>EN</div></li>
                    <li className={`menu-item`}><NavLink style={{color:'initial', textDecoration:'none'}} to={'register'}>Register</NavLink></li>
                    <li className={`menu-item`}><NavLink style={{color:'initial', textDecoration:'none'}} to={'login'}>Log-in</NavLink></li>
                </ul>
            </div>
        <hr/>
        <Outlet/>
    </div>
}