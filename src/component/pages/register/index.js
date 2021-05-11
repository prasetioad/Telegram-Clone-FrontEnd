import React, { useEffect, useState } from 'react' 
import '../Login/login.css'
import { useHistory } from "react-router";
import Button from '../../objek/button'
import Swal from 'sweetalert2'
import {FaEye, FaEyeSlash, FaGoogle, FaChevronLeft} from 'react-icons/fa'
import axios from 'axios';


function Register() {
    const history = useHistory()
    const [data, setData] = useState({
        name: null,
        email: null,
        password: null
    })
    const [show, setshow] = useState(false)
    useEffect(() => {
        
    }, [])

    const handleShowPass=()=>{
        const input = document.getElementsByClassName('password')
        input[0].type = 'text'
        setshow(true)
    }
    const handleHidePass=()=>{
        const input = document.getElementsByClassName('password')
        input[0].type = 'password'
        setshow(false)
    }
    const handleChange=(e)=>{
        const target = e.target
        const value = target.value
        const name = target.name
        console.log(value);
        setData({
            ...data,
            [name]: value
        })

    }
    const onRegister=(e)=>{
        e.preventDefault()
        if(data.email.length < 10 || data.password.length < 6 || data.email == null || data.password == null){
            Swal.fire({
                        title: 'Oops!',
                        text: `Your email must long than 10! \n and your password must long than 6!`,
                        icon: 'warning',
                      })
        }
        axios.post(`${process.env.REACT_APP_DB_HOST}/users`, data)
        .then(async(res)=>{
            console.log(res);
            await Swal.fire({
                title: 'Success!',
                text: 'Check your email!',
                icon: 'success',
              })
              window.location.reload()
        }).catch((err)=>{
            console.log(err);
            Swal.fire({
                title: 'Opps!',
                text: 'Your email has register! check your email!',
                icon: 'warning',
              })
        })
    
    }
    return (
        <div className="loginContainer">
            <main className="login-container">
                <div className="loginCard">
                    <div className="loginItem">
                        <div className="login">
                            <span><FaChevronLeft style={{textAlign: 'left'}} onClick={()=>{history.push('./login')}}/></span>
                            <p>Register</p>
                            <div></div>
                        </div>
                        <div>
                            <p>Let’s create your account!</p>
                        </div>
                        <div className="loginForm">
                            <form action="">
                            <div className="login-input">
                                    <p><span>Name</span></p><div className="login-input-item">
                                        <input type="teks" name='name' onChange={(e)=>handleChange(e)}/>
                                    </div>
                                </div>
                                <div className="login-input">
                                    <p><span>Email</span></p><div className="login-input-item">
                                        <input type="email" name='email' onChange={(e)=>handleChange(e)} />
                                    </div>
                                </div>
                                <div className="login-input">
                                    <p><span>Password</span></p>
                                    <div className="login-input-item">
                                        <input type="password" name='password' className="password" onChange={(e)=>handleChange(e)}/>{show == false ?
                                        <FaEyeSlash style={{textAlign: 'right', fontSize: '21px'}} onClick={()=>{handleShowPass()}} /> : 
                                        <FaEye style={{textAlign: 'right', fontSize: '21px'}} onClick={()=>{handleHidePass()}} />}
                                        </div>
                                </div>
                                <div className="loginForgot">
                                    <Button init='Register' handleClick={(e)=>{onRegister(e)}} style={{background: 'Chetwode Blue'}}>Register</Button>
                                </div>
                            </form>
                            <div className="loginLine">
                                <div className="line"><hr/></div>
                                    <div>
                                        <p>Register with</p>
                                    </div>
                                <div className="line"><hr/></div>
                            </div>
                            <div className="obj-button log-button">
                                <button><FaGoogle /> Google</button>
                            </div>
                            <div className="logDontHave" >
                                <p onClick={()=>{ history.push('./login')}}>Don’t have an account? Sign In</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Register
