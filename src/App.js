import React, { Component } from 'react';
import './App.css';
import {connect} from './api';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boxes: Array(64).fill({value: null, disabledState: false}),
      currentPlayer: 'red',
      otherPlayer: 'green',
      currentPlayerPosition: 3,
      otherPlayerPosition: 60
    };
    connect(message => {
      console.log("message on client", message);
    });
  };
  componentWillMount() {
    this.setButtonStates();
  };
  getPlayerMoves() {
    const currentPosition = this.state.currentPlayerPosition;
    let moves = [];
    if (currentPosition % 8 !== 0 && currentPosition % 8 !== 7) { // if not on corners
      moves = [currentPosition+1,currentPosition-1,currentPosition+8,currentPosition-8,currentPosition+7,
        currentPosition-7,currentPosition+9,currentPosition-9];
    } else if (currentPosition % 8 === 0) { // if left cornor
      moves = [currentPosition+1,currentPosition+8,currentPosition-8,currentPosition+9,currentPosition-7];
    } else if (currentPosition % 8 === 7) { // if right cornor
      moves = [currentPosition-1,currentPosition+8,currentPosition-8,currentPosition-9,currentPosition+7];
    };
    return moves.filter(move => move>=0 && move<=63);
  };
  setButtonStates() {
    let boxes = this.state.boxes.slice();
    boxes[this.state.currentPlayerPosition] = { value: this.state.currentPlayer, disabledState: true };
    boxes[this.state.otherPlayerPosition] = { value: this.state.otherPlayer, disabledState: true };
    const playerMoves = this.getPlayerMoves();
    console.log("Player moves", playerMoves, "boxes before", boxes);
    for (let i=0; i < boxes.length; i++) {
      if (!boxes[i].disabledState && playerMoves.indexOf(i) === -1) {
        boxes[i] = { value: boxes[i].value, disabledState: true };
      } else if (!boxes[i].value && playerMoves.indexOf(i) !== -1) {
        boxes[i] = { value: boxes[i].value, disabledState: false };
      };
    };
    console.log("Boxes after", boxes);
    this.setState({boxes: boxes});
  };
  handleClick(boxNumber) {
    let boxes = this.state.boxes.slice();
    boxes[boxNumber] = { value: this.state.currentPlayer, disabledState: true };
    let tempPlayer = this.state.currentPlayer;
    const promise1 = new Promise( (resolve) => {
      this.setState({currentPlayer: this.state.otherPlayer}, () => {
        this.setState({otherPlayer: tempPlayer}, () => {
          console.log("Promise 1", this.state);
          resolve();
        });
      });
    }); 
    const promise2 = new Promise( (resolve) => {
      this.setState({currentPlayerPosition: this.state.otherPlayerPosition}, () => {
        this.setState({otherPlayerPosition: boxNumber}, () => {
          console.log("Promise 2", this.state);
          resolve();
        });
      });
    });
    const promise3 = new Promise( (resolve) => {
      this.setState({boxes: boxes}, () => {
        console.log("Promise 3", this.state);
        resolve();
      });
    });
    Promise.all([promise1, promise2, promise3])
    .then( values => {
      console.log("Promise all", values, this.state);
      this.setButtonStates();
    })
    .catch( err => {
      console.log("Error resolving promises", err);
    });
     
  };
  renderBoxes(boxNumber) {
    return(<Box key={boxNumber} value={this.state.boxes[boxNumber]}
      currentPlayerPosition={this.state.currentPlayerPosition}
      otherPlayerPosition={this.state.otherPlayerPosition}
      index={boxNumber}
      onClick={() => this.handleClick(boxNumber)} />);  
  };
  renderBoard() {
    let board = [];
    for (let i = 0; i < 64; i++) {
      if (i % 8 === 0) {
        board.push(<br key={[i, "-endline"].join('')}></br>);
      };
      board.push(this.renderBoxes(i));
    };
    return board;
  };
  render() {
    return (
      <div className="container">
        <p> Next move {this.state.currentPlayer} </p>
        {this.renderBoard()}
      </div>
    );
  };
};

class Box extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     value: null
  //   };
  // };
  render() {
    return (
      <button disabled={this.props.value.disabledState} className={[this.props.value.value, "box"].join(' ')}
       onClick={() => this.props.onClick()}>
        {this.props.currentPlayerPosition === this.props.index || this.props.otherPlayerPosition === this.props.index 
          ? this.props.value.value.charAt(0)
          : ''}
      </button>
    );
  }
};

export default Board;
