import React from 'react'
import { FaGoogleDrive } from 'react-icons/fa'
import { MobileBar } from './mobilebar'

export const GoogleDrive = ({setMobile, mobile, changeMenu}) => {
    return (
        <div className="fsp-modal__body">
            {mobile? <MobileBar setMobile={setMobile} mobile={mobile} changeMenu ={changeMenu }/> : <>
                <div>
                    <div className="fsp-header">
                        <FaGoogleDrive title="Google Drive" className="fsp-header-icon " />
                        <div className="fsp-mobile-menu" onClick={()=>{setMobile(!mobile)}}></div>
                    </div>
                </div> 
                <div className="fsp-content">
                    <div className="fsp-cloud__container">
                        <div className="fsp-source-auth__wrapper">
                            <FaGoogleDrive className="fsp-icon fsp-icon--auth fsp-source-auth__el " style={{color:'white',border:'1px solide black',borderRadius:'50%',
            backgroundColor:'blue', fontSize:'5px', padding:'8px'}}/>
                            <div className="fsp-text__title fsp-source-auth__el">Select Files from Google Drive</div> 
                            <div className="fsp-source-auth__el">
                                <span className="fsp-text__subheader"> You need to authenticate with  <span className="fsp-cloudname">Google Drive</span>. 
                                <div>We only extract images and never modify or delete them.</div>
                            </span>
                        </div> 
                        <button className="fsp-button fsp-button--auth fsp-source-auth__el" 
                        style={{textDecoration:'none'}}> Connect <span className="fsp-cloudname">Google Drive</span>
                        </button> 
                        <div className="fsp-source-auth__el">
                            <span className="fsp-text__subheader"> A new page will open to connect your account. </span>
                        </div>
                    </div>
                </div>
            </div> 
            <div className="fsp-footer">
                <div className="fsp-footer__nav">
                    <span className="fsp-footer__nav--left">
                        <span className="fsp-footer-text">
                            <span>Selected Files: 0</span>
                        </span>
                    </span> 
                    <span className="fsp-footer__nav--center"></span> 
                    <span className="fsp-footer__nav--right">
                        <span title="Next" className="fsp-button fsp-button--primary fsp-button--disabled">
                            <span>View/Edit Selected</span>
                        </span>
                    </span>
                </div>
            </div>
            </>
           }
        </div>
    )
}
