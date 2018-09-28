import React, { Component } from 'react'
import { observer } from 'mobx-react'
import Square from '../../components/Square'
import GridOptions from '../../components/GridOptions'
import {
  PLAYER_O,
  PLAYER_X,
  DEFAULT_GRID_SIZE
} from '../../constants/AppConstants'
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

  getGridArray = gridSize => {
    const noOfBlocks = gridSize * gridSize
    const grid = []
    for (let i = 0; i < noOfBlocks; i++) {
      grid.push('')
    }
    return grid
  }

  resetGameData = (gridSize = DEFAULT_GRID_SIZE) => {
    this.setState({
      gridSize: gridSize,
      isGameCompleted: false,
      isGameDraw: false,
      board: this.getGridArray(gridSize),
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
  winningCombinations = gridSize => {
    const positions = []
    let count = 0
    let temp = []
    for (let i = 1; i <= gridSize * gridSize; i++) {
      temp.push(count)
      if (i % gridSize === 0) {
        positions.push(temp)
        temp = []
      }
      count++
    }

    const combinations = []
    // for rows
    for (let i = 0; i < gridSize; i++) {
      let combination = []
      for (let j = 0; j < gridSize; j++) {
        combination.push(positions[i][j])
      }
      combinations.push(combination)
    }

    // for cols
    for (let i = 0; i < gridSize; i++) {
      let combination = []
      for (let j = 0; j < gridSize; j++) {
        combination.push(positions[j][i])
      }
      combinations.push(combination)
    }

    // for forward diagonal
    let combination = []
    for (let i = 0; i < gridSize; i++) {
      combination.push(positions[i][i])
    }
    combinations.push(combination)

    // for backward diagonal
    combination = []
    let k = gridSize - 1
    for (let i = 0; i < gridSize; i++) {
      combination.push(positions[i][k])
      k -= 1
    }
    combinations.push(combination)

    return combinations
  }

  checkTheGameResult = () => {
    const { board, gridSize } = this.state
    const winningCombinations = this.winningCombinations(gridSize)
    return winningCombinations.find(combination => {
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
