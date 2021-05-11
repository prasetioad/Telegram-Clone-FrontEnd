import React, { useEffect, useState } from 'react' 
import axios from 'axios'
import Swal from 'sweetalert2'
import './login.css'
import { useHistory } from "react-router";
import Button from '../../objek/button'
import {FaEyeSlash, FaEye, FaGoogle} from 'react-icons/fa'


function Login() {
    const history = useHistory()
    const [show, setshow] = useState(false)
    const [data, setData] = useState({
        email: null,
        password: null
    })

    useEffect(() => {
        if(localStorage.getItem('token') !== null){
            history.push('./home')
        }
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
        const onLogin=(e)=>{
            e.preventDefault()
            if(data.email == null || data.password == null || data.email.length < 10 || data.password.length < 6 ){
                Swal.fire({
                            title: 'Oops!',
                            text: `Your email & password must long than 6 character!`,
                            icon: 'warning',
                          })
                          return
            }
            if(data.email !== null || data.password !== null || data.email.length <! 10 || data.password.length <! 6 ){
            axios.post(`${process.env.REACT_APP_DB_HOST}/users/login`, data)
            .then(async(res)=>{
                console.log(res);
                localStorage.setItem('token', res.data.data.token)
                localStorage.setItem('userId',res.data.data.checkEmail.userId)
                await Swal.fire({
                    title: 'Great!',    
                    icon: 'success',
                  })
                  history.push('./home')
            }).catch((err)=>{
                console.log(err);
                Swal.fire({
                    title: 'Opps!',
                    text: 'Your Password must long than 6 character!',
                    icon: 'warning',
                  })
            })
        }
        }
    return (
        <div className="loginContainer">
            <main className="login-container">
                <div className="loginCard">
                    <div className="loginItem">
                        <div className="login">
                            <p>Login</p>
                        </div>
                        <div>
                            <p>Hi, Welcome back!</p>
                        </div>
                        <div className="loginForm">
                            <form action="">
                                <div className="login-input">
                                    <p><span>Email</span></p><div className="login-input-item">
                                        <input type="email" name='email' onChange={(e)=>handleChange(e)}/>
                                    </div>
                                </div>
                                <div className="login-input">
                                    <p><span>Password</span></p>
                                    <div className="login-input-item">
                                    <input type="password" name='password' className="password" onChange={(e)=>handleChange(e)}/>{show == false ?
                                        <FaEyeSlash style={{textAlign: 'right', fontSize: '21px'}} onClick={()=>{handleShowPass()}} /> : <FaEye style={{textAlign: 'right', fontSize: '21px'}} onClick={()=>{handleHidePass()}} />}
                                        </div>
                                </div>
                                <div className="loginForgot">
                                    <p>Forgot Password?</p>
                                </div>
                                <Button init='Login' style={{background: 'Chetwode Blue'}} handleClick={(e)=>{onLogin(e)}}>Login</Button>
                            </form>
                            <div className="loginLine">
                                <div className="line"><hr/></div>
                                    <div>
                                        <p>Login with</p>
                                    </div>
                                <div className="line"><hr/></div>
                            </div>
                            <div className="obj-button log-button">
                                <button><FaGoogle /> Google</button>
                            </div>
                            <div className="logDontHave" onClick={()=>{ history.push('./register')}}>
                                <p>Don’t have an account? Sign Up</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}


export default Login
