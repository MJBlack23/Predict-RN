import React from 'react'
import { View, StyleSheet, Button, AsyncStorage } from 'react-native'

import { foregroundColor, backgroundColor } from '../styles/index'
import powerups from '../data/powerups'
import rules from '../data/rules'

// Import Components
import Scores from '../components/Scores'
import Buttons from '../components/Buttons'
import Number from '../components/Number'
import Powerups from '../components/Powerups'

import { saveHighScore, readHighScore } from '../util/firebase'


// Helper functions
import {
  generateNumber,
  incrementLives,
  generatePowerup,
  guessCorrect,
  appendPowerup,
} from '../util/game'

export default class Game extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'predict',
    headerRight: (
      <Button
        onPress={() => navigation.navigate('Settings')}
        title="Settings"
        color={backgroundColor}
      />
    )
  })

  constructor(props) {
    super(props)

    this.state = {
      currentNumber: null,
      score: 0,
      highScore: 0,
      lives: 0,
      streak: 0,
      powerups: [],
      wrong: false,
      uid: '',
    }
  }

  

  componentWillMount() {
    AsyncStorage.getItem('user')
      .then(JSON.parse)
      .then(user => {
        const uid = user.uid

        readHighScore(uid)
          .then(document => {
            const highScore = ((doc) => {
              if (doc.exists) {
                return doc.data().highScore
              }

              return this.state.highScore
            })(document)
            
              this.setState(() => ({
                ...this.state,
                currentNumber: generateNumber(),
                uid,
                highScore,
              }))
            
          })
          .catch(error => {
            alert(error.message)
          })
      })
  }

  componentWillUnmount() {
    AsyncStorage.getItem('user')
      .then(JSON.parse)
      .then(user => {
        const uid = user.uid

        const highScore = this.state.score > this.state.highScore ? this.state.score : this.state.highScore

        saveHighScore(this.state.uid, highScore)
          .catch(error => {
            alert(error.message)
          })
      })
  }

  /** Guessing methods */
  guessAbove = () => this.makeGuess('higher')
  guessBelow = () => this.makeGuess('lower')


  handleCorrectGuess = (nextNumber = 0) => {
    // Increment Score and Streak
    const score = this.state.score + 1
    const streak = this.state.streak + 1

    // Update the current number to null to allow the next update to trigger
    // The render animation of the number
    this.setState(() => ({
      ...this.state,
      currentNumber: null,
      wrong: false,
      score,
      streak,
      lives: incrementLives(rules)(streak, this.state.lives),
      powerups: appendPowerup(rules, generatePowerup(rules, generateNumber, powerups))(score, this.state.powerups)
    }))

    // After the interval update the state with the new information
    setTimeout(() => this.updateNumber(nextNumber), 100)
  }

  handleUseLife = (nextNumber = 0) => {
    // Update the wrong boolean to render the number in red to indicate
    // the guess was wrong
    this.setIsWrong()

    // After a short interval, set the current number to null to allow
    // the render animation
    setTimeout(() => {
      this.setState(() => ({
        ...this.state,
        currentNumber: null,
        wrong: false,
        streak: 0,
        lives: this.state.lives - 1,
      }))
    }, 250)

    // Reset the new number to trigger the render animation
    setTimeout(() => this.updateNumber(nextNumber), 500)
  }

  handleResetScore = (nextNumber = 0) => {
    // Update the wrong boolean to render the number in red to indicate
    // the guess was wrong
    this.setIsWrong()

    const highScore = this.state.score > this.state.highScore ? this.state.score : this.state.highScore

    saveHighScore(this.state.uid, highScore)
      .catch(error => {
        alert(error.message)
      })

    // update the scores and set the currentnumber to null toa allow the re-render
    // animation
    setTimeout(() => {
      this.setState(() => ({
        ...this.state,
        currentNumber: null,
        score: 0,
        streak: 0,
        highScore,
        wrong: true,
      }))
    }, 250)
    
    // Reset the new number to trigger the render animation
    setTimeout(() => this.updateNumber(nextNumber), 500)
  }

  setIsWrong = () => this.setState(() => ({ ...this.state, wrong: true }))

  updateNumber = (currentNumber) => this.setState(() => ({
    ...this.state,
    wrong: false,
    currentNumber,
  }))


  
  /** Powerup methods */
  usePowerup = (powerup) => {
    const self = this

    return () => {
      // Update current number to null to allow the
      // render animation
      self.setState(() => ({
        currentNumber: null,
        powerups: self.state.powerups.filter((p => p.id !== powerup.id)),
      }))

      switch (powerup.name) {
        case 'Randomize':
          setTimeout(() => self.updateNumber(generateNumber()), 250)

          break;
        case 'Add':

        case 'Subtract':
          const newNumber = (() => {
            const tempNumber = self.state.currentNumber + parseInt(powerup.label, 10)

            if (tempNumber < 1) {
              return 1
            } else if (tempNumber > 100) {
              return 100
            }

            return tempNumber
          })()

          setTimeout(() => self.updateNumber(newNumber), 250)
          break;
      }
    }
  }

  makeGuess(guess = 'higher') {
    const { currentNumber } = this.state
    const nextNumber = generateNumber()

    if (guessCorrect(guess, currentNumber, nextNumber)) {
      this.handleCorrectGuess(nextNumber)
    } else if (this.state.lives > 0) {
      this.handleUseLife(nextNumber)
    } else {
      this.handleResetScore(nextNumber)
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
    alignItems: 'stretch',
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
