import React, { Component } from 'react'
import Navigation from './components/Navigation'
import Logo from './components/Logo'
import ImageLink from './components/ImageLink'
import FaceDetection from './components/FaceDetection'
import SignIn from './components/SignIn'
import Register from './components/Register'
import Particles from 'react-particles-js';
import { store } from 'react-notifications-component';
import 'tachyons'


const particleOptions = {
  particles: {
    number: {
        value: 160,
        density: {
            enable: false
        }
    },
    size: {
        value: 3,
        random: true,
        anim: {
            speed: 4,
            size_min: 0.3
        }
    },
    line_linked: {
        enable: false
    },
    move: {
        random: true,
        speed: 1,
        direction: "top",
        out_mode: "out"
    }
},
interactivity: {
    events: {
        onhover: {
            enable: true,
            mode: "bubble"
        },
        onclick: {
            enable: true,
            mode: "repulse"
        }
    },
    modes: {
        bubble: {
            distance: 200,
            duration: 2,
            size: 5,
            opacity: 0
        },
        repulse: {
            distance: 400,
            duration: 4
        }
    }
}
}

const initialState = {
  input: '',
  imageurl:'',
  box:{},
  route: 'signin',
  isLoggedin: false,
  user:{
    id:'',
    name:'',
    email:'',
    entries:0,
    joined:''
}}


class App extends Component {
  constructor(){
    super()
    this.state = initialState
    }


   
  
  //to see the server is working
  /*componentDidMount(){
    fetch('http://localhost:3005/')
    .then(response => response.json())
    .then(console.log)
  }

  */

  loadUser = (data) => {
    this.setState(
      {user:{
      id:data.id,
      name:data.name,
      email:data.email,
      entries:data.entries,
      joined:data.joined
    },
      imageurl: '',
      input: ''
  })
}

  onInputChange = (event) => {
    this.setState({input: event.target.value}) 
  }
   
  onInputSubmit = (event) => {
      this.setState({imageurl: this.state.input})
      
      //take the api
      // Promise.all([
      //   fetch('http://localhost:3005/image'),
      //   fetch('http://localhost:3005/image')
      // ])
      // .then(responses => {
      //     Promise.all(responses.map(response => {response.json()}))
      // })
      // .then( data => console.log(data))
      // .catch(error => console.log(error))
      fetch('https://face-detector-test.herokuapp.com/image',{
        method:'post',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          imageUrl:this.state.input
        })
      })
      .then(response => response.json())
      .then( data => {
        this.displayFacebox(this.calculateFaceLocations(data))
        if (data.data.regions.length !== 0){
          fetch('https://face-detector-test.herokuapp.com/image',{
              method:'put',
              headers:{'Content-Type':'application/json'},
              body: JSON.stringify({
                id:this.state.user.id
              })
              
            })
            .then(response => response.json())
            .then(data => this.setState(Object.assign(this.state.user, {entries:data})))
            .catch(error => console.log(error))
        }
      })
      .catch(error => console.log(error))
      
      
  }
  calculateFaceLocations = (data)=> {
    //console.log(data)
    if(data.data.regions.length !== 0){
      const bounding_data = data.data.regions[0].region_info.bounding_box
      //console.log(data.data.regions[0].region_info.bounding_box)
  
      const image = document.getElementById('input_image')
      const width = Number(image.width)
      const height = Number(image.height)
  
      return {
        leftCol:bounding_data.left_col*width,
        topRow:bounding_data.top_row*height,
        rightCol:width - (bounding_data.right_col*width),
        bottomRow:height - (bounding_data.bottom_row*height)
      }
    }else{
      store.addNotification({
        title: "No face detected",
        message: "there is no face in the image",
        type: "warning",
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

  displayFacebox = (box) => {
    if (box){
      this.setState({box:box})
    }else{
      this.setState({box:{}})
    }
  }

  onRouteChange = (route) => {
    if(route === 'home'){
      this.setState({isLoggedin:true})
    }else if (route === 'signin'){
      this.setState(initialState)
    }
    this.setState({route: route})
  
  }

  

  render() {
    return (
      <div>
        <Particles className='particles' params={particleOptions} />
        <Navigation isLoggedin={this.state.isLoggedin} onRouteChange ={this.onRouteChange}/>
        {this.state.route === 'home'
          ?<React.Fragment>
            <Logo/>
            <ImageLink input = {this.state.input} entries={this.state.user.entries} user={this.state.user.name} onInputChange={this.onInputChange}  onInputSubmit={this.onInputSubmit}/>
            <FaceDetection box={this.state.box} imageurl= {this.state.imageurl}/>
          </React.Fragment>
            
          :(this.state.route === 'signin'
            ?<SignIn loadUser={this.loadUser}  onRouteChange = {this.onRouteChange}/>
            :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>)
            

        }
        
        
      </div>
    )
  }
}

export default App;
