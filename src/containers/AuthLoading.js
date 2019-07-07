import React from 'react'
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native'

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props)
    
    this._bootstrapAsync()
  }
  
  // Fetch the token from storage then navigate to correct place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken')

    this.props.navigation.navigate(userToken ? 'App' : 'Auth')
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
