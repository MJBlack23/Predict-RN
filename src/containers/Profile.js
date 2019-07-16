import React from 'react'
import { View, Text, AsyncStorage } from 'react-native'

export default class Profile extends React.Component {
  state = {
    email: '',
    uid: '',
    displayName: ''
  }

  componentDidMount() {
    AsyncStorage.getItem('user')
      // .then(JSON.parse)
      .then(user => {
        alert(user)
      })
  }

  render() {
    return (
      <View>
        <Text></Text>
      </View>
    )
  }
}
