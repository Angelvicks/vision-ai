import React from 'react'
import { SideBar } from './pop/sidebar'
import { MyDevice } from './pop/mydevice'
import { Box } from './pop/box'
import { GoogleDrive} from './pop/googledrive'
import { ByLink } from './pop/bylink'
import { DropBox } from './pop/dropbox'
import {MdClose } from 'react-icons/md'
import {EditePic} from './pop/editpic'
import { useImgStore } from '../imgStore'
import {MobileBar} from './pop/mobilebar'

export const PopUp = ({trigger, setTriggers}) => {
    const imgUrl = useImgStore(state=>state.imgUrl)
    const [menu, setMenu] = React.useState('MyDevice')
    const changeMenu = (menuType)=>{
          setMenu(menuType)
          setMobile(false)
        //    e.target.classList.add('fsp-source-list__item--active')
        //    console.log(e)
    }
    const [mobile, setMobile] = React.useState(false)

    if(imgUrl){
        return(trigger) && <EditePic setTriggers={setTriggers}/>
    }
    return (trigger)? (

        
        <div className="fsp-picker">
        <div className="fsp-modal">
            <MdClose title="Click here or hit ESC to close picker" 
            className="fsp-picker__close-button " onClick={()=>setTriggers(false)}/>
           
                <SideBar changeMenu={changeMenu}/>
              
              {menu === 'MyDevice' && <MyDevice setMobile={setMobile} mobile={mobile} changeMenu ={changeMenu }/> }
              {menu === 'GoogleDrive' && <GoogleDrive setMobile={setMobile} mobile={mobile} changeMenu ={changeMenu }/> }
              {menu === 'Dropbox' && <DropBox setMobile={setMobile} mobile={mobile} changeMenu ={changeMenu }/> }
              {menu === 'Box' && <Box setMobile={setMobile} mobile={mobile} changeMenu ={changeMenu }/> }
              {menu === 'Link' && <ByLink setMobile={setMobile} mobile={mobile} changeMenu ={changeMenu }/> }
                
               
          </div>
    </div>        
    ): ''
}
