import React, { Component } from 'react';
import { connect } from 'react-redux';
import './controller.css';
import Dropdown from 'react-dropdown';

class Controller extends Component{

  constructor(){
    super();
    this.state = {beats: '4', bpm: '100'};
  }

  selectBeats(val){
    this.setState({beats: val.value});
    this.props.changeBeats(val.value);
  }

  selectBPM(event){
    this.setState({bpm: event.target.value});
    this.props.changeBPM(event.target.value);
  }

  countBPM(action){
    if(action === "add"){
      this.setState({bpm: parseInt(this.state.bpm) + 1});
      this.props.changeBPM(parseInt(this.state.bpm) + 1);
    }else if(action === "delete"){
      this.setState({bpm: parseInt(this.state.bpm) - 1});
      this.props.changeBPM(parseInt(this.state.bpm) - 1);
    }
  }

  closeController(){
    document.getElementsByClassName("controller")[0].className = "controller inactive";
  }

  render(){
    const options = [
      {value: '2', label: '2'},
      {value: '3', label: '3'},
      {value: '4', label: '4'},
      {value: '5', label: '5'},
      {value: '6', label: '6'},
      {value: '7', label: '7'},
      {value: '8', label: '8'}
    ];
    return <div className="controller inactive">
      <div className="title">
        <span className="yellow">METRO</span>
        <span className="grey">NOME</span>
        <span className="close" onClick={this.closeController.bind(this)}></span>
      </div>
      <hr className="title-hr"/>
      <div className="dropdown-div">
        <Dropdown
          value = {this.state.beats}
          options = {options}
          onChange = {this.selectBeats.bind(this)}
        />
        <span>Beats in a Measure</span>
      </div>
      <div className="slider-div">
        <div className="button">
          <button onClick={()=>{this.countBPM("delete")}}>-</button>
          <input type="range" min="40" max="218" value={this.state.bpm} className="slider" onChange={(event)=>{this.selectBPM(event)}}/>
          <button onClick={()=>{this.countBPM("add")}}>+</button>
        </div>
        <div className="span-div">
          <span className="yellow">{this.state.bpm}</span>
          <span className="grey">Beats per minute (BPM)</span>
        </div>
      </div>
    </div>
  }
}


const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeBeats: (value) => {
      dispatch({
        type: "CHANGEBEATS",
        content: value
      });
    },
    changeBPM: (value) => {
      dispatch({
        type: "CHANGEBPM",
        content: value
      });
    }
  }
}

Controller = connect(mapStateToProps, mapDispatchToProps)(Controller);

export default Controller;
