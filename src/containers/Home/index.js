import React, { Component } from 'react'
import { observer } from 'mobx-react'
import Square from '../../components/Square'
import {
  PLAYER_O,
  PLAYER_X,
  winningCombinations
} from '../../constants/AppConstants'
import { GameBoard, Description } from './styledComponents'

@observer
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isGameCompleted: false,
      isGameDraw: false,
      board: ['', '', '', '', '', '', '', '', ''],
      currentUser: PLAYER_X
    }
  }

  onSquareClick = squarePosition => {
    const { board, currentUser, isGameCompleted } = this.state
    if (board[squarePosition] === '' && !isGameCompleted) {
      board[squarePosition] = currentUser
      const isGameCompleted = this.checkTheGameResult()
      let isGameDraw = false
      let nextTurnUser = currentUser
      if (!isGameCompleted) {
        isGameDraw = board.findIndex(element => element === '') === -1
        nextTurnUser = currentUser === PLAYER_O ? PLAYER_X : PLAYER_O
      }
      this.setState({
        board,
        isGameCompleted,
        isGameDraw,
        currentUser: nextTurnUser
      })
    }
  }

  checkTheGameResult = () => {
    const { board } = this.state
    return winningCombinations.find(combination => {
      if (
        board[combination[0]] !== '' &&
        board[combination[0]] === board[combination[1]] &&
        board[combination[0]] === board[combination[2]]
      ) {
        return true
      } else {
        return false
      }
    })
  }
  showGameBoard = () => {
    const { board } = this.state
    return board.map((value, index) => {
      return (
        <Square
          value={value}
          key={index}
          position={index}
          onSquareClick={this.onSquareClick}
        />
      )
    })
  }
  render() {
    const { currentUser, isGameCompleted, isGameDraw } = this.state
    console.log('this.state', this.state)
    return (
      <div>
        <GameBoard isGameCompleted={isGameCompleted}>
          {this.showGameBoard()}
        </GameBoard>
        <Description>
          {isGameCompleted
            ? `You Won the game - ${currentUser}`
            : isGameDraw
              ? `Game is Draw`
              : `It's turn for Player - ${currentUser}`}
        </Description>
      </div>
    )
  }
}

export default Home
