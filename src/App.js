import React, { Component } from 'react';
import './App.css';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boxes: Array(64).fill({value: null, disabledState: false}),
      currentPlayer: null,
      currentPlayerPosition: null,
      otherPlayerPosition: null
    };
  };
  componentWillMount() {
    this.setState({currentPlayer: 'red', currentPlayerPosition: 3, otherPlayerPosition: 60}, () => {
      this.setButtonStates();
    });
  };
  getPlayerMoves() {
    const currentPosition = this.state.currentPlayerPosition;
    let moves = [currentPosition+1,currentPosition-1,currentPosition+8,currentPosition-8,currentPosition+7,
      currentPosition-7,currentPosition+9,currentPosition-9];
    return moves.filter(move => move>=0 && move<=63);
  };
  setButtonStates() {
    let boxes = this.state.boxes.slice();
    const playerMoves = this.getPlayerMoves();
    console.log("Player moves", playerMoves);
    for (let i=0; i < boxes.length; i++) {
      if (!boxes[i].disabledState && playerMoves.indexOf(i) === -1) {
        boxes[i] = { value: null, disabledState: true };
      };
    };
    this.setState({boxes: boxes});
  };
  handleClick(boxNumber) {
    let boxes = this.state.boxes.slice();
    boxes[boxNumber] = { value: this.state.currentPlayer, disabledState: true };
    this.state.currentPlayer === 'red'
     ? this.setState({currentPlayer: 'green'})
     : this.setState({currentPlayer: 'red'});
    this.setState({boxes: boxes}); 
  };
  renderBoxes(boxNumber) {
    return(<Box key={boxNumber} value={this.state.boxes[boxNumber]}
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
        {this.props.value.value}
      </button>
    );
  }
};

export default Board;
