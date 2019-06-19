import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet  } from 'react-native'

import { foregroundColor } from '../styles/index'

/** PROPS
 * powerup: { name, label, description }
 * onPress
 */

const Powerup = (props) => (
  <View style={styles.powerup}>
    <TouchableOpacity
      style={styles.powerupText}
      onPress={props.onPress}
    >
      <Text style={styles.text}>{props.powerup.label}</Text>
    </TouchableOpacity>
  </View>
)

const EmptyPowerup = () => (
  <View style={styles.powerup}>
    <TouchableOpacity style={styles.powerupText}>
      <Text style={styles.text}>-</Text>
    </TouchableOpacity>
  </View>
)


/**PROPS
 * powerups: Powerup[]
 */

export default (props = []) => (
  <View style={styles.powerupContainer}>
    { props.powerups.map((powerup) => (
      !powerup ? <EmptyPowerup key={powerup.id} /> :
      <Powerup
        key={powerup.id}
        powerup={powerup}
        onPress={props.usePowerup(powerup)}
      />
    ))}
  </View>
)

const styles = StyleSheet.create({
  powerupContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  powerup: {
    flex: 1,
    flexBasis: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  powerupText: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: foregroundColor,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: foregroundColor,
    fontSize: 24,
  }
})
