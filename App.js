import React from 'react'
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator
} from "react-navigation"

import { foregroundColor, backgroundColor } from './src/styles/index'

// Import Components
import AuthLoading from './src/containers/AuthLoading'
import Drawer from './src/containers/Drawer'
import Game from './src/containers/Game'
import Signin from './src/containers/SignIn'
import Signup from './src/containers/SignUp'

const AppNavigator = createDrawerNavigator({
  Home: Game,
}, {
  initialRouteName: 'Home',
  contentComponent: Drawer,
})

const SigninNavigator = createStackNavigator(
  {
    Signin: Signin,
    Signup: Signup,
  }, 
  {
    initialRouteName: 'Signin',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor,
      },
      headerTintColor: foregroundColor,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  }
)

const AppContainer = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    App: AppNavigator,
    Auth: SigninNavigator
  },
  {
    initialRouteName: 'AuthLoading'
  }
))

export default () => (
  <AppContainer />
)
