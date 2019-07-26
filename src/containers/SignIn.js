import React from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

import { backgroundColor, foregroundColor } from '../styles/index'

import Input from '../components/common/Input'
import Button from '../components/common/TouchableButton'

import { signInWithPassword } from '../util/firebase'

export default class Signin extends React.Component {
  static navigationOptions = {
    title: 'Sign in to continue'
  }

  static resetState = () => ({
    email: '',
    password: '',
  })

  state = Signin.resetState()

  handleSignin = async () => {
    try {
      const { email, password } = this.state

      await signInWithPassword(email, password)
    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-email':

        case 'auth/user-disabled':

        case 'auth/user-not-found':

        case 'auth/wrong-password':

        default:
          alert(error.message)
      }
    }
    
  }

  _navigateToSignup = () => {
    this.props.navigation.navigate('Signup')
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
          onPress={this._navigateToSignup}
        >
          <Text style={styles.text}>
            Create an account
          </Text>
        </TouchableOpacity>

        <View style={styles.instructionsContainer}>
         <Button
          onPress={this.handleSignin}
          label="Sign in"
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
