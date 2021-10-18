import React from 'react'
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { FiCrop} from 'react-icons/fi'
import {HiArrowLeft} from 'react-icons/hi'
import {MdCropRotate} from 'react-icons/md'
import {MdClose} from 'react-icons/md'
import { useImgStore } from '../../imgStore'
import  axios from 'axios';

export const EditePic = ({setTriggers}) => {
    const imgUrl = useImgStore(state=>state.imgUrl)
    const imgfile = useImgStore(state=>state.imagefile)
    const setDownloadUrl = useImgStore(state=>state.setDownloadUrl)
    const setExtractedText = useImgStore(state=>state.setExtractedText)
   
    // const [imgUrls, setImgUrls]= React.useState(imgUrl)
    const [editeImgUrl, setEditedImgUrl] = React.useState(imgUrl)
    const resetImgUrl = useImgStore(state => state.setimgUrl)
    const [buttonLabel, setButtonlabel] = React.useState('Upload')
    const [editState, setEditState] = React.useState(false)
   
   
    // const setImgUrl = useImgStore(state=>state.setimgUrl)
    const closePopOut = ()=>{
        resetImgUrl('')
        setTriggers(false)
    }
    const uploader = async ()=>{
        const fd = new FormData();
        fd.append('file', imgfile, imgfile.name )
        // axios.post('http://127.0.0.1:8000/upload-file/', fd).then(respon=>{console.log(respon)})

        try {
                // let res = await axios.post('http://127.0.0.1:8000/upload-file/', fd);
                // let result = res.data;
                let res = await axios.post('http://127.0.0.1:8000/predictions', fd);
                console.log(res);
                 const {link}= res.data
                 console.log(link)
                setDownloadUrl(res.data.link)
                let getTexts = res.data.likely_class
                let words = ''
                getTexts.map(text=>{
                    words = words + text + ' '
                })
                console.log(words)
                setExtractedText(words)
                
              } catch(e) {
                console.log(e)
              }
    }
    
    // const [src, setFile]= React.useState(null)
    const [image, setImage] = React.useState(null)
    // const [result, setResult] = React.useState(null)
    const [crop, setCrop] = React.useState({ unit: '%', width:100, height:100 })

    const getCroppedImg = ()=> {
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");
      
        // New lines to be added
        const pixelRatio = window.devicePixelRatio;
        canvas.width = crop.width * pixelRatio;
        canvas.height = crop.height * pixelRatio;
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = "high";
      
        ctx.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height
        );
      
        // As Base64 string
        const base64Image = canvas.toDataURL("image/jpeg");
        // setResult(base64Image)
        setEditedImgUrl(base64Image)
        // console.log(base64Image);
        // return base64Image;
            
        // As a blob
        
      }
      const editepic = ()=>{
        setButtonlabel('Save')
        setEditState(true)  
      }

      const appChange = ()=>{
          if(buttonLabel === 'Save'){
            setEditState(false)
            getCroppedImg()
            setButtonlabel('Upload')
           
        }
        if(buttonLabel === 'Upload'){
            resetImgUrl(imgUrl)
            setTriggers(false)
            uploader()
           
        }
      }
      const resetImgState = ()=>{
        setEditedImgUrl(imgUrl)
        setEditState(false)
      }

    return (
        <div className="fsp-picker">
        <div className="fsp-modal">
          
        <MdClose title="Click here or hit ESC to close picker" 
             className="fsp-picker__close-button " onClick={closePopOut}/>
            <div className="fst-sidebar">
                <div title="Crop" className="fst-sidebar__option" onClick={editepic}>
                     <FiCrop className="fst-icon fst-icon--crop-black"/>Crop </div>
                   
                    {/* <div title="Circle" className="fst-sidebar__option">
                        <span className="fst-icon fst-icon--circle-black"></span> Circle </div> */}
                        <div title="Rotate" className="fst-sidebar__option">
                        <MdCropRotate className="fst-icon fst-icon--rotate-black" />
                             Rotate </div>
                        </div> 
                        <div className="fsp-modal__body fsp-modal__body--transformer">
                            <div>
                                
                                <div title="Go back" ><HiArrowLeft className="fsp-transformer__go-back" onClick={()=>resetImgUrl('')}/></div> 
                                <div className="fsp-header">
                                    <span className="fsp-header-text--visible">Edit Image</span> 
                                </div>
                            </div> 
                            <div className="fsp-content fsp-content--selected-items fsp-content--transformer">
                                <div className="fsp-transformer" >
                                     { !editState && <img src={editeImgUrl}   alt='' style={{width: '100%', height: '100%'}}/> }
                                      
                                    <div className="cropper-container" touch-action="none" style={{width: '566px', height: '472px'}}>
                                        <div className="cropper-wrap-box">
                                            <div className="cropper-canvas" style={{width: '564.962px', height: '317.636px', transform: 'translateX(0.519185px)'}}>
                                                {/* <img src={imgUrl} className="cropper-hide" style={{width: '564.962px', height: '317.636px', transform: 'none'}}/> */}
                                                {/* <ReactCrop src={imgUrl}  onImageLoaded={setImage} crop={crop} onChange={setCrop}/> */}
                                                
                                            </div>
                                        </div>
                                         <div className="cropper-drag-box" data-cropper-action="none"></div> 
                                         <div className="cropper-crop-box ">
                                            <span className="cropper-view-box">
                                            {editState && <ReactCrop src={editeImgUrl}  onImageLoaded={setImage} crop={crop} onChange={setCrop} />}
                                                 </span>
                                                {/*<span className="cropper-dashed dashed-h cropper-hidden"></span>
                                                <span className="cropper-dashed dashed-v cropper-hidden"></span>
                                                <span className="cropper-center cropper-hidden"></span>
                                                <span className="cropper-face cropper-move" data-cropper-action="all"></span>
                                                <span className="cropper-line line-e" data-cropper-action="e"></span>
                                                <span className="cropper-line line-n" data-cropper-action="n"></span>
                                                <span className="cropper-line line-w" data-cropper-action="w"></span>
                                                <span className="cropper-line line-s" data-cropper-action="s"></span>
                                                <span className="cropper-point point-e" data-cropper-action="e"></span>
                                                <span className="cropper-point point-n" data-cropper-action="n"></span>
                                                <span className="cropper-point point-w" data-cropper-action="w"></span>
                                                <span className="cropper-point point-s" data-cropper-action="s"></span>
                                                <span className="cropper-point point-ne" data-cropper-action="ne"></span>
                                                <span className="cropper-point point-nw" data-cropper-action="nw"></span>
                                                <span className="cropper-point point-sw" data-cropper-action="sw"></span>
                                                <span className="cropper-point point-se" data-cropper-action="se"></span> */}
                                            </div> 
                                        </div> 
                                        {/* <div className="fsp-transformer__rotate" style={{display: 'none'}}>
                                            <div title="Rotate -90°" className="fsp-transformer__rotate-left"></div> 
                                            <div title="Rotate 90°" className="fsp-transformer__rotate-right"></div>
                                        </div>  */}
                                        <div className="fsp-footer fsp-footer--appeared" slot="footer">
                                            <div className="fsp-footer__nav">
                                                <span className="fsp-footer__nav--left" onClick={resetImgState}>
                                                    <span className="fsp-button fsp-button--cancel fsp-button--cancel-disabled" > Reset </span>
                                                </span>
                                                 <span className="fsp-footer__nav--center"></span> 
                                                 <span className="fsp-footer__nav--right">
                                                     <div>
                                                         <span title="Upload" className="fsp-button fsp-button--primary" onClick={appChange}> {editState? 'Save': 'Upload'}</span>
                                                        </div>
                                                    </span>
                                                </div>
                                            </div> 
                                            <div className="fsp-footer" slot="footer">
                                                <div className="fsp-footer__nav">
                                                    <span className="fsp-footer__nav--left"></span> 
                                                    <span className="fsp-footer__nav--center" style={{width: '100%'}}>
                                                        <span>
                                                            <div className="fsp-progress-bar">
                                                                <div className="fsp-progress-bar__container">
                                                                    <div className="fsp-progress-bar__bar" style={{width: '0%'}}></div>
                                                                </div>
                                                            </div>
                                                        </span>
                                                    </span> 
                                                    <span className="fsp-footer__nav--right"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                 </div>
                                </div> 
                                <div className="fsp-picker__brand-container">
                                    <div className="fsp-picker__brand" style={{display: 'none'}}> Powered by <span className="fsp-icon--filestack"></span> Filestack </div>
                                </div>
                                
                            </div>
    )
}