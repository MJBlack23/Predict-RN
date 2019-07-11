import React from 'react'
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native'

import firebase from '../util/firebase'

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props)
    
    this._bootstrapAsync()
  }
  
  // Fetch the token from storage then navigate to correct place
  _bootstrapAsync = async () => {
    firebase.auth().onAuthStateChanged(async user => {
      try {
        if ({ user }) {
          await AsyncStorage.setItem('user', JSON.stringify({
            displayName: user.displayName ? user.displayName : '',
            email: user.email || '',
            emailVerified: user.emailVerified,
            photoUrl: user.photoUrl || '',
            uid: user.uid,
          }))

          this.props.navigation.navigate('App')
        } else {
          await AsyncStorage.clear()
          this.props.navigation.navigate('Auth')
        }
      } catch (error) {
        this.props.navigation.navigate('Auth')
      }
    })

    const user = await AsyncStorage.getItem('user')

    this.props.navigation.navigate(user ? 'App' : 'Auth')
  }

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle='default' />
      </View>
    )
  }
}

const styles = StyleSheet.create({

})
