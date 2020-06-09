import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import CanvasJSReact from './assets/canvasjs.react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Websocket from 'react-websocket';


var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var dataPoints = [];
var counter = 0;


class App extends Component {
    constructor() {
        super();
        this.handleData = this.handleData.bind(this);
    }

    handleData(data) {
        dataPoints.push({ x: counter, y: parseFloat(data)});
        counter++;
        this.chart.render();
    }
    sendMessage(message){
        this.refWebSocket.sendMessage(message);
    }
  render() {
      const options = {
          animationEnabled: true,
          theme: "light2", // "light1", "dark1", "dark2"
          data: [{
              type: "line",
              dataPoints: dataPoints
          }]
      }
    return (
        <div>
            <Button onClick={() => this.sendMessage("start")}  variant="success">Start</Button>
            <Websocket
                url='ws://localhost:8000/ws/'
                reconnect={true}
                onMessage={this.handleData.bind(this)}
                ref={Websocket => { this.refWebSocket = Websocket;}}
            />
            <CanvasJSChart onRef={ref => this.chart = ref} options = {options}/>
        </div>
    );
  }
}

export default App;
