import styled from 'react-emotion'

export const GameBoard = styled(`div`)`
  display: grid;
  grid-template-columns: ${props => `repeat(${props.gridSize}, 1fr)`};
  grid-gap: 10px;
  width: 50%;
  margin-top: 20px;
  pointer-events: ${props => (props.isGameCompleted ? 'none' : 'auto')};
  opacity: ${props => (props.isGameCompleted ? 0.7 : 1)};
`

export const GameStatus = styled(`div`)`
  margin: 10px;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
export const ResetButton = styled(`button`)`
  background-color: #ff5e00;
  outline: none;
  border: none;
  padding: 10px 15px;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 10px;
`

export const MainContainer = styled(`div`)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`
