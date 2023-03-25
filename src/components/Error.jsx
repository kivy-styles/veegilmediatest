import React from 'react'

export function Error(prop){
    const{fieldErrorText, fieldErrorDisplay, ErrorText, ErrorDisplay}=prop
    return<div>
        <div className={`error`} style={{display:fieldErrorDisplay}}>
            <div className={`sec-error`}>{fieldErrorText}</div>
        </div>
        <div className={`error`} style={{display:ErrorDisplay}}>
            <div className={`sec-error`}>{ErrorText}</div>
        </div>
    </div>
}