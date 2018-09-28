import styled from 'react-emotion'

export const MainContainer = styled(`div`)`
  height: 55px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #9a8297;
  border-radius: 6px;
  transition: background-color 0.3s;
  position: relative;

  &:hover {
    background-color: #d0782a;
  }
`
export const CircleShape = styled(`div`)`
  position: absolute;
  border-radius: 50%;
  border: solid 6px white;
  width: 25px;
  height: 25px;
`
export const CrossLine = styled(`div`)`
  width: 6px;
  height: 50px;
  background-color: white;
  display: block;
  position: absolute;
  border-radius: 3px;
  transform: ${props =>
    props.rotateLeft
      ? 'translate(-50%, -50%) rotate(-45deg)'
      : props.rotateRight
        ? 'translate(-50%, -50%) rotate(45deg)'
        : 'none'};
`
