import React, { useState } from 'react'
import'./style.css'
import { FaRegBell, FaChevronLeft, FaChartLine, FaTabletAlt, FaPencilAlt, FaCheck} from 'react-icons/fa'
import {BsLock, BsCardText} from 'react-icons/bs'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router'

function index() {
    return (
        <div>
            <div className="profTargetContainer">
                <div className="pofTargetHeader">
                    <div className="pofTargetIcomBack">
                        <FaChevronLeft />
                    </div>
                    <div className="pofTargetUserName">
                        <p>@userName</p>
                    </div>
                </div>
                <div className="profTargetAvatar">
                    <img src=".asset/Rectangle 8.png" alt="" />
                </div>
                <div className="proftarget">
                    <div className="profLeft">
                        <div>
                            <p>Mother</p>
                        </div>
                        <div>
                            <p>online</p>
                        </div>
                    </div>
                    <div className="profTargetIcon">
                        <p>icon</p>
                    </div>
                </div>
                <div className="phonetargetProf">
                    <span>Phone Number</span>
                    <p>+375(29)9239003</p>
                </div>
                <div className="targetProfLocationDll">
                    <div className="targetProfLocation">
                        <p>Location</p>
                    </div>
                    <div className="targetProfImage">
                        <p>Image</p>
                    </div>
                    <div className="targetProfDocuments">
                        <p>Documents</p>
                    </div>
                </div>
                <div className="galeryfileProfTarget">
                    <div className="galeryItemProftarget">
                        <img src="" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default index
