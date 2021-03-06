import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

import { foregroundColor } from '../../styles/index'

/** PROPS
 * onChange: function
 * label: string
 * value: string
 * secureTextEntry: boolean
 */

export default (props) => (
  <View style={styles.container}>
    <Text style={styles.label}>
      {props.label}
    </Text>
    <TextInput
      style={styles.input}
      value={props.value}
      onChangeText={props.onChange}
      secureTextEntry={props.secureTextEntry === undefined ? false : props.secureTextEntry }
    />
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'stretch',
    marginTop: 25,
    marginBottom: 15,
  },
  label: {
    color: foregroundColor,
    marginLeft: 25,
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: foregroundColor,
    borderWidth: 1,
    backgroundColor: '#fff',
    padding: 5,
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 25,
    marginRight: 25,
  },
})
