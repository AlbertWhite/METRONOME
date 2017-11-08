import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './App.css';
import Viewer from './viewer/viewer.js';
import Controller from './controller/controller.js';
import 'font-awesome/css/font-awesome.min.css';

const reducer = (state={bpm: 100, beats: 4}, action) => {
  switch(action.type){
    case "CHANGEBEATS":
      return {...state, beats: action.content}
    case "CHANGEBPM":
      return {...state, bpm: action.content}
    default:
      return state;
  }
}

const store = createStore(reducer);

class App extends Component {

  showController(){
    document.getElementsByClassName("controller")[0].className = "controller";
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <i className="fa fa-cog" aria-hidden="true" onClick={this.showController.bind(this)}></i>
          <Viewer></Viewer>
          <Controller></Controller>
        </div>
      </Provider>
    );
  }
}


export default App;
