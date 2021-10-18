import React from 'react'
import {FaDesktop } from 'react-icons/fa'
import { AiOutlineFileAdd } from 'react-icons/ai'
import {useImgStore} from '../../imgStore'
import { MobileBar } from './mobilebar'

export const MyDevice = ({setMobile, mobile, changeMenu}) => {
    const setImg = useImgStore(state=>state.setImgfile)
    const setimgUrl = useImgStore(state=>state.setimgUrl)

    let uploaded_file;

    const showFile = ()=>{
         let fileType = uploaded_file.type
         let validExtension = ['image/png', 'image/jpeg', 'image/jpg', 'image/pdf']
         if(validExtension.includes(fileType)){
             let fileReader = new FileReader();
               fileReader.onload = ()=>{
                 let fileURl = fileReader.result;
                 setimgUrl(fileURl)
                //   console.log(fileURl)
                }
             fileReader.readAsDataURL(uploaded_file)
         }else{
             console.log("the file type is invalid")
         }
     }
     
 
     const dragoverHandler =(e)=>{
         e.preventDefault();
         console.log('image drage on drag box')
        //  document.querySelector(".drag-area").classList.add("active")
        //  document.querySelector(".hd").textContent = "Release to upload file"
     }
     const dragleaveHandler = (e)=>{
         e.preventDefault();
         console.log('image is remove from the drag box')
      
     }
     const dropHandler = (e)=>{
         e.preventDefault();
         uploaded_file = e.dataTransfer.files[0]
         setImg(uploaded_file)
         showFile()
     }
 
     const clickHandler = ()=>{
         document.querySelector("#fsp-fileUpload").click()
         
     }
     
     const changeHandler = (e)=>{
         uploaded_file = e.target.files[0]
         setImg(uploaded_file)
       
         showFile()
     }
   
    
    return (
        <div className="fsp-modal__body">
                   
                    {mobile? <MobileBar setMobile={setMobile} mobile={mobile} changeMenu ={changeMenu }/> :<> 
                        <div> 
                        <div className="fsp-header">
                        <div className="fsp-mobile-menu" onClick={()=>{setMobile(!mobile)}}></div>
                            <FaDesktop title="My Device" className="fsp-header-icon"/>
                            
                        </div>
                    </div>
                    <div className="fsp-content">
                        <div className="fsp-drop-area-container">
                            <div className="fsp-drop-area" onDragOver={(e)=>{dragoverHandler(e)}} onDragLeave={(e)=>{dragleaveHandler(e)}} onDrop={(e)=>{dropHandler(e)}} onClick={()=>{clickHandler()}}>
                                <div className="fsp-select-labels">
                                    <AiOutlineFileAdd style={{fontSize:'80px', marginBottom:'-60px',color:'#CCCCCC'}}/>
                                    <div className="fsp-drop-area__title fsp-text__title"> Select Files to Upload </div> 
                                    <div className="fsp-drop-area__subtitle fsp-text__subheader"> or Drag and Drop, Copy and Paste Files </div>
                                </div> 
                                <input type="file" id="fsp-fileUpload" className="fsp-local-source__fileinput"  onChange={(e)=>{changeHandler(e)}}/>
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
                     </>}
                </div>
    )
}