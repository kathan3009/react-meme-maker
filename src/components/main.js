import React, { useEffect, useRef, useState } from 'react';
// import Canvas from './canvas';
import '../css/style.css'

const Main = () => {
  const [top_text,setTopText] = useState('')
  const [image,setImage] = useState(null)
  const [bottom_text,setBottomText] = useState('')
  const [file,setFile] = useState({})
  const canvasRef = useRef(null)
  useEffect(() => {
   if(file[0])
   {
    const img = new Image();
    var reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = function(evt){
      if( evt.target.readyState == FileReader.DONE) {
          img.src = evt.target.result;
          img.onload=() => { setImage(img)}
         
      }
     }
   }
  },[file[0]])
  useEffect(() => {
      if(image && canvasRef)
      { 
          const canvas = canvasRef.current
          const ctx = canvas.getContext("2d")
          ctx.clearRect(0, 0, canvas.width, canvas.height);   
          ctx.drawImage(image,0,0,canvas.width,canvas.height) 
          ctx.beginPath()
          ctx.font = "30px Comic Sans MS";
          ctx.fillStyle = "white";
          ctx.textAlign = "center"
          ctx.fillText(top_text,canvas.width/2, 30);
          ctx.fillText(bottom_text,canvas.width/2,canvas.height-20); 

      }
  },[image,canvasRef,top_text,bottom_text])
  const handleSubmit = (e) => {
      e.preventDefault();
      const down_img = canvasRef.current.toDataURL("image/jpg");
  }
     return(
         <>
            <div className="main">
                <div className="canvas">
                    {/* <Canvas top={top_text} bottom={bottom_text} file={file} /> */}
                    <canvas ref={canvasRef} id="meme" ></canvas>
                </div>
                <div className="text">
                    <form onSubmit={handleSubmit}> 
                    <label htmlFor="top-text">
                      Add File:
                     </label>
                     <input type="file" name="file" onChange={(e) => {setFile(e.target.files)}}/>
                    <label htmlFor="top-text">
                      Top-Text:
                     </label>
                     <input type="text" name="top-text" value={top_text} onChange={e => {setTopText(e.target.value)}}/>
                     <label htmlFor="bottom-text">
                      Bottom-Text:
                     </label>
                     <input type="text" name="bottom-text" value={bottom_text} onChange={e => {setBottomText(e.target.value)}}/>
                     <input type="submit" value="submit" /> 
                    </form>
                    
                </div>
            </div>
         </>
     )
}
export default Main