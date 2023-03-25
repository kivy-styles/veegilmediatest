import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import {Carousel} from 'react-bootstrap'

export function Root(){
    const[bgcolor, setBgcolor]=useState('')
    const[bgcolor2, setBgcolor2]=useState('')
    return<div>
        <div className={`banner`}>
            EASIEST WAY TO SEND AND RECEIVE MONEY ACROSS NIGERIA
            <div className={`banner-bottom`}>
                Register now and perform easy transactions across all 36 states from the comfort of your home or office.
            </div>
            <div className={`flex`}>
                <div className={`special-menu-item background sofia-font ${bgcolor}`} onMouseOver={()=>{
                    setBgcolor('color')}} onMouseOut={()=>{
                    setBgcolor('')}}><Link style={{color:'initial', textDecoration:'none'}} to={'register'}>Open an account</Link></div>
                <div className={`special-menu-item background sofia-font ${bgcolor2}`} onMouseOver={()=>{
                    setBgcolor2('color')}} onMouseOut={()=>{
                    setBgcolor2('')}}><Link style={{color:'initial', textDecoration:'none'}} to={'login'}>Send money now</Link></div>
            </div>
            <img className={`image-map`} src={`../images/Nigeria-Map.jpg`} alt={'nigeriamap'}/>
        </div>
        <div className={`flexdisplay`}>
            <div className={`text`}>
                <div className={`text-header`}>
                    Save your money and enjoy stress free transactions
                </div>
                <div className={`banner-bottom`}>
                    Looking for a platform where you can transfer and <br/>
                    receive money at ease? Well, look no further, we've <br/>
                    got you
                </div>
                <div className={'flex'}>
                    <div className={`special-menu-item sofia-font`}>
                        <Link style={{color:'initial', textDecoration:'none'}} to={'/login'}>
                            Open an account
                        </Link>
                    </div>
                </div>
            </div>
            <div className={`promotion-images`}>
                <Carousel fade>
                    <Carousel.Item>
                        <img className={`promotion-image`} src={'../images/promotion2.webp'}/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className={`promotion-image`} src={'../images/promotion3.png'}/>
                    </Carousel.Item>
                </Carousel>
                <img className={`sec-promo-image`} src={'../images/promotion.jpg'}/>
            </div>
        </div>
    </div>
}