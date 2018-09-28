import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import Snackbar from '@material-ui/core/Snackbar'

@inject('uiStore')
@observer
class Toast extends Component {
  render() {
    const { uiStore } = this.props
    const { message, resetMessage } = uiStore
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        open={message.length > 0}
        autoHideDuration={5000}
        onClose={resetMessage}
        message={<span>{message}</span>}
      />
    )
  }
}

export default Toast
