import React, { Component } from 'react';

import './styles.css';

export default class ExampleComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ctx: null,
      drawing: false,
      mousePos: {
        x: 0,
        y: 0,
      },
      lastPos: {
        x: 0,
        y: 0,
      },
    }
    this.canvas = React.createRef();

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.renderCanvas = this.renderCanvas.bind(this);
    this.start = this.start.bind(this);
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      ctx: this.canvas.current.getContext('2d'),
    });
    this.clearCanvas();
    this.start();
  }

  clearCanvas() {
    // noinspection SillyAssignmentJS
    this.canvas.current.width = this.canvas.current.width;
  }

  handleMouseDown(e) {
    this.setState({
      ...this.state,
      drawing: true,
      lastPos: this.getMousePos(e),
    });
  }

  handleMouseUp(e) {
    this.setState({
      ...this.state,
      drawing: false,
      lastPos: this.getMousePos(e),
    });
  }

  handleMouseMove(e) {
    this.setState({
      ...this.state,
      mousePos: this.getMousePos(e),
    })
  }

  getMousePos(mouseEvent) {
    let rect = this.canvas.current.getBoundingClientRect();
    return {
      x: mouseEvent.clientX - rect.left,
      y: mouseEvent.clientY - rect.top
    };
  }

  renderCanvas() {
    if (this.state.drawing) {
      this.state.ctx.moveTo(this.state.lastPos.x, this.state.lastPos.y);
      this.state.ctx.lineTo(this.state.mousePos.x, this.state.mousePos.y);
      this.state.ctx.stroke();
      this.setState({
        ...this.state,
        lastPos: this.state.mousePos,
      });
    }
  }

  start() {
    requestAnimationFrame(this.start);
    this.renderCanvas();
  }

  render() {
    return (
      <canvas ref={this.canvas} onMouseDown={this.handleMouseDown} onMouseMove={this.handleMouseMove} onMouseUp={this.handleMouseUp}/>
    )
  }
}
