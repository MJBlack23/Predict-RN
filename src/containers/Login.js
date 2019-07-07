import React from 'react'
import { View, Text, StyleSheet, AsyncStorage } from 'react-native'

import { backgroundColor, foregroundColor } from '../styles/index'

import Input from '../components/common/Input'
import Button from '../components/common/TouchableButton'

export default class Login extends React.Component {
  static navigationOptions = {
    title: 'Login to continue'
  }

  state = {
    email: '',
    password: '',
  }

  _logInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc')
    this.props.navigation.navigate('App')
  }

  handleChange = (key) => {
    const self = this
    return (text) => {
      self.setState(() => ({
        ...self.state,
        [key]: text
      }))
    }
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.banner}>
          <Text style={styles.header}>
            Predict
          </Text>
        </View>

        <Input
          label="Email"
          value={this.state.email}
          onChange={this.handleChange('email')}
        />
        <Input
          label="Password"
          value={this.state.password}
          onChange={this.handleChange('password')}
        />

        <View style={styles.instructionsContainer}>
         <Button
          onPress={this._logInAsync}
          label="Log in"
         />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  banner: {
    flex: 3,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 36,
    color: foregroundColor,
  },
  instructionsContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 16,
    color: foregroundColor,
  },
})
