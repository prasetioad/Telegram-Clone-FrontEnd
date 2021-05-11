import React from 'react'
import ReactLoading from 'react-loading';

function index(props) {
    console.log(props);
    return (
        <div>
             <ReactLoading type={props.type} color={props.color} height={'20%'} width={'20%'} />
        </div>
    )
}

export default index
