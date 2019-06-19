import React from 'react'
import { View, Text } from 'react-native'


// Import Components
import Game from './src/containers/Game'
import Login from './src/containers/Login'

export default class App extends React.Component {
  constructor() {
    super()

    this.state = {
      authed: false
    }

    this.onLogin = this.onLogin.bind(this)
  }

  onLogin() {
    this.setState(() => ({
      ...this.state,
      authed: !this.state.authed
    }))
  }
  
  render() {
    return this.state.authed ? <Game /> : <Login onLogin={this.onLogin} />
  }
  
}

