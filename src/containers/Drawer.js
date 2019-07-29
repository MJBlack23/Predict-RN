import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage
} from 'react-native'

import styles from '../styles/index'

import { signOut } from '../util/firebase'
import BrandHeader from '../components/common/BrandHeader'
import Hr from '../components/common/Hr';

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
      <View style={styles.containerLeft}>
        <BrandHeader />

        <TouchableOpacity
          style={styles.clickable}
          onPress={() => this.props.navigation.navigate('Profile')}
        >
          <Text style={styles.text}>Profile</Text>
        </TouchableOpacity>

        <Hr />

        <TouchableOpacity
          style={styles.clickable}
          onPress={() => this.props.navigation.navigate('Home')}
        >
          <Text style={styles.text}>Game</Text>
        </TouchableOpacity>

        <Hr />
        
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
