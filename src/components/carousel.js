import React, { Component } from "react";
import { Container } from "react-bootstrap";

class Carousel extends Component {
  render(){
      return <div className={this.props.active} >
      <img className="d-block w-100"   id={this.props.id} src={`${this.props.image}?${new Date().getTime()}`}  width="100" height="300"/>
      </div>
      
  }
}

export default Carousel;
