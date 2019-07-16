import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage
} from 'react-native'

import { backgroundColor, foregroundColor, tertiaryColor } from '../styles/index'

import { signOut } from '../util/firebase'

export default class Settings extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  }

  handleLogOut = async () => {
    try {
      await signOut()
      await AsyncStorage.clear()
      this.props.navigation.navigate('Auth')
    } catch (error) {

    }
    
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            predict
          </Text>
        </View>

        <TouchableOpacity
          style={styles.clickable}
          onPress={() => this.props.navigation.navigate('Profile')}
        >
          <Text style={styles.text}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.clickable}
          onPress={() => this.props.navigation.navigate('Home')}
        >
          <Text style={styles.text}>Game</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.clickable}
          onPress={this.handleLogOut}
        >
          <Text style={styles.text}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    paddingTop: 25,
  },
  header: {
    // alignSelf: 'flex-start'
    marginBottom: 15
  },
  clickable: {
    padding: 10,
    borderBottomColor: foregroundColor,
    borderBottomWidth: 1,
    // borderTopColor: foregroundColor,
    // borderTopWidth: 1,
  },
  headerText: {
    fontSize: 36,
    color: tertiaryColor,
  },
  text: {
    fontSize: 24,
    color: foregroundColor,
  },
})
