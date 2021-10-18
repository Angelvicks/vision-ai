import React from 'react'
import {FaDesktop, FaGoogleDrive, FaDropbox, FaLink } from 'react-icons/fa'
import {SiBox  } from 'react-icons/si'

export const SideBar = ({changeMenu}) => {
    return (
        <div className="fsp-modal__sidebar">
        <div className="fsp-source-list">
           
               <div title="My Device" className="fsp-source-list__item " onClick={()=>changeMenu('MyDevice')}> 
                <FaDesktop className="fsp-source-list__icon " style={{color:'black',border:'1px solide black',borderRadius:'50%',
            backgroundColor:'white', fontWeight:'200px', padding:'7px'}}/> 
                <span className="fsp-source-list__label">My Device</span> 
                </div>
            
            
                <div title="Google Drive" className="fsp-source-list__item" onClick={()=>changeMenu('GoogleDrive')}>
                <FaGoogleDrive className="fsp-source-list__icon " style={{color:'white',border:'1px solide black',borderRadius:'50%',
            backgroundColor:'#03083C', fontWeight:'200px', padding:'8px'}}/> 
                    <span className="fsp-source-list__label">Google Drive</span>
                </div>
            
                
                <div title="Dropbox" className="fsp-source-list__item" onClick={()=>changeMenu('Dropbox')}> 
                <FaDropbox  className="fsp-source-list__icon " style={{color:'white',border:'1px solide black',borderRadius:'50%',
            backgroundColor:'#686FF1', fontWeight:'200px', padding:'8px'}}/> 
                    <span className="fsp-source-list__label">Dropbox</span> 
                </div>
            
               
                <div title="Box" className="fsp-source-list__item" onClick={()=>changeMenu('Box')}>
                <SiBox  className="fsp-source-list__icon " style={{color:'white',border:'1px solide black',borderRadius:'50%',
            backgroundColor:'#686FF1', fontWeight:'200px', padding:'8px'}}/>  
                    <span className="fsp-source-list__label">Box</span> 
                </div>
            
              
                <div title="Link (URL)" className="fsp-source-list__item " onClick={()=>changeMenu('Link')}>
                    <FaLink  className="fsp-source-list__icon " style={{color:'black',border:'1px solide black',borderRadius:'50%',
            backgroundColor:'#E9E6EA', fontWeight:'200px', padding:'8px'}}/> 
                    <span className="fsp-source-list__label ">Link (URL)</span>
                </div>
                
            </div>
        </div>
    )
}
