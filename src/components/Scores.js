import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { foregroundColor } from '../styles/index'

/* PROPS
  score: number
  highScore: number
  lives: number
  streak: number
*/

export default (props) => (
  <View style={styles.container}>
    <View style={styles.scoreContainer}>
      <View>
        <Text style={styles.score}>
          High Score:
          {' '}
          {props.highScore}
        </Text>
      </View>
      <View>
        <Text style={styles.score}>
          Score:
          {' '}
          {props.score}
        </Text>
      </View>
    </View>

    <View style={styles.livesContainer}>
      <View>
        <Text style={styles.score}>
          Lives
          {' '}
          {props.lives}
        </Text>
      </View>
      <View>
        <Text style={styles.score}>
          Streak
          {' '}
          {props.streak}
        </Text>
      </View>
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 50,
  },
  scoreContainer: {
    flex: 1,
    alignSelf: 'flex-start',
    flexDirection: 'column',
    paddingLeft: 25,
    paddingRight: 25,
  },
  livesContainer: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'flex-start',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingLeft: 25,
    paddingRight: 25,
  },
  score: {
    fontSize: 18,
    color: foregroundColor,
  },
})
