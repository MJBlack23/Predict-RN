import React from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'

import { backgroundColor, foregroundColor } from '../styles/index'

import Input from '../components/common/Input'
import Button from '../components/common/TouchableButton'

export default class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
    }

    this.handleChange = this.handleChange.bind(this)
  }

    handleChange(key) {
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

        <View style={styles.instructionsContainer}>
          <Text style={styles.text}>
            Login to continue
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
          onPress={this.props.onLogin}
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
