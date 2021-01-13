import React, { useEffect, useRef, useState } from 'react';

const Canvas = (props) => {
    const canvasRef = useRef(null)
    const [top_x,setTopX] = useState(0)
    const [top_y,setTopY] = useState(0)
    var img = new Image()

    useEffect(() => {
       
        var file = props.file[0];
        const canvas = canvasRef.current
        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);   
        
        if(file )
        {     console.log(file)
            
              var reader = new FileReader();
	          reader.readAsDataURL(file);
	    	  reader.onload = function(evt){
	    		if( evt.target.readyState == FileReader.DONE) {
                    img.src = evt.target.result;
                        ctx.drawImage(img, 0, 0 ,canvas.width,canvas.height);
                        ctx.beginPath()
                        ctx.font = "30px Comic Sans MS";
                        ctx.fillStyle = "white";
                        ctx.textAlign = "center"
                        ctx.fillText(props.top,canvas.width/2, 30);
                        ctx.fillText(props.bottom,canvas.width/2,canvas.height-20);  
                       
			}
	    	}    
        }      
    },[props.top,props.bottom,props.file])
  
    const handleClick = (e) => {
            e.preventDefault()
            setTopX(e.pageX*3)
            setTopY(e.pageY*3)
            console.log(top_x + "," + top_y)
    }
   return (
       <div>
         <canvas ref={canvasRef} id="meme"></canvas>
       </div>
   )
}
export default Canvas