import React, { Component } from 'react';
import {Yellow, Red, Dark} from './Block'
import './App.css';
import Minimap from 'react-minimap';




class App extends Component {

  state = {
    random1: {left: '10px', top: '10px'},
    random2: {left: '1000px', top: '100px'},
    random3: {left: '350px', top: '50px'},
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        ...this.state,
        random1: {left: Math.round(Math.random() * 3000), top: Math.round(Math.random() * 100)},
        random2: {left: Math.round(Math.random() * 3000), top: Math.round(Math.random() * 100)},
        random3: {left: Math.round(Math.random() * 3000), top: Math.round(Math.random() * 100)},
      })
    }, 2000)
  }

  render() {
    const {random1, random2, random3} = this.state
    return (
      <div className="App">
        <div className="nav-bar">
          Nav bar
        </div>
        <div id="container" style={{height: "calc(100vh - 60px)", position:"absolute", width: "100vw", backgroundColor: "gainsboro"}}>

          <Minimap selector=".box">
            <Dark />
            <Yellow style={{position:'relative', ...random1}}/>
            <Red style={{position:'relative', width: "200px", left: '4000px', top: '100px'}}/>
            <Yellow style={{position:'relative',...random2}} />
            <Dark style={{position:'relative', ...random3}} />
            <Yellow style={{position:'relative', width: "200px", left: '2000px'}} />
            <Dark style={{position:'relative', width: "200px", left: '2000px', marginTop: "30px" }}/>

            <Yellow />
            <Dark />
            <Yellow />
          </Minimap>
        </div>
      </div>
    );
  }
}

export default App;
