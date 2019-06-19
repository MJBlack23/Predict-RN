import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

import { foregroundColor, backgroundColor, tertiaryColor } from '../styles/index'
import powerups from '../data/powerups'

// Import Components
import Scores from '../components/Scores'
import Buttons from '../components/Buttons'
import Powerups from '../components/Powerups'

export default class Game extends React.Component {
  constructor() {
    super()

    this.state = {
      currentNumber: this.genNumber(),
      score: 0,
      highScore: 0,
      lives: 0,
      streak: 0,
      powerups: [],
    }

    this.guessAbove = this.guessAbove.bind(this)
    this.guessBelow = this.guessBelow.bind(this)
    this.makeGuess = this.makeGuess.bind(this)
    this.usePowerup = this.usePowerup.bind(this)
  }


  genNumber(upper = 100) {
    return Math.round(Math.random() * upper) + 1
  }

  generatePowerup() {
    const seed = this.genNumber()

    const builder = powerups.find((powerup) => (
      seed >= powerup.lBound && seed <= powerup.uBound
    ))

    return Object.assign({},
      builder,
      {
        label: builder.label(this.genNumber(25))
      })
  }

  guessCorrect(guess = 'higher', currentNumber = 0, nextNumber = 0) {
    return guess === 'higher' && nextNumber >= currentNumber ||
      guess === 'lower' && nextNumber <= currentNumber
  }

  guessAbove() {
    this.makeGuess('higher')
  }

  guessBelow() {
    this.makeGuess('lower')
  }

  incrementLives(streak, lives) {
    return streak % 3 === 0 ? lives + 1 : lives
  }

  appendPowerup(score, powerups = []) {
    if (powerups.length >= 3 || score % 10 !== 0) {
      return powerups
    }

    powerups.push(this.generatePowerup(powerups.length))

    return powerups.map((p, id) => ({ ...p, id }))
  }

  usePowerup(powerup) {
    const self = this

    return () => {
      switch (powerup.name) {
        case 'Randomize':
          self.setState(() => ({
            ...self.state,
            currentNumber: self.genNumber(),
            powerups: self.state.powerups.filter((p => p.id !== powerup.id)),
          }))

          break;
        case 'Add':

        case 'Subtract':
          self.setState(() => ({
            ...self.state,
            currentNumber: self.state.currentNumber + parseInt(powerup.label, 10),
            powerups: self.state.powerups.filter((p => p.id !== powerup.id)),
          }))
          break;
      }
    }
  }

  makeGuess(guess = 'higher') {
    const nextNumber = this.genNumber()

    if (this.guessCorrect(guess, this.state.currentNumber, nextNumber)) {
      const score = this.state.score + 1
      const streak = this.state.streak + 1

      this.setState(() => ({
        ...this.state,
        currentNumber: nextNumber,
        score,
        streak,
        lives: this.incrementLives(streak, this.state.lives),
        powerups: this.appendPowerup(score, this.state.powerups)
      }))
    } else if (this.state.lives > 0) {
      this.setState(() => ({
        ...this.state,
        currentNumber: nextNumber,
        streak: 0,
        lives: this.state.lives - 1,
      }))
    } else {
      // hard reset
      this.setState(() => ({
        ...this.state,
        currentNumber: nextNumber,
        score: 0,
        streak: 0,
        highScore: this.state.score > this.state.highScore ? this.state.score : this.state.highScore,
      }))
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Scores
          score={this.state.score}
          highScore={this.state.highScore}
          lives={this.state.lives}
          streak={this.state.streak}
        />

        <View style={styles.numberContainer}>
          <Text style={styles.number}>{this.state.currentNumber}</Text>
        </View>

        <Powerups
          powerups={this.state.powerups}
          usePowerup={this.usePowerup}
        />

        <Buttons
          guessAbove={this.guessAbove}
          guessBelow={this.guessBelow}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },

  numberContainer: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },


  /* Text Styles */
  number: {
    fontSize: 100,
    color: foregroundColor,
  },

  button: {
    color: foregroundColor,
    fontSize: 30,
  },
})
