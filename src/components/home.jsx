import React, {useState, useEffect} from 'react'
import { CopyToClipboard } from "react-copy-to-clipboard";
import {PopUp} from './popup'
import { useImgStore } from '../imgStore'
import logo1 from "../components/image/download1.png"
import logo2 from '../components/image/download2.png'
import phone from '../components/image/phone2.png'
import location from '../components/image/location.png'
import email from '../components/image/email.png'

import './home.css'

import { AiOutlineFileAdd } from 'react-icons/ai'
import axios from 'axios';


export const Home = () => {
   const imgUrl = useImgStore(state=>state.imgUrl)
    const [trigger, setTrigger] = React.useState(false)
    const downloadUrl = useImgStore(state=>state.downloadUrl)
    const downloadTextA = useImgStore(state=>state.downloadTextA)
    //  const [displaceText, setDisplaceText] = React.useState('')
    const [value, setValue] = useState(downloadTextA);
    const [copied, setCopied] = useState(false);
    
    // const handle = (e)=>{
    //     document.getElementById('mag').src=e.target.value
    // }
    // useEffect(()=>{
    //   setValue( downloadTextA.map((text, index)=>{
    //     return text
    //   }))
      
      

  // },downloadTextA.length)
    
   
    
    
    return (
        // <div>
        //     <button onClick={()=>setTrigger(true)}>upload file</button><br/>
            
        //     <input type='link' onChange={e=>{handle(e)}}/><br/>
        //      <img src={imgUrl } alt='testing' id='mag' /> 
        //     <PopUp trigger={trigger} setTriggers={setTrigger}/>
        // </div>
        <>
             {/* <header className='headbar'>
        <h1 className='logo'>VISION<span>TextExtractor</span></h1>
        <nav>
            <ul>
                <li><a href="">Home</a> </li>
                <li><a href="">Feature</a> </li>
                <li><a href="">Blog</a> </li>
                <li><a href="">Login</a> </li>
                <li className='signup'><a href="">SignUp</a> </li>
            </ul>
        </nav>
    </header> */}
     <div className="menu-wrap">
    <input type="checkbox" class="toggler"/>
    <div className="hamburger"><div></div></div>
    <div className="menu">
      <div>
        <div>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
    <section className="section1">
        <div>
        <img src={logo2} alt="log2" className='menu-wraps'/>
          <h2>VISION extract texts from any image.</h2>
          <p>The text extractor will allow you to extract text from any image. 
              You may upload an image or document (.pdf) and the tool will pull text from the image. 
              Once extracted, you can copy to your clipboard with one click</p>
          
        </div>
        <button className='startbtn' onClick={()=>setTrigger(true)}>Get Started</button>
    </section>
    <section className="section2">
        <div className="board">
            <h1>Text Extractor Tool</h1>
            <h2>Extract text from an image</h2>
            {/* <p>The text extractor will allow you to extract text from any image. 
                You may upload an image or document (.pdf) and the tool will pull text from the image. 
                Once extracted, you can copy to your clipboard with one click.</p> */}
                <p> Upload an image and the tool will extract the texts from the image.</p>
                {downloadUrl === "" && <div className='dragbox' onClick={()=>setTrigger(true)} id='imgdis'>
            <AiOutlineFileAdd style={{fontSize:'80px', margin:'10px',color:'#CCCCCC'}}/>
            <h4>Select Files to Upload</h4>
            <p>or Drag and Drop, Copy and Paste Files</p>
            </div>}
            { downloadUrl !== "" &&
         <div className='dragbox'>
         <img src= {imgUrl} alt='uploaded image' style={{width:'100%', height:'100%'}}/>
         </div>
        }
            <h3>Extracted Text</h3>
            <input type="text" className='textbox'
               value={downloadTextA}
             onChange={({ target: { value } }) => setValue(value)}/>
               {/* <input type='text' value={displaceText}  className='textbox' />   */}
            
            <CopyToClipboard text={downloadTextA} onCopy={() => setCopied(true)}>
            <button >Copy text</button>
          </CopyToClipboard>
          </div>
       
        
       
    </section>
    <section className='section3'></section>
    <section className='section4'>
        <img src={logo1} alt="log1" />
        <img src={logo2} alt="log2" />
    </section>
    <footer className="footer">
      <div className="wrapper">
        <div className="footer-content">
          <div className="footer-about">
           
            <div className="about-contact">
              <div className="about-contact__item">
                <img
                  src={location }
                  alt="icon location"
                />
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua
                </p>
              </div>
              <div className="about-contact__item">
                <img
                  src={phone}
                  alt="icon phone"
                />
                <a href="tel:1-543-123-4567">+237 676741241</a>
              </div>
              <div className="about-contact__item">
                <img
                  src={email}
                  alt="icon email"
                />
                <a href="mailto:example@gmail.com">mbongjaeden@gmail.com</a>
              </div>
            </div>
          </div>
          <nav className="footer-nav">
            <ul className="footer-nav__list">
              <li><a href="#">About Us</a></li>
              <li><a href="#">What We Do</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Career</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </nav>
          <div className="social-links">
            <div className="social">
              <div className="icon">
                <i className="fab fa-facebook-f"></i>
              </div>
              <div className="icon">
                <i className="fab fa-twitter"></i>
              </div>
              <div className="icon">
                <i className="fab fa-instagram"></i>
              </div>
            </div>
            <p class="copy">
              &copy; Copyright 2021 Huddle. All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
   
    <PopUp trigger={trigger} setTriggers={setTrigger}/>
        </>
    )
}
