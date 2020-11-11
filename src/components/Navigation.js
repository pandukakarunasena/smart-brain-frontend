import React from 'react'


const Navigation = (props) => {

    if(props.isLoggedin){
        return(
            <nav style = {naviStyle}>
                <p onClick={() => props.onRouteChange('signin')} className='f4 link dim red pa2 pointer mr2'>Sign Out</p>
            </nav>
    )
    }else{
        return(
            <nav style = {naviStyle}>
                <p onClick={() => props.onRouteChange('signin')}className='f4 link dim red pa2 pointer mr2'>Sign in</p>
                <p onClick={() => props.onRouteChange('register')}className='f4 link dim red pa2 pointer mr2'>Register</p>
            </nav>
        )
        
    }
        
    
}

const naviStyle = {
    display: "flex",
    justifyContent:"flex-end"
}

export default Navigation

