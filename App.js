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
import Settings from './src/containers/Settings'
import Game from './src/containers/Game'
import Login from './src/containers/Login'

const AppNavigator = createStackNavigator({
  Home: Game,
  Settings: Settings,
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

const LoginNavigator = createStackNavigator(
  {
    Login: Login,
  }, 
  {
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
    Auth: LoginNavigator
  },
  {
    initialRouteName: 'AuthLoading'
  }
))

export default () => (
  <AppContainer />
)
// export default class App extends React.Component {
//   state = {
//     authed: true,
//   }

//   componentDidMount() {
//     // this.props.navigation.setParams({
//     //   logout: this.logout
//     // })
//   }

//   onLogin = () => {
//     this.setState(() => ({
//       ...this.state,
//       authed: !this.state.authed
//     }))
//   }

//   logout = () => {
//     this.setState(() => ({
//       ...this.state,
//       authed: false,
//     }))
//   }
  
//   render() {
//     return (
//       this.state.authed ? (
//         <AppContainer />
//       ) :
//       <Login onLogin={this.onLogin} />
//     )
//   }
  
// }

