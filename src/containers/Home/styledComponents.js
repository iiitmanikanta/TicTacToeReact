import styled from 'react-emotion'

export const GameBoard = styled(`div`)`
  display: grid;
  grid-template-columns: ${props => `repeat(${props.gridSize}, 1fr)`};
  grid-gap: 10px;
  width: 50%;
  margin: auto;
  margin-top: 20px;
  pointer-events: ${props => (props.isGameCompleted ? 'none' : 'auto')};
  opacity: ${props => (props.isGameCompleted ? 0.7 : 1)};
`

export const Description = styled(`div`)`
  margin-top: 10px;
  font-size: 16px;
  margin-left: 10px;
`
export const ResetButton = styled(`button`)`
  background-color: #ff5e00;
  outline: none;
  border: none;
  padding: 10px 15px;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  margin-left: 10px;
  margin-top: 10px;
`
