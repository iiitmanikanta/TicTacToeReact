import React, { Component } from 'react'
import { observer } from 'mobx-react'
import Square from '../../components/Square'
import {
  PLAYER_O,
  PLAYER_X,
  DEFAULT_GRID_SIZE
} from '../../constants/AppConstants'
import { GameBoard, Description, ResetButton } from './styledComponents'

@observer
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gridSize: DEFAULT_GRID_SIZE,
      isGameCompleted: false,
      isGameDraw: false,
      board: this.getGridArray(DEFAULT_GRID_SIZE),
      currentUser: PLAYER_X
    }
  }

  componentWillMount = () => {
    // initializing grid
  }

  getGridArray = gridSize => {
    const noOfBlocks = gridSize * gridSize
    const grid = []
    for (let i = 0; i < noOfBlocks; i++) {
      grid.push('')
    }
    return grid
  }

  resetGameData = () => {
    this.setState({
      gridSize: DEFAULT_GRID_SIZE,
      isGameCompleted: false,
      isGameDraw: false,
      board: this.getGridArray(DEFAULT_GRID_SIZE),
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
    console.log('positions', positions)
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
    // combination = []
    // let x = 0
    // for (let i = gridSize - 1; i <= 0; i--) {
    //   combination.push(positions[x])
    //   x += 1
    // }
    // combinations.push(combination)
    // it is in midddle sorry for that
    console.log('combinations', combinations)
    return combinations
  }
  checkTheGameResult = () => {
    const { board, gridSize } = this.state
    const winningCombinations = this.winningCombinations(gridSize)
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
  handleChange = event => {
    const gridSize = Number(event.target.value)
    this.setState({
      gridSize,
      board: this.getGridArray(gridSize)
    })
  }
  render() {
    const { currentUser, isGameCompleted, isGameDraw, gridSize } = this.state
    console.log('this.state', this.state, this.winningCombinations(3))
    return (
      <div>
        <br />
        Select the Grid Size: {` `}
        <select value={gridSize} onChange={this.handleChange}>
          <option value={3}>3 x 3</option>
          <option value={4}>4 x 4</option>
          <option value={5}>5 x 5</option>
        </select>
        <GameBoard isGameCompleted={isGameCompleted} gridSize={gridSize}>
          {this.showGameBoard()}
        </GameBoard>
        <Description>
          {isGameCompleted
            ? `You Won the game - ${currentUser}`
            : isGameDraw
              ? `Game is Draw`
              : `It's turn for Player - ${currentUser}`}
        </Description>
        {isGameCompleted || isGameDraw ? (
          <ResetButton onClick={this.resetGameData}>Start New Game</ResetButton>
        ) : null}
      </div>
    )
  }
}

export default Home
