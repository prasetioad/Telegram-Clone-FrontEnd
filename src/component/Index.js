import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom'
import io from "socket.io-client";
import ForgotPassword from './pages/forgotPassword';
import Home from './pages/home/index'
import Login from './pages/Login/login'
import Register from './pages/register/index'
import Verify from './pages/register/verify'
import Front from './pages/index'

function Index() {
    // const [socket, setsocket] = useState(null)
    // const history = useHistory()
    // const setupSocket = () => {
    //     const newSocket = io(`${process.env.REACT_APP_SOCKET_HOST}`)
        // console.log(newSocket)
        // newSocket.on('connect', () => {
        //     console.log('Socket On ^_^');
        // })
    //     setsocket(newSocket)
        
    // }
    // useEffect(() => {
        // setupSocket()
    // }, [])
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact={true} component={Front}/>
                <Route path="/home" component={Home}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/verify" component={Verify}/>
                <Route path="/forgot-password" component={ForgotPassword}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Index
