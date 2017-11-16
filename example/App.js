import React, { Component } from 'react';
import {Yellow, Red, Dark} from './Block'
import './App.css';
import Minimap, {Child as ChildComponent} from 'react-minimap';
import 'react-minimap.css'

/*eslint-disable */
const COMMIT_HASH = __COMMIT_HASH__
/*eslint-enable */


const YELLOW = 'yellow'
const RED    = 'red'
const DARK   = 'dark'

const HEX = {
  [YELLOW]: 'FFAB00', 
  [RED]   : 'DD2C00',
  [DARK]  : '212121',
}

class App extends Component {

  state = {
    checked: false,
    random1: {left: '10px', top: '10px'},
    random2: {left: '1000px', top: '100px'},
    random3: {left: '350px', top: '50px'},
  }

  random(max) {
    return Math.round(Math.random() * max)
  }

  componentDidMount() {

    setInterval(() => {
      this.setState({
        ...this.state,
        random1: {left: this.random(3000), top: this.random(100)},
        random2: {left: this.random(3000), top: this.random(100)},
        random3: {left: this.random(3000), top: this.random(100)},
      })
    }, 2000)
  }

  renderChild({ width, height, left, top, node }) {

    const classNames = [YELLOW, RED, DARK]
    let classNameFound = null

    node.classList.forEach(className => {
      if (classNames.includes(className))
      {
        classNameFound = className
        return false
      }
    })

    if (classNameFound === null)
      return <ChildComponent {...{width, height, left, top}} />

    return (
      <div
        style={{
          position: 'absolute',
          width,
          height,
          left,
          top,
          backgroundColor: '#' + HEX[classNameFound],
        }}
      />
    )
  }

  render() {
    const {random1, random2, random3} = this.state

    return (
      <div className="App">
        <div className="nav-bar">
          <span><a href="https://github.com/jeremy-carbonne/react-minimap">Github react-minimap</a></span>
          <div className="keep-aspect-ratio">
            keep aspect ratio
            <input 
              type="checkbox" 
              checked={this.state.checked} 
              onChange={(event) => {
                this.setState({...this.state, checked: event.target.checked})}} 
            />
          </div> 
        </div>
        <div className="container">

          <Minimap identifier=".box" keepAspectRatio={this.state.checked} childComponent={this.renderChild.bind(this)}>
            <Dark />
            <Yellow className="pos-rlt" style={random1}/>
            <Red className="pos-rlt" style={{width: "200px", left: '4000px', top: '100px'}}/>
            <Yellow className="pos-rlt" style={random2} />
            <Dark className="pos-rlt" style={random3} />
            <Yellow className="pos-rlt" style={{width: "200px", left: '2000px'}} />
            <Dark className="pos-rlt" style={{width: "200px", left: '2000px', marginTop: "30px" }}/>

            <Yellow />
            <Dark />
            <Yellow />
          </Minimap>
        </div>
        <div className="commit-hash">{COMMIT_HASH}</div>
      </div>
    );
  }
}

export default App;
