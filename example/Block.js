import React, { Component } from 'react';


export class Dark extends Component {
  render() {
    console.log("render Dark")
    return (
      <div className="card" style={this.props.style}>
        <div className="box card-front">
          <h2>Dark</h2>
        </div>
      </div>
    );
  }
}

export class Red extends Component {
  render() {
    console.log("render Red")
    return (
      <div style={this.props.style}>
        <div className="box red">
          <h2>Red</h2>
          <Dark />
        </div>
      </div>
    );
  }
}

export class Yellow extends Component {
  render() {
    console.log("render Yellow")
    return (
      <div style={this.props.style}>
        <div className="box yellow">
          <h2>Yellow</h2>
        </div>
      </div>
    );
  }
}