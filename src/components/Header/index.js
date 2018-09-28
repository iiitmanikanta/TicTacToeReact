import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import { Title } from './styledComponents'

class Header extends Component {
  onHomeClick = () => {
    this.props.history.push('/')
  }

  onCartClick = () => {
    this.props.history.push('/cart')
  }

  render() {
    return (
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton color="inherit" aria-label="Menu">
            <HomeIcon onClick={this.onHomeClick} />
          </IconButton>
          <Title variant="title" color="inherit">
            Tic Tac Toe
          </Title>
        </Toolbar>
      </AppBar>
    )
  }
}

export default withRouter(Header)
