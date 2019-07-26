import React from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { backgroundColor, foregroundColor } from '../styles/index'

import Input from '../components/common/Input'
import Button from '../components/common/TouchableButton'

import { createUserWithPassword } from '../util/firebase'

export default class SignUp extends React.Component {
  static navigationOptions = {
    title: 'Sign up for an account'
  }

  static resetState = () => ({
    email: '',
    password: '',
  })

  state = SignUp.resetState()

  handleSignup = async () => {
    try {
      const { email, password } = this.state

      await createUserWithPassword(email, password)
    } catch (error) {
      switch (error.code) {
        case 'auth/email-already-in-use':

        case 'auth/invalid-email':

        case 'auth/operation-not-allowed':

        case 'auth/weak-password':

        default:
          alert(error.message)
      }
    }
  }

  _navigateToSignin = () => {
    this.props.navigation.navigate('Signin')
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
      <KeyboardAvoidingView
        style={styles.container}
        behavior='height'
        enabled
      >

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
          secureTextEntry={true}
        />
        <TouchableOpacity
          onPress={this._navigateToSignin}
        >
          <Text style={styles.text}>
            Have an Account? Sign in instead.
          </Text>
        </TouchableOpacity>

        <View style={styles.instructionsContainer}>
          <Button
            onPress={this.handleSignup}
            label="Sign up!"
          />
        </View>

      </KeyboardAvoidingView>
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
