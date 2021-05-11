import axios from 'axios'
import React, { useEffect } from 'react'
import ReactLoading from 'react-loading'
import { useHistory } from 'react-router'
import Swal from 'sweetalert2'

function Verify(props) {
    const history = useHistory()
    useEffect(() => {
        const id = props.location.search.split('=')[1]
        console.log(id);
        axios.get(`${process.env.REACT_APP_DB_HOST}/users/verify/${id}`)
        .then(async(res)=>{
            console.log(res);
           await Swal.fire({
                title: 'Great',
                titleText: 'Register Successfully!',
                icon: 'success'
            })
            history.push('./login')
        })
        .catch(async(err)=>{
            console.log(err);
            await Swal.fire({
                title:'Oops!',
                text: 'Token Expired!',
                icon: 'error'
            })
            history.push('./register')
        })
    }, [])
    console.log(props);
    return (
        <>
            <ReactLoading type={'cubes'} color={'#7E98DF'} height={600} width={600} style={{textAlign: 'center,', color: '#7E98DF', opacity: '0.4'}} />
        </>
    )
}

export default Verify
