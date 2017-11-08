import React, { Component } from 'react';
import { connect } from 'react-redux';
import './viewer.css';

class Viewer extends Component {

  constructor(props){
    super(props);
    this.state = {intervalId: ''};
  }

  componentWillReceiveProps(){
    let index = 0;

    clearInterval(this.state.intervalId);
    let intervalId = setInterval(() => {
      for(let i = 0;i < document.getElementsByClassName("beatColumn").length;i++){
        document.getElementsByClassName("beatColumn")[i].className="beatColumn";
      }
      document.getElementsByClassName("beatColumn")[index].className="beatColumn active";
      index = (index + 1)%(this.props.beats);

    },
    60000/this.props.bpm);

    this.setState({intervalId: intervalId});

  }

  componentDidUpdate(){
    let beats = this.props.beats;
    for(let i = 0;i < document.getElementsByClassName("beatColumn").length;i++){
      document.getElementsByClassName("beatColumn")[i].style.width = 1/beats*100 - 0.2 + "%";
    }
  }

  componentDidMount(){
    let index = 0;
    let beats = this.props.beats;

    clearInterval(this.state.intervalId);
    let intervalId = setInterval(() => {
      for(let i = 0;i < document.getElementsByClassName("beatColumn").length;i++){
        document.getElementsByClassName("beatColumn")[i].className="beatColumn";
        document.getElementsByClassName("beatColumn")[i].style.width = 1/beats*100 - 0.2 + "%";
      }
      document.getElementsByClassName("beatColumn")[index].className="beatColumn active";
      index = (index + 1)%(this.props.beats);

    },
    60000/this.props.bpm);

    this.setState({intervalId: intervalId});
  }

  closeController(){
    document.getElementsByClassName("controller")[0].className = "controller inactive";
  }

  render(){

    const beats = this.props.beats;
    const beatColumns = [];

    for(let i = 0;i < beats;i++){
      beatColumns.push(<div className="beatColumn" key={i}></div>);
    }

    return (
      <div className="viewer" onClick={this.closeController.bind(this)}>
        {beatColumns}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    beats: state.beats,
    bpm: state.bpm
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

Viewer = connect(mapStateToProps, mapDispatchToProps)(Viewer);

export default Viewer;
