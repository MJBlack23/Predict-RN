import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage
} from 'react-native'

import { backgroundColor, foregroundColor } from '../styles/index'

export default class Settings extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  }

  handleLogOut = async () => {
    await AsyncStorage.clear()
    this.props.navigation.navigate('Auth')
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this.handleLogOut}
        >
          <Text style={styles.text}>Log Out</Text>
        </TouchableOpacity>
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
  },
  text: {
    fontSize: 24,
    color: foregroundColor,
  },
})
