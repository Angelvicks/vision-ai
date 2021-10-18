import React from 'react'
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

export const Croper = () => {
    const [src, setFile]= React.useState(null)
    const [image, setImage] = React.useState(null)
    const [result, setResult] = React.useState(null)
    const [crop, setCrop] = React.useState({ aspect: 14 / 9 })
    const handleChange = (e)=>{
         setFile(URL.createObjectURL(e.target.files[0]))
    }
    const onLoad =()=>{

    }
 
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
        setFile(base64Image)
        console.log(base64Image);
        // return base64Image;
            
        // As a blob
        
      }

    return (
        <div>
            <h1>Hello world</h1>
            <input type='file' accept='image/*' onChange={e=>{handleChange(e)}}/>
            <button onClick={getCroppedImg}>crop image</button>
            <div style={{display:'flex'}}>
            <div style={{width:'600px', height:'500px', border:'1px solid black' }}>
               {/* {src && <img src={src} alt='test image' style={{width:'600px', height:'500px'}}/>} */}
               <ReactCrop src={src} className='test' onImageLoaded={setImage} crop={crop} onChange={setCrop}/>
            </div>
            
            </div>
        </div>
    )
}

