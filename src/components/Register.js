import React, { Component } from 'react'
import { store } from 'react-notifications-component';

export default class Register extends Component {

  

  constructor(props){
    super(props)
    this.state = {
      signInEmail :'',
      signInPassword:'',
      signInName:''
      
    }
  }

  

  onEmailChange = (event) => {
    this.setState({signInEmail:event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword:event.target.value})
  }

  onNameChange = (event) => {
    this.setState({signInName:event.target.value})
  }

  onSubmitRegister = () => {
    if(this.state.signInEmail && this.state.signInPassword)
    {
      fetch('https://face-detector-test.herokuapp.com/register',{
        method:'post',
        headers:{'Content-type':'application/json'},
        body:JSON.stringify({
          name:this.state.signInName,
          email:this.state.signInEmail,
          password:this.state.signInPassword,
        })
      })
      .then(response => response.json())
      .then(user => {
        //console.log(user)
        if(user.id){
          this.props.loadUser(user)
          this.props.onRouteChange('home')
          
        }else{
          store.addNotification({
            title: "Error",
            message: "email already exists",
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
      return (

        <main className="pa4 black-80 ">
            <div className="measure center">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f4 fw6 ph0 mh0 green">Register </legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6 green" htmlFor="email-address">Name</label>
                  <input focused required onChange={this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 br3" type="text" name="name"  id="name"/>
                </div>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6 green" htmlFor="email-address">Email</label>
                  <input required  onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 br3" type="email" name="email-address"  id="email-address"/>
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6 green" htmlFor="password">Password</label>
                  <input  required onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 br3" type="password" name="password"  id="password"/>
                </div>
                
              </fieldset>
              <div className="">
                <input onClick={this.onSubmitRegister} className="b ph3 pv2 input-reset ba b--black bg-red grow dim pointer f6 dib br3" type="submit" value="Create"/>
              </div>
              <div className="lh-copy mt3">
                
                
              </div>
            </div>
          </main>
        )
    }
    
}
