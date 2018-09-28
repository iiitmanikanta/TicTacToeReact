import React, { Component } from 'react'
import { observer } from 'mobx-react'
import Square from '../../components/Square'
import GridOptions from '../../components/GridOptions'
import {
  PLAYER_O,
  PLAYER_X,
  DEFAULT_GRID_SIZE
} from '../../constants/AppConstants'
import { getGridArray, winningCombinations } from '../../utils/AppUtils'
import {
  GameBoard,
  GameStatus,
  ResetButton,
  MainContainer
} from './styledComponents'

@observer
class Home extends Component {
  componentWillMount = () => {
    this.resetGameData()
  }

  resetGameData = (gridSize = DEFAULT_GRID_SIZE) => {
    this.setState({
      gridSize: gridSize,
      isGameCompleted: false,
      isGameDraw: false,
      board: getGridArray(gridSize),
      currentUser: PLAYER_X
    })
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
    const { board, gridSize } = this.state
    const possibleWinningCombinations = winningCombinations(gridSize)
    return possibleWinningCombinations.find(combination => {
      let count = 0
      if (board[combination[0]] !== '') {
        count++
        for (let i = 1; i < gridSize; i++) {
          if (board[combination[0]] === board[combination[i]]) {
            count++
          }
        }
      }

      if (count === gridSize) {
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
  handleChange = event => {
    const gridSize = Number(event.target.value)
    this.resetGameData(gridSize)
  }
  render() {
    const { currentUser, isGameCompleted, isGameDraw, gridSize } = this.state
    return (
      <MainContainer>
        <GridOptions handleChange={this.handleChange} gridSize={gridSize} />
        <GameBoard isGameCompleted={isGameCompleted} gridSize={gridSize}>
          {this.showGameBoard()}
        </GameBoard>
        <GameStatus>
          {isGameCompleted
            ? `Player - ${currentUser} Won the game`
            : isGameDraw
              ? `Game is Draw`
              : `It's turn for Player - ${currentUser}`}
          <br />
          {isGameCompleted || isGameDraw ? (
            <ResetButton onClick={() => this.resetGameData()}>
              Start New Game
            </ResetButton>
          ) : null}
        </GameStatus>
      </MainContainer>
    )
  }
}

export default Home
