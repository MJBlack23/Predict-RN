import React from 'react'
import { View, StyleSheet } from 'react-native'

import { tertiaryColor } from '../styles/index'

import Button from './common/TouchableButton'

/** PROPS
 * guessAbove: function
 * guessBelow: function
 */

 export default (props) => (
   <View style={styles.container}>
    <Button
      onPress={props.guessAbove}
      label="Higher"
    />
    <View style={styles.horizontalRule} />
    <Button
      onPress={props.guessBelow}
      label="Lower"
    />
   </View>
 )

const styles = StyleSheet.create({
  container: {
    flex: 4
  },
  horizontalRule: {
    borderBottomColor: tertiaryColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignSelf: 'stretch'
  },
})
