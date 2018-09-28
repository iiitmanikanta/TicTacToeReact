import React, { Component } from 'react'
import { observer } from 'mobx-react'
import {
  PLAYER_O,
  PLAYER_X,
  winningCombinations
} from '../../constants/AppConstants'

@observer
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isGameCompleted: false,
      board: ['', '', '', '', '', '', '', '', ''],
      currentUser: PLAYER_X
    }
  }

  onSquareClick = squarePosition => {
    const { board, currentUser } = this.state
    if (board[squarePosition] === '') {
      board[squarePosition] = currentUser
      const isGameCompleted = this.checkTheGameResult()
      this.setState({
        board,
        isGameCompleted,
        currentUser: currentUser === PLAYER_O ? PLAYER_X : PLAYER_O
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

  render() {
    const { currentUser } = this.state
    console.log('this.state', this.state)
    return (
      <div>
        Hello World - {currentUser}
        <br />
        <button onClick={() => this.onSquareClick(2)}> Testing </button>
      </div>
    )
  }
}

export default Home
