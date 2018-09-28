import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'mobx-react'
import stores from './stores'
import Header from './components/Header'
import Home from './containers/Home'
import CoreLayout from './containers/CoreLayout'
import Toast from './components/Toast'
import 'normalize.css/normalize.css'
import './App.css'

class App extends Component {
  render() {
    return (
      <Router>
        <Provider {...stores}>
          <CoreLayout>
            <Header />
            <Route exact path="/" component={Home} />
            <Toast />
          </CoreLayout>
        </Provider>
      </Router>
    )
  }
}

export default App
