import React, { Component } from 'react'
import { store } from 'react-notifications-component';



export default class SignIn extends Component{
  constructor(props){
    super(props);
    this.state= {
      signInEmail :'',
      signInPassword:''
    }
  } 

  onEmailChange = (event) => {
    this.setState({signInEmail:event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword:event.target.value})
  }

  onSubmitSignIn = () => {

    if (this.state.signInEmail && this.state.signInPassword)
    {
      fetch('https://face-detector-test.herokuapp.com/signin',{
        method : 'post',
        headers : {'Content-type': 'application/json'},
        body : JSON.stringify({
          email:this.state.signInEmail,
          password:this.state.signInPassword
        })
      })
      .then(response => response.json())
      .then(user => {
        console.log(user)
        if(user.id){
          this.props.loadUser(user)
          this.props.onRouteChange('home')
        }else{
          store.addNotification({
            title: "Error",
            message: "no matching user credentials",
            type: "danger",
            insert: "top",
            container: "bottom-center",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true
            }
          });
        }
      })
    }else{
        store.addNotification({
          title: "Error",
          message: "can not leave the feilds empty",
          type: "danger",
          insert: "top",
          container: "bottom-center",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });
      }
    

    
  }

  render(){
    const {onRouteChange} = this.props
    return (

      <main className="pa4 black-80">
          <div className="measure center">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0 ">
              <legend className="f4 fw6 ph0 mh0 green">Sign In </legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6 green br4" htmlFor="email-address">Email</label>
                <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 br3" type="email" name="email-address"  id="email-address"/>
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6 green br4" htmlFor="password">Password</label>
                <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 br3" type="password" name="password"  id="password"/>
              </div>
              
            </fieldset>
            <div className="">
              <input onClick={this.onSubmitSignIn} className="b ph3 pv2 input-reset ba b--black bg-red dim grow pointer f6 dib br3" type="submit" value="Sign in"/>
            </div>
            <div className="lh-copy mt3">
              <p onClick={()=> onRouteChange('register')} className="f6 link dim green db">Register</p>
              
            </div>
          </div>
        </main>
      )
  }
    
}
