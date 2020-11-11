import React from 'react'
import '../form.css'
const ImageLink = (props) => {
    
    return(
        <React.Fragment>
            <div className='detect-header '>
                <p className='f3 center-all mr3'>Hello {props.user}!!  You detected {props.entries} {(props.entries == 1)? 'face': 'faces'} {(props.entries == 0)? '😢'  : '😅'  } </p>
            </div>
            <div className='center-all'>
                <div className="form center pa4 shadow-2">
                    <input 
                    className='f5 f5-l input-reset  bn fl black-80 bg-white pa3 lh-solid w-100 w-75-m w-80-l br2-ns br--left-ns'
                    type='text' 
                    placeholder='paste your image link here'
                    onChange={props.onInputChange}
                    />
                    <button
                    className='f4 f4-l  fl pv3 tc bn bg-animate bg-green hover-bg-red black pointer w-100 w-25-m w-20-l br2-ns br--right-ns' 
                    disabled={props.input.length<1} 
                    onClick={props.onInputSubmit}
                   >DETECT</button> 
                </div> 
            </div>
        </React.Fragment>
    )
}


 
export default ImageLink