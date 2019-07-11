import React from 'react'

import { TouchableOpacity, Text, StyleSheet } from 'react-native'

import { tertiaryColor, backgroundColor } from '../../styles/index'

/** PROPS
 * onPress: function
 * label: string
 */

export default (props) => (
  <TouchableOpacity
    style={styles.horizontal}
    onPress={props.onPress}
  >
    <Text style={styles.button}>
      {props.label}
    </Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  horizontal: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: backgroundColor,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 25,
    marginBottom: 25,
  },
  button: {
    color: tertiaryColor,
    fontSize: 30,
    fontWeight: 'bold',
  },
})
