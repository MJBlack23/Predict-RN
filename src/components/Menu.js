import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default class Menu extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Predict</Text>
        <Text>Dummy Menu Item</Text>
        <TouchableOpacity
          // onPress={this.props.navigation.navigate('Details')}
        >
          <Text>Log out</Text>
        </TouchableOpacity>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }
})
