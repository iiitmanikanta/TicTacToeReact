import React, { Component } from 'react'
import { PLAYER_O, PLAYER_X } from '../../constants/AppConstants'
import { MainContainer, CircleShape, CrossLine } from './styledComponents'

class Square extends Component {
  onSquareSelect = () => {
    const { onSquareClick, position } = this.props
    onSquareClick(position)
  }
  render() {
    const { value } = this.props
    return (
      <MainContainer onClick={this.onSquareSelect}>
        {value === PLAYER_O ? (
          <CircleShape />
        ) : value === PLAYER_X ? (
          <div>
            <CrossLine rotateLeft />
            <CrossLine rotateRight />
          </div>
        ) : null}
      </MainContainer>
    )
  }
}

export default Square
