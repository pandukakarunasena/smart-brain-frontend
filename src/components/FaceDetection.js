import React from 'react'
import '../faceDetection.css'

const FaceDetection = (props) => {
    return(
        <div className='center-all'>
            <div className = 'absolute'>
                <img id='input_image' className='detect-image' src= {props.imageurl.toString()} alt = 'image will appear here'></img>
                <div style ={{top:props.box.topRow,
                            right:props.box.rightCol,
                            bottom:props.box.bottomRow,
                            left:props.box.leftCol}} 
                            className = 'face_detection'>
                
                </div>
            </div>
            
        </div>

)}


    
    


export default FaceDetection