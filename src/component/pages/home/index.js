import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import './style.css'
import { FaSearch, FaPlus, FaBars, FaTh, FaRegGrinAlt, FaFlickr, FaWhmcs, FaUser,FaPhone,FaChevronLeft } from 'react-icons/fa'
import {BsBookmark, BsFillPersonPlusFill, BsQuestionCircle} from 'react-icons/bs'
import axios from 'axios'
import io from 'socket.io-client'
import Profil from '../profil/index'
import ProfTarget from '../profilTarget/index'
import { useHistory } from 'react-router'
import {getProfile} from '../../config/redux/action/userAction'
import { useSelector } from 'react-redux'
import { render } from '@testing-library/react'


function Index() {
    const [socket, setSocket] = useState(null)
    const history = useHistory()
    // const {user} = useSelector(state => state.userReducer)
    const[myProfil, setMyProfil]= useState(null)
    const [targetChat, settargetChat] = useState({
        avatar: null,
        name: null,
        userId: null,
        status: null,
    })

    const [mainRight, setMainRight] = useState(true)
    const [showProfil, setShowProfil] = useState(false)
    const [setting, setSetting] = useState(false)
    const [targetMessages, setTargetMessages] = useState()
    const [showUserProfil, setshowUserProfil] = useState(false)
    const [dataTarget, setDataTarget] = useState()
    const [messages, setMessages] = useState(null)
    const [newMessage, setNewMessage] = useState()
    const [temporaryChat, setTemporaryChat] = useState([])
    const setupSocket = () => {
        const newSocket = io(`http://teletele.fwdev.online`)
        newSocket.on('connect', () => {
            console.log('Socket On ^_^');
        })
        setSocket(newSocket)
    }
    
    const initialUser=()=>{
        if(localStorage.getItem('userId') !== null){
            const data ={status: 'online', userId:localStorage.getItem('userId')}
            socket.emit('initialUser', data)
        }
    }
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_DB_HOST}/users/all`, {headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }}).then((res)=>{
            setDataTarget(res.data.data.rows)
        }).catch((err)=>{
            console.log(err);
        })
        axios.get(`${process.env.REACT_APP_DB_HOST}/msg`, {headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }}).then((res)=>{
            setMessages(res.data.data.rows)
        }).catch((err)=>{
            console.log(err)
        })
        axios.get(`${process.env.REACT_APP_DB_HOST}/users`, {headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }}).then((res)=>{
            console.log(res);
            setMyProfil(res.data.data)
        }).catch((err)=>{
            console.log(err);
        })
        setupSocket()
        if(localStorage.getItem('token') === null){
            history.push('./login')
        }
    },[])
    useEffect(() => {
        if(socket){
            socket.off('listen')
            socket.on("listen", data=>{
                if(targetChat.userId == data.userId){
                    setTemporaryChat([...temporaryChat, data])
                }else{
                    notif(data.sender)
                }
            })
        }

    },[socket, temporaryChat])
    useEffect(() => {
        if(socket){
            initialUser()
            socket.on('online',data=>{
                console.log(data);
            })
        }
        return ()=>{
            if(socket){
            const data ={status: 'offline', userId:localStorage.getItem('userId')}
            socket.emit('Disconnect', data)
            }
        }
    }, [socket])

    const notif =(sender)=>{
        Swal.fire({
            target: '#notif',
            customClass: {
                container: 'position-absolute'
            },
            toast: true,
            position: 'top-right',
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
            background:'#7E98DF',
            text: `satu pesan dari  <span style="color:#FFFFFF">${sender}<span>`,
            html: `<span style="color:#FFFFFF">satu pesan dari ${sender}<span>`
          })
    }
    const handleSendMsg= async()=>{
        const chat = document.getElementById('chat')
        const data = {
            receiver: targetChat.name,
            userId: localStorage.getItem('userId'),
            destId: targetChat.userId,
            sender: myProfil.name,
            message: newMessage,
            mysSocket: socket.id
        }
        socket.emit("personalChat", data)
    setTemporaryChat([...temporaryChat,data])
    setNewMessage('')
    chat.value=''
    }
    const handleStartChat=(avatar, userId, status, name)=>{
        settargetChat({
            avatar,
            userId,
            status, 
            name
        })
        axios.get(`${process.env.REACT_APP_DB_HOST}/msg/${userId}`, {headers: {
            Authorization : `Bearer ${localStorage.getItem('token')}`
        }})
        .then((res)=>{
            setTargetMessages(res.data.data)
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
        })
        setTemporaryChat([null])
        handleBackList()
    }
    const handleSettingShow=()=>{
        if(setting){
            setSetting(false)
        }else{
            setSetting(true)
        }
    }
    const handleShowProfil=()=>{
        if(showProfil){
            setShowProfil(false)
        }else{
            setShowProfil(true)
        }
    }
    const deleteChat=(userId, message)=>{
       const data ={message: message}
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          })
          .then((result)=>{
              if (result) {
                  axios.delete(`${process.env.REACT_APP_DB_HOST}/msg/${userId}`, data)
                    .then(() => {
                    Swal.fire(
                      'Deleted!',
                      'Your file has been deleted.',
                      'success'
                    )
                    })
                    .catch((err)=>{
                        Swal.fire('Failed delete')
                    })
              }
          })
          setTemporaryChat([])
    }
    const handleLogout=()=>{
        const data ={status: 'offline', userId:localStorage.getItem('userId')}
        socket.emit('Disconnect', data)
        localStorage.removeItem('userId')
        localStorage.removeItem('token')
        history.push('./login')
    }
    const handleBackList =(e)=>{
        const target = document.getElementById('mainLeft')
        const right = document.getElementById('mainRight')
        const home = document.getElementById('homeMain')
        if(window.screen.width <= 600){
            if(mainRight === false){
                setMainRight(true)
                target.style.display = 'none'
            }else{
                setMainRight(false)
                target.style.display = 'inline'
            }
        }
    }
    const target = document.getElementById('mainLeft')
    const right = document.getElementById('mainRight')
    window.addEventListener('resize', ()=>{
        if(window.screen.width <= 600){
            setMainRight(false)
        }else{
            setMainRight(true)
        }
    })
    function useForceUpdate(){
        const [value, setValue] = useState(0); // integer state
        return () => setValue(value => value + 1); // update the state to force render
    }
    const forceUpdate = useForceUpdate()
    console.log(temporaryChat)
    console.log(targetChat)
    console.log(mainRight);
    return (
        <div className='homeContainer'>
            <div className="homeMain" id='homeMain'>
                {showProfil == true ?
                <Profil me={myProfil} hideProfil={()=>handleShowProfil()} update={()=>forceUpdate}/> :
                <div className="mainLeft" id='mainLeft' >
                    <div className="mainLeftObjek">
                        <div className="homeHeader">
                            <div className="homeLogo">
                                <p>Telegram</p>
                            </div>
                            <div className="homeBar">
                                <FaBars className='icon' style={{ color: '#7E98DF', borderRadius: '16px', fontSize: '21px' }} onClick={()=>{handleSettingShow()}}/>
                                {setting == true ?
                                <div className="settingBar">
                                    <div className="settingMenu">
                                        <div className="settingObjek" onClick={()=>{handleShowProfil()}}>
                                            <div className="settingIcon">
                                                <FaWhmcs style={{ color: '#ffffff', borderRadius: '16px', fontSize: '22px' }}/>
                                            </div>
                                            <div className="settingText">
                                                <p>Setting</p>
                                            </div>
                                        </div>
                                        <div className="settingObjek">
                                            <div className="contactIcon">
                                                <FaUser style={{ color: '#ffffff', borderRadius: '16px', fontSize: '22px' }}/>
                                            </div>
                                            <div className="contactText">
                                                <p>Contact</p>
                                            </div>
                                        </div>
                                        <div className="settingObjek">
                                            <div className="calsIcon">
                                                <FaPhone style={{ color: '#ffffff', borderRadius: '16px', fontSize: '22px' }}/>
                                            </div>
                                            <div className="calsText">
                                                <p>Cals</p>
                                            </div>
                                        </div>
                                        <div className="settingObjek">
                                            <div className="saveMsgIcon">
                                                <BsBookmark style={{ color: '#ffffff', borderRadius: '16px', fontSize: '22px' }}/>
                                            </div>
                                            <div className="csaveMsgText">
                                                <p>Save messages</p>
                                            </div>
                                        </div>
                                        <div className="settingObjek">
                                            <div className="saveMsgIcon">
                                                <BsFillPersonPlusFill style={{ color: '#ffffff', borderRadius: '16px', fontSize: '22px' }}/>
                                            </div>
                                            <div className="csaveMsgText">
                                                <p>Invite Friends</p>
                                            </div>
                                        </div>
                                        <div className="settingObjek">
                                            <div className="saveMsgIcon">
                                                <BsQuestionCircle style={{ color: '#ffffff', borderRadius: '16px', fontSize: '22px', }}/>
                                            </div>
                                            <div className="csaveMsgText">
                                                <p>Telegram FAQ</p>
                                            </div>
                                        </div>
                                        <div className="settingObjek" onClick={()=>{handleLogout()}}>
                                            <div className="saveMsgIcon">
                                                <BsQuestionCircle style={{ color: '#ffffff', borderRadius: '16px', fontSize: '22px', }}/>
                                            </div>
                                            <div className="csaveMsgText">
                                                <p>Logout</p>
                                            </div>
                                        </div>
                                    </div>
                                </div> : null
                                }
                            </div>
                        </div>
                        <div className="homeSearch">
                            <div className="searchObjek">
                                <FaSearch /><input type="search" placeholder='Type your Message' />
                            </div>
                            <div className="searchPlus">
                                <FaPlus />
                            </div>
                        </div>
                        <div className="homeDesc">
                            <div className="homeAll descItem">
                                <p>All</p>
                            </div>
                            <div className="homeImportant descItem">
                                <p>Important</p>
                            </div>
                            <div className="homeUnread descItem">
                                <p>Unread</p>
                            </div>
                        </div>
                        <div className="homeFrienList">
                            <div className="bodyList">
                                {dataTarget && dataTarget.map(subjek =>{return(
                                <div className="listFriend" onClick={()=>handleStartChat(subjek.avatar,subjek.userId, subjek.status, subjek.name)}>
                                    <div className="friendImg">
                                        <img src={subjek.avatar} alt="" />
                                    </div>
                                    <div className="friendBodyChat">
                                        <div className="friendName">
                                            <p>{subjek.name}</p>
                                        </div>
                                    {messages && messages.length > 1 && <>
                                        <div className="friendNewChat">
                                            <p>{messages[0].message}</p>
                                        </div>
                                        </>}
                                    </div>
                                    {messages && messages.length > 1 && <>
                                    <div className="friendLastChat">
                                        <div className="chatTime">
                                            <p>{messages[0].time}</p>
                                        </div>
                                        <div className="chatCount">
                                            <div id="notif">{messages[0].status}</div>
                                        </div>
                                    </div>
                                    </>}
                                </div>
                                 )})}
                            </div>
                        </div>
                    </div>
                </div>
                }
                {mainRight === true &&
                <div className="mainRight" id='mainRight'>
                    {targetChat.name == null ?
                        <div className="rightContentEmpty">
                            <div className="chatEmpty">
                                <p>Please select a chat to start messaging</p>
                                <button onClick={()=>{handleBackList()}}>Start</button>
                            </div>
                        </div> :
                        <div className="rightcontentContainer">
                            {showUserProfil == true ?
                                <div className="rightContentUser" style={{ width: '60%' }}>
                                    <div className="contentChatObjek">
                                        <div className="contentChatHeader">
                                            <div className="responsiveBack"  onClick={()=>{handleBackList()}}><FaChevronLeft/></div>
                                            <div className="chatHeaderImgName">
                                                <div className="chatHeaderImg">
                                                    <img src={targetChat.avatar} alt="" />
                                                </div>
                                                <div className="chatHeaderName">
                                                    <div className="chatUserName">
                                                        <p>{targetChat.name}</p>
                                                    </div>
                                                    <div className="chatUserStatus">
                                                        <p>{targetChat.status}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="chatHeaderRight" onClick={() => { setshowUserProfil(false) }}>
                                                <FaTh />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mainChatBody">
                                        <div className="mainChatBodySelf">
                                        <div className="chatArea">
                                                    {targetMessages && targetMessages!== null && targetMessages.map((chat)=>{return(
                                                        chat.userId == targetChat.userId ?
                                                    <div className="messageWrapper">
                                                        <div className="avatarChat">
                                                            {chat.receiver == myProfil.name ?
                                                                <img src={targetChat.avatar} alt=""/> : <img src={myProfil.avatar} alt=""/>
                                                            }
                                                        </div>
                                                        <div className="chatBodyTeks" style={{textAlign: 'right'}}>
                                                            <div>
                                                                <p>{chat.message}</p>
                                                            </div>
                                                            <div className='chatBodyTime'>
                                                                <p>12.30</p>
                                                            </div>
                                                        </div>
                                                    </div> :
                                                    <div className="messageWrapper" style={{flexDirection: 'row-reverse'}}>
                                                        <div className="avatarChat">
                                                        {chat.receiver == myProfil.name ?
                                                                <img src={targetChat.avatar} alt=""/> : <img src={myProfil.avatar} alt=""/>
                                                            }
                                                        </div>
                                                        <div className="chatBodyTeks"  onClick={()=>{deleteChat(chat.userId)}}>
                                                            <div>
                                                                <p>{chat.message}</p>
                                                            </div>
                                                            <div className='chatBodyTime'>
                                                                <p>12.30</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    )})}
                                                    {temporaryChat && temporaryChat !== null && temporaryChat.map((chat)=>{return(
                                                        chat === null? <div></div> :
                                                        targetChat.userId == chat.destId || targetChat.userId == chat.destId ?
                                                        <div className="messageWrapper" style={{flexDirection: 'row-reverse'}}>
                                                        <div className="avatarChat">
                                                            {chat.sender == myProfil.name ?
                                                                <img src={myProfil.avatar} alt=""/> : <img src={targetChat.avatar} alt=""/>
                                                             }
                                                        </div>
                                                        <div className="chatBodyTeks" onClick={()=>{deleteChat(chat.userId)}}>
                                                            <div>
                                                                <p>{chat.message}</p>
                                                            </div>
                                                            <div className='chatBodyTime'>
                                                                <p>12.30</p>
                                                            </div>
                                                        </div>
                                                    </div> :
                                                    <div className="messageWrapper"  >
                                                        <div className="avatarChat">
                                                            {chat.sender == myProfil.name ?
                                                                <img src={myProfil.avatar} alt=""/> : <img src={targetChat.avatar} alt=""/>
                                                             }
                                                        </div>
                                                        <div className="chatBodyTeks" style={{textAlign: 'right'}}  >
                                                            <div>
                                                                <p>{chat.message}</p>
                                                            </div>
                                                            <div className='chatBodyTime'>
                                                                <p>12.30</p>
                                                            </div>
                                                        </div>
                                                    </div>  
                                                    )})}
                                                </div>
                                        </div>
                                        <div className="creatorChatBody">
                                            <div className="creatorChatObjek">
                                                <div className="creatorInput">
                                                    <input type="text" id='chat' onChange={(e)=>{setNewMessage(e.target.value)}}/>
                                                </div>
                                                <div className="creatorPlus">
                                                    <FaPlus />
                                                </div>
                                                <div className="creatorEmoticon">
                                                    <FaRegGrinAlt />
                                                </div>
                                                <div className="creatorLive">
                                                    <FaFlickr />
                                                </div>
                                            </div>
                                            <button onClick={()=>{handleSendMsg()}}>Send</button>
                                        </div>
                                    </div>
                                </div> :
                                <div className="rightContentUser" style={{ width: '100%' }}>
                                    <div className="contentChatObjek">
                                        <div className="contentChatHeader">
                                            <div className="chatHeaderImgName">
                                                <div className="chatHeaderImg">
                                                    <div className="responsiveBack"  onClick={()=>{handleBackList()}}><FaChevronLeft/></div>
                                                    <img src={targetChat.avatar} alt="" />
                                                </div>
                                                <div className="chatHeaderName">
                                                    <div className="chatUserName">
                                                        <p>{targetChat.name}</p>
                                                    </div>
                                                    <div className="chatUserStatus">
                                                        <p>{targetChat.status}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="chatHeaderRight" onClick={() => { setshowUserProfil(true) }}>
                                                <FaTh />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="containerChatBody">
                                        <div className="mainChatBody">
                                            <div className="mainChatBodySelf">
                                                <div className="chatArea">
                                                    {targetMessages && targetMessages!== null && targetMessages.map((chat)=>{return(
                                                        chat.userId == targetChat.userId ?
                                                    <div className="messageWrapper">
                                                        <div className="avatarChat">
                                                            {chat.receiver == myProfil.name ?
                                                                <img src={targetChat.avatar} alt=""/> : <img src={myProfil.avatar} alt=""/>
                                                            }
                                                        </div>
                                                        <div className="chatBodyTeks" style={{textAlign: 'right'}}>
                                                            <div>
                                                                <p>{chat.message}</p>
                                                            </div>
                                                            <div className='chatBodyTime'>
                                                                <p>12.30</p>
                                                            </div>
                                                        </div>
                                                    </div> :
                                                    <div className="messageWrapper" style={{flexDirection: 'row-reverse'}}>
                                                        <div className="avatarChat">
                                                        {chat.receiver == myProfil.name ?
                                                                <img src={targetChat.avatar} alt=""/> : <img src={myProfil.avatar} alt=""/>
                                                            }
                                                        </div>
                                                        <div className="chatBodyTeks"  onClick={()=>{deleteChat(chat.userId)}}>
                                                            <div>
                                                                <p>{chat.message}</p>
                                                            </div>
                                                            <div className='chatBodyTime'>
                                                                <p>12.30</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    )})}
                                                    {temporaryChat && temporaryChat !== null && temporaryChat.map((chat)=>{return(
                                                        // chat.sender == targetChat.name && chat.receiver == myProfil.name? 
                                                        chat === null? <div></div> :
                                                        targetChat.userId == chat.destId || targetChat.userId == chat.destId ?
                                                        <div className="messageWrapper" style={{flexDirection: 'row-reverse'}}>
                                                        <div className="avatarChat">
                                                            {chat.sender == myProfil.name ?
                                                                <img src={myProfil.avatar} alt=""/> : <img src={targetChat.avatar} alt=""/>
                                                             }
                                                        </div>
                                                        <div className="chatBodyTeks" onClick={()=>{deleteChat(chat.userId)}}>
                                                            <div>
                                                                <p>{chat.message}</p>
                                                            </div>
                                                            <div className='chatBodyTime'>
                                                                <p>12.30</p>
                                                            </div>
                                                        </div>
                                                    </div> :
                                                    <div className="messageWrapper"  >
                                                        <div className="avatarChat">
                                                            {chat.sender == myProfil.name ?
                                                                <img src={myProfil.avatar} alt=""/> : <img src={targetChat.avatar} alt=""/>
                                                             }
                                                        </div>
                                                        <div className="chatBodyTeks" style={{textAlign: 'right'}}  >
                                                            <div>
                                                                <p>{chat.message}</p>
                                                            </div>
                                                            <div className='chatBodyTime'>
                                                                <p>12.30</p>
                                                            </div>
                                                        </div>
                                                    </div>  
                                                    )})}
                                                </div>
                                            </div>
                                            <div className="creatorChatBody">
                                                <div className="creatorChatObjek">
                                                    <div className="creatorInput">
                                                        <input type="text" id='chat' onChange={(e)=>{setNewMessage(e.target.value)}}/>
                                                    </div>
                                                    <div className="creatorIconList">
                                                        <div className="creatorPlus">
                                                            <FaPlus />
                                                        </div>
                                                        <div className="creatorEmoticon">
                                                            <FaRegGrinAlt />
                                                        </div>
                                                        <div className="creatorLive">
                                                            <FaFlickr />
                                                        </div>
                                                    </div>
                                                    <button onClick={()=>{handleSendMsg()}}>Send</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            <div className="profileContainer">
                                {showUserProfil ?
                                <div className='profileContainerWrap' id='profileContainer'>
                                    <ProfTarget me={myProfil} hideProfil={()=>handleShowProfil()} />
                                </div> :
                                <div></div>
                            }
                            </div>
                        </div>
                    }
                </div>
                }
            </div>
        </div>
    )
}

export default Index
