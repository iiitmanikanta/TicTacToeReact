import React, { Component } from 'react'
import { MainContainer } from './styledComponents'

class GridOptions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gridOptions: [3, 4, 5, 6, 7, 8, 9, 10]
    }
  }
  getOptions = () => {
    const { gridOptions } = this.state
    return gridOptions.map(size => {
      return (
        <option value={size} key={size}>
          {size} x {size}
        </option>
      )
    })
  }
  render() {
    const { handleChange, gridSize } = this.props
    return (
      <MainContainer>
        Select the Grid Size: {` `}
        <select value={gridSize} onChange={handleChange}>
          {this.getOptions()}
        </select>
      </MainContainer>
    )
  }
}

export default GridOptions
