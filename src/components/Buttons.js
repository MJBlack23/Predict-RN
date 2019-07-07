import React from 'react'
import { View, StyleSheet } from 'react-native'

import Button from './common/TouchableButton'

/** PROPS
 * guessAbove: function
 * guessBelow: function
 */

 export default (props) => (
   <View style={styles.container}>
    <Button
      onPress={props.guessAbove}
      label="higher"
    />

    <Button
      onPress={props.guessBelow}
      label="lower"
    />
   </View>
 )

const styles = StyleSheet.create({
  container: {
    flex: 4,
    flexDirection: 'column',
  },
})
