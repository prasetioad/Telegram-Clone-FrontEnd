import React from 'react'
import './objek.css'

function button(props) {
    return (
        <div className='obj-button'>
            <button onClick={props.handleClick}>{props.init}</button>
        </div>
    )
}

export default button
