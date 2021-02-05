import React, { Component } from "react";
//Slider Library
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
//Chart Library
import {
  VictoryChart,
  VictoryArea,
  VictoryLine,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel,
  VictoryBrushContainer
} from "victory";
//Redux
import { connect } from "react-redux";
import * as actions from "../actions/actions";

function mapStateToProps(state) {
  return {
    states: state.data.stateTime,
    counties: state.data.countyTime,
    histogram: state.data.histogram,
    stateTitle: state.data.stateTitle,
    countyTitle: state.data.countyTitle,
    zoom: state.map.zoom
  };
}

class Graph extends Component {
  //This is internal component state for the Slider
  state = {
    domain: { x: [2014, 2015] }
  };

  render() {
    return (
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", height: "28vh", padding: 10 }}>

        {/*This is typical composition for Victory charts. Chart > Axis, Axis > Chart Type*/}
        <div style={{margin: "5px", backgroundColor: "#eee", maxWidth: "25%"}}>
            <VictoryChart
              theme = {VictoryTheme.material}
              domainPadding = {10}
              style={{
                labels: { fontSize: 12 },
                parent: {
                  height: "100%",
                  padding: 0,
                  borderBottom: "1px solid #ccc"
                }
              }}
              animate={{
                duration: 1000,
                onLoad: { duration: 1000 }
              }}
            >

              <VictoryArea
                data={this.props.histogram}
                interpolation="natural"
                style={{ data: { fill: "black", opacity: 0.5 } }}
              />
            </VictoryChart>
        </div>

        <div style={{margin: "5px", backgroundColor: "#eee", maxWidth: "25%"}}>
            <VictoryChart
              theme = {VictoryTheme.material}
              domainPadding = {10}
              style={{
                  labels: { fontSize: 12 },
                  parent: {

                      padding: 0,
                      borderBottom: "1px solid #ccc"
                  }
              }}
              animate={{
                  duration: 1000,
                  onLoad: { duration: 1000 }
              }}
            >

              <VictoryArea
                  data={this.props.histogram}
                  interpolation="natural"
                  style={{ data: { fill: "black", opacity: 0.5 } }}
              />
            </VictoryChart>
        </div>

        <div style={{margin: "5px", backgroundColor: "#eee", maxWidth: "25%"}}>
          <VictoryChart
              theme = {VictoryTheme.material}
              domainPadding = {10}
              style={{
                  labels: { fontSize: 12 },
                  parent: {
                      height: "100%",
                      padding: 0,
                      borderBottom: "1px solid #ccc"
                  }
              }}
              animate={{
                  duration: 1000,
                  onLoad: { duration: 1000 }
              }}
          >

              <VictoryArea
                  data={this.props.histogram}
                  interpolation="natural"
                  style={{ data: { fill: "black", opacity: 0.5 } }}
              />
          </VictoryChart>
        </div>

        <div style={{flex: "1"}}></div>

      </div>
    );
  }
}

export default connect(mapStateToProps)(Graph);
