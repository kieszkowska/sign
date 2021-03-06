import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.css';

export default class ReactSign extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    strokeStyle: PropTypes.string,
    lineWith: PropTypes.number,
  }

  static defaultProps = {
    width: 300,
    height: 100,
    strokeStyle: "rgb(13, 71, 161)",
    lineWith: 2,
  }

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
    };
    this.canvas = React.createRef();

    this.handleStart = this.handleStart.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.renderCanvas = this.renderCanvas.bind(this);
    this.start = this.start.bind(this);
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      ctx: this.canvas.current.getContext('2d'),
    }, () => {
      this.clearCanvas();
      this.start();
    });
  }

  clearCanvas() {
    // noinspection SillyAssignmentJS
    this.canvas.current.width = this.canvas.current.width;
    this.state.ctx.strokeStyle = this.props.strokeStyle;
    this.state.ctx.lineWidth = this.props.lineWith;
  }

  handleStart(e) {
    this.setState({
      ...this.state,
      drawing: true,
      lastPos: this.getPos(e),
      mousePos: this.getPos(e),
    });
  }

  handleMove(e) {
    this.setState({
      ...this.state,
      mousePos: this.getPos(e),
    });
  }

  handleStop(e) {
    this.setState({
      ...this.state,
      drawing: false,
      lastPos: this.getPos(e),
    });
  }

  getPos(event) {
    let rect = this.canvas.current.getBoundingClientRect();
    let x = event.touches && event.touches[0] ? event.touches[0].clientX : event.clientX;
    let y = event.touches && event.touches[0] ? event.touches[0].clientY : event.clientY;

    return {
      x: x - rect.left,
      y: y - rect.top,
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
      <canvas id="react-sign-canvas"
              ref={this.canvas}
              onMouseDown={this.handleStart}
              onMouseMove={this.handleMove}
              onMouseUp={this.handleStop}
              onTouchStart={this.handleStart}
              onTouchMove={this.handleMove}
              onTouchEnd={this.handleStop}
              width={this.props.width}
              height={this.props.height}
      />
    )
  }
}
