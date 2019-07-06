import React from 'react'
import { createStackNavigator, createAppContainer } from "react-navigation"

import { foregroundColor, backgroundColor } from './src/styles/index'

// Import Components
import Menu from './src/components/Menu'
import Game from './src/containers/Game'
import Login from './src/containers/Login'


import { View, Text } from 'react-native'
class DetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'Details'
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Details Screen</Text>
      </View>
    )
  }
}

const AppNavigator = createStackNavigator({
  Home: Game,
  Details: DetailsScreen
}, {
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor,
    },
    headerTintColor: foregroundColor,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }
})

const AppContainer = createAppContainer(AppNavigator)

export default class App extends React.Component {
  constructor() {
    super()

    this.state = {
      authed: true,
    }
  }

  onLogin = () => {
    this.setState(() => ({
      ...this.state,
      authed: !this.state.authed
    }))
  }
  
  render() {
    return (
      this.state.authed ? (
        <AppContainer />
      ) :
      <Login onLogin={this.onLogin} />
    )
  }
  
}

