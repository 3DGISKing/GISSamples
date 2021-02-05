import React, { Component } from "react";
import { connect } from "react-redux";
import Map from "./Map";
import Sidebar from "./Sidebar"
import * as actions from "../actions/actions";

function mapStateToProps(state) {
  return {
    states: state.data.states,
    counties: state.data.counties,
    loaded: state.data.loaded,
    zoom: state.map.zoom
  };
}

class App extends Component {
  //This is where your initial data comes from
  componentDidMount() {
    this.props.dispatch(actions.getCounties());
    this.props.dispatch(actions.getStates());
    this.props.dispatch(actions.getHistogram("state"));
  }

  render() {
    let app;
    //This is a loading interstitial in case data takes longer than normal to return
    if (!this.props.loaded) {
      app = (
        <img
          src="https://www.dropbox.com/s/2et51rjjh1nhdh0/spinner_210_white.gif?raw=1"
          alt="loading spinner"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            marginTop: "-50px",
            marginLeft: "-100px"
          }}
        />
      );
    } else {
      //This is the regular app interface

      const style = {
          display: "flex"
      };

      app = (
        <div style={style}>
            <Sidebar/>
            <Map
                token="pk.eyJ1IjoiM2RnaXNraW5nIiwiYSI6ImNqcnRidjcxYTA1ZGc0M2xmbTI1ZjZ1eXEifQ.x2e8WXV6bA08gCU3NHVWIA"
                mapStyle="mapbox://styles/mapbox/light-v9"
                states={this.props.states}
                counties={this.props.counties}
            />
        </div>
      );
    }
    return <div>{app}</div>;
  }
}

export default connect(mapStateToProps)(App);
