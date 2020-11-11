import React from 'react'

const Logo = () => {
    return(
        <div style={logoStyle}>
            <h4 style = {h4Style} >👧👦👶👽</h4>
        </div>
    )
}

const logoStyle = {
    display:'flex',
    justifyContent:'center',
    margin:'4px',
    marginTop:0,
    marginBottom:0
   
}

const h4Style = {
    fontSize:"2rem",
    
}
export default Logo

