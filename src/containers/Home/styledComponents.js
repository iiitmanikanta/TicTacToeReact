import styled from 'react-emotion'

export const GameBoard = styled(`div`)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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
