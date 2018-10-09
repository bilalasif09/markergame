import React, { Component } from 'react';
import './App.css';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boxes: Array(64).fill(null),
      player: 'red'
    };
  };
  handleClick(boxNumber) {
    console.log("Click", boxNumber);
    const boxes = this.state.boxes.slice();
    boxes[boxNumber] = this.state.player;
    this.state.player === 'red' ? this.setState({player: 'green'}) : this.setState({player: 'red'});
    // this.setState({player: !this.state.player});
    this.setState({boxes: boxes}); 
  };
  renderSquares(boxNumber) {
    return(<Box key={boxNumber} value={this.state.boxes[boxNumber]} onClick={() => this.handleClick(boxNumber)} />);  
  };
  renderBoard() {
    let board = [];
    for (let i = 0; i < 64; i++) {
      if (i % 8 === 0) {
        board.push(<br></br>);
      };
      board.push(this.renderSquares(i));
    };
    return board;
  };
  render() {
    return (
      <div className="container">
        <p> Next move {this.state.player} </p>
        {this.renderBoard()}
      </div>
    );
  };
};

class Box extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null
    };
  };
  render() {
    return (
      <button className={[this.props.value, "box"].join(' ')} onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
};

export default Board;
