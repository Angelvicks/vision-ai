import React from 'react'

export const MobileBar = ({setMobile, mobile, changeMenu }) => {
    return (
        <>
        <div className="fsp-header" > 
        <span className="fsp-header-text"> Select From </span>
        <div className="fsp-mobile-menu" onClick={()=>{setMobile(!mobile)}}></div>
        </div>
           <div className="fsp-source-list">
        <div title="My Device" className="fsp-source-list__item fsp-source-list__item--active" onClick={()=>{changeMenu('MyDevice') }}> 
            <span className="fsp-source-list__icon fsp-icon fsp-icon--local_file_system"></span> 
            <span className="fsp-source-list__label">My Device</span>
        </div>
            <div title="Google Drive" className="fsp-source-list__item" onClick={()=>{changeMenu('GoogleDrive') }}>
                <span className="fsp-source-list__icon fsp-icon fsp-icon--googledrive"></span> 
                <span className="fsp-source-list__label">Google Drive</span>
            </div>
                <div title="Dropbox" className="fsp-source-list__item" onClick={()=>{changeMenu('Dropbox') }}>
                    <span className="fsp-source-list__icon fsp-icon fsp-icon--dropbox"></span> 
                    <span className="fsp-source-list__label">Dropbox</span>
                </div>
                    <div title="Box" className="fsp-source-list__item" onClick={()=>{changeMenu('Box')}}>
                        <span className="fsp-source-list__icon fsp-icon fsp-icon--box"></span> 
                        <span className="fsp-source-list__label">Box</span>
                    </div>
                        <div title="Link (URL)" className="fsp-source-list__item" onClick={()=>{changeMenu('Link') }}>
                             <span className="fsp-source-list__icon fsp-icon fsp-icon--url"></span> 
                             <span className="fsp-source-list__label">Link (URL)</span>
                            </div>
                        </div> 
            
        </>
    )
}
