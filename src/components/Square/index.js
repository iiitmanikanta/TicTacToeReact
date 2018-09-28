import React, { Component } from 'react'
import { MainContainer } from './styledComponents'

class Square extends Component {
  onSquareSelect = () => {
    const { onSquareClick, position } = this.props
    onSquareClick(position)
  }
  render() {
    const { value } = this.props
    return <MainContainer onClick={this.onSquareSelect}>{value}</MainContainer>
  }
}

export default Square
