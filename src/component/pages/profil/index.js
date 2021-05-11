import React, { useState } from 'react'
import'./style.css'
import { FaRegBell, FaChevronLeft, FaChartLine, FaTabletAlt, FaPencilAlt, FaCheck} from 'react-icons/fa'
import {BsLock, BsCardText} from 'react-icons/bs'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router'

function Index({hideProfil, me}) {
    const [dataUser, setDataUser] = useState({
        userName: me.userName,
        phone: me.phone
    })
    const handleAvatar=(e)=>{
        console.log(e.target.files[0]);
        const formData = new FormData()
        formData.append('avatar',e.target.files[0])
        axios.put(`${process.env.REACT_APP_DB_HOST}/users/avatar/${me.userId}`, formData)
            .then(()=>{
                Swal.fire({
                    titleText:'success!',
                    icon: 'success'
                })
                window.location.reload()
            })
            .catch((err) =>{
                console.log(err);
                Swal.fire({
                    titleText: 'Failed!',
                    text: 'Mohon cek file dan ukurannya!',
                    icon: 'error'
                })
            })
        
    }
    const handleInputUser=(e)=>{
        let user = document.getElementById('userName').removeAttribute('readonly')
        document.getElementById('userName').focus()
        let edit = document.getElementById('edit')
        let ok = document.getElementById('ok')
        edit.style.display = 'none'
        ok.style.display = 'inline'
        
    }
    const handleUsername=()=>{
        let user = document.getElementById('userName')
        const data = {userName :user.value}
        axios.post(`${process.env.REACT_APP_DB_HOST}/users/username/${me.userId}`, data)
        .then(()=>{
            Swal.fire({
                titleText:'success!',
                icon: 'success'
            })
        })
        .catch((err) =>{
            console.log(err);
            Swal.fire({
                titleText: 'Failed!',
                text:err,
                icon: 'error'
            })
        })
        let edit = document.getElementById('edit')
        let ok = document.getElementById('ok')
        edit.style.display = 'inline'
        ok.style.display = 'none'
    }
    const handlePhoneInput =()=>{
        document.getElementById('phone').removeAttribute('readonly')
        document.getElementById('phone').focus()
        document.getElementById('okPhone').style.display = 'inline'
    }
    const handlePhoneChange = ()=>{
        let user = document.getElementById('phone')
        const data = {phone :user.value}
        axios.post(`${process.env.REACT_APP_DB_HOST}/users/username/${me.userId}`, data)
        .then(()=>{
            Swal.fire({
                titleText:'success!',
                icon: 'success'
            })
        })
        .catch((err) =>{
            console.log(err);
            Swal.fire({
                titleText: 'Failed!',
                text:err,
                icon: 'error'
            })
        })
    }
    console.log(me);
    return (
        <div className="mainLeft profilScrol">
                    <div className="mainLeftObjek profileStyle">
                        <div className="homeHeader">
                            <div className="homeLogo">
                                <FaChevronLeft style={{ color: '#7E98DF', borderRadius: '1.3vw', fontSize: '1.7vw' }} onClick={hideProfil}/>
                            </div>
                            <div className="homeBar">
                                <p>{me.userName}</p>
                            </div>
                            <div></div>
                        </div>
                        <div className="profilImg">
                            <div className="profilAvatar">
                               <img src={me.avatar} alt=""/>
                               <div className="buttonUpdate">
                                    <input type="file" onChange={(e)=>{handleAvatar(e)}}/>
                               </div>
                            </div>
                            <div className="profilName">
                                <p>{me.name}</p>
                            </div>
                            <div className="profilUser">
                                <div className="editUsername">
                                    <input type="text" id='userName' placeholder={me.userName}  readonly="readonly"/> <FaPencilAlt id='edit' onClick={(e)=>{ handleInputUser(e)}} />
                                    <FaCheck id='ok' style={{display: 'none'}} onClick={(e)=>{handleUsername(e)}} />
                                </div>
                            </div>
                        </div>
                        <div className="profilAccount">
                            <div className="textAccount">
                                <p>Account</p>
                            </div>
                            <div className="phoneAccount">
                                <div className="phoneNumber">
                                    <input id="phone" type="text" pattern="[0-9]{1,5}" placeholder={me.phone} readonly="readonly"/> <FaCheck id='okPhone' style={{display: 'none'}} onClick={(e)=>{handlePhoneChange(e)}} /> <br/>
                                    <span onClick={()=>{handlePhoneInput()}}>Tap to change phone number</span>
                                </div>
                            </div>
                        </div>
                        <div className="accountUserName">
                            <div className="userNameContent">
                                <p>{me.userName}</p>
                                <span>Username</span>
                            </div>
                        </div>
                        <div className="pofilJobDesc">
                            <div className="jobDesc">
                                <p>{me.bio}</p>
                                <span>Bio</span>
                            </div>
                        </div>
                        <div className="accountSettingMore">
                            <span>Settings</span>
                            <div className="settingMoreList">
                                <div className="settingMoreObjek">
                                    <div className="setMoreIcon">
                                        <FaRegBell style={{ fontSize: '1.6vw' }}/>
                                    </div>
                                    <div className="setMoreText">
                                        <p>Notification and Sounds</p>
                                    </div>
                                </div>
                                <div className="settingMoreObjek">
                                    <div className="setMoreIcon">
                                        <BsLock style={{ fontSize: '1.6vw' }}/>
                                    </div>
                                    <div className="setMoreText">
                                        <p>Privaty and Security</p>
                                    </div>
                                </div>
                                <div className="settingMoreObjek">
                                    <div className="setMoreIcon">
                                        <FaChartLine style={{ fontSize: '1.6vw' }}/>
                                    </div>
                                    <div className="setMoreText">
                                        <p>Data and Stronge</p>
                                    </div>
                                </div>
                                <div className="settingMoreObjek">
                                    <div className="setMoreIcon">
                                        <BsCardText style={{ fontSize: '1.6vw' }}/>
                                    </div>
                                    <div className="setMoreText">
                                        <p>Chat settings</p>
                                    </div>
                                </div>
                                <div className="settingMoreObjek">
                                    <div className="setMoreIcon">
                                        <FaTabletAlt tyle={{fontSize: '1.6px'}}/>
                                    </div>
                                    <div className="setMoreText">
                                        <p>Devices</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    )
}

export default Index
