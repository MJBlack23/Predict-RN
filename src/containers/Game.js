import React from 'react'
import { View, StyleSheet, Button } from 'react-native'

import { foregroundColor, backgroundColor } from '../styles/index'
import powerups from '../data/powerups'
import rules from '../data/rules'

// Import Components
import Scores from '../components/Scores'
import Buttons from '../components/Buttons'
import Number from '../components/Number'
import Powerups from '../components/Powerups'


// Helper functions
import {
  generateNumber,
  incrementLives,
  generatePowerup,
  guessCorrect,
} from '../util/game'

export default class Game extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Predict',
    headerRight: (
      <Button
        onPress={() => navigation.navigate('Details')}
        title="Settings"
        color={backgroundColor}
      />
    )
  })

  constructor() {
    super()

    this.state = {
      currentNumber: generateNumber(),
      score: 0,
      highScore: 0,
      lives: 0,
      streak: 0,
      powerups: [],
      wrong: false,
    }

    this.makeGuess = this.makeGuess.bind(this)
    this.usePowerup = this.usePowerup.bind(this)
    this.updateScores = this.updateScores.bind(this)
  }

  
  

  /** Guessing methods */
  guessAbove = () => this.makeGuess('higher')
  guessBelow = () => this.makeGuess('lower')


  
  /** Powerup methods */
  appendPowerup(score, powerups = []) {
    if (powerups.length >= rules.maxPowerups || score % (rules.gainPowerup * (powerups.length + 1)) !== 0) {
      return powerups
    }

    powerups.push(generatePowerup(powerups.length))

    return powerups
    .filter(p => p !== null)
    .map((p, id) => ({ ...p, id }))
  }

  usePowerup(powerup) {
    const self = this

    return () => {
      switch (powerup.name) {
        case 'Randomize':


          self.setState(() => ({
            powerups: self.state.powerups.filter((p => p.id !== powerup.id)),
          }))

          // self.updateNumber(self)

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

  updateNumber = (self, currentNumber = null, interval = 100) => {
    // self.setState(() => ({
    //   ...self.state,
    //   currentNumber: null,
    // }))

    setTimeout(function () {
      self.setState(() => ({
        ...self.state,
        currentNumber: currentNumber !== null ? currentNumber : generateNumber(),
      }))
    }, interval)
  }

  updateScores(guess, currentNumber) {
    const self = this

    
  }

  makeGuess(guess = 'higher') {
    const { currentNumber } = this.state
    const self = this
    const nextNumber = generateNumber()

    if (guessCorrect(guess, currentNumber, nextNumber)) {
      const score = self.state.score + 1
      const streak = self.state.streak + 1

      self.setState(() => ({
        ...self.state,
        currentNumber: null,
        wrong: false,
      }))

      setTimeout(() => {
        self.setState(() => ({
          ...self.state,
          currentNumber: nextNumber,
          score,
          streak,
          lives: incrementLives(rules)(streak, self.state.lives),
          powerups: self.appendPowerup(score, self.state.powerups)
        }))
      }, 100)
    } else if (self.state.lives > 0) {

      self.setState(() => ({
        ...self.state,
        wrong: true,
      }))

      setTimeout(() => {
        self.setState(() => ({
          ...self.state,
          currentNumber: null,
          wrong: false,
        }))
      }, 250)

      setTimeout(() => {
        self.setState(() => ({
          ...self.state,
          currentNumber: nextNumber,
          streak: 0,
          lives: self.state.lives - 1,
        }))
      }, 500)
    } else {
      // hard reset
      self.setState(() => ({
        ...self.state,
        wrong: true,
      }))

      setTimeout(() => {
        self.setState(() => ({
          ...self.state,
          currentNumber: null,
          wrong: false,
        }))
      }, 250)

      setTimeout(() => {
        self.setState(() => ({
          ...self.state,
          currentNumber: nextNumber,
          score: 0,
          streak: 0,
          highScore: self.state.score > self.state.highScore ? self.state.score : self.state.highScore,
        }))
      }, 500)
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

        {this.state.currentNumber !== null ? <Number
          style={styles.numberContainer}
          number={this.state.currentNumber}
          wrong={this.state.wrong}
        /> :
          <View style={styles.numberContainer} />
        }
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
