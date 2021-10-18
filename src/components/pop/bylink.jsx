import React from 'react'
import { FaLink } from 'react-icons/fa'
import { useImgStore } from '../../imgStore'
import { MobileBar } from './mobilebar'
export const ByLink = ({setMobile, mobile, changeMenu}) => {
    const setImgUrl = useImgStore(state=>state.setImgUrl)
    const [imgLink, setimgLink] = React.useState('')
    const handleSubmit = (e)=>{
        e.preventDefault()
        setImgUrl(imgLink)
        console.log(imgLink)
        setimgLink('')

    }
    return (
        <div className="fsp-modal__body">
        {mobile? <MobileBar setMobile={setMobile} mobile={mobile} changeMenu ={changeMenu }/> : <>
        <div> 
            <div className="fsp-header">
                <FaLink title="Link (URL)" className="fsp-header-icon "/>
                <div className="fsp-mobile-menu" onClick={()=>{setMobile(!mobile)}}></div>
            </div>
        </div> 
        <div className="fsp-content"><div className="fsp-url-source">
            <div className="fsp-url-source__container">
                <form className="fsp-url-source__form" __bizdiag="0" __biza="WJ__" >
                    <input type="url" placeholder="Enter a URL" className="fsp-url-source__input" value={imgLink} onChange={(e)=>setimgLink(e.target.value)}/> 
                    <button type="button" className="fsp-button fsp-url-source__submit-button"onClick={(e)=>handleSubmit(e)} >
                        <FaLink className="fsp-url-source__submit-icon"/>
                    </button>
                </form>
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
