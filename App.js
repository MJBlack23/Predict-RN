import React from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native'

// Import Components
import Scores from './src/components/Scores'

export default class App extends React.Component {
  constructor() {
    super()

    this.state = {
      currentNumber: this.genNumber(),
      score: 0,
      highScore: 0,
      lives: 0,
      streak: 0,
    }

    this.guessAbove = this.guessAbove.bind(this)
    this.guessBelow = this.guessBelow.bind(this)
    this.makeGuess = this.makeGuess.bind(this)
  }


  genNumber() {
    return Math.round(Math.random() * 100) + 1
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

        <View style={styles.powerupContainer}>
          <View style={styles.powerup}>
            <Text style={styles.powerupText}>?</Text>
          </View>
          <View style={styles.powerup}>
            <Text style={styles.powerupText}>?</Text>
          </View>
          <View style={styles.powerup}>
            <TouchableOpacity style={styles.powerupText}>
              <Text style={styles.button}>?</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <TouchableOpacity
          style={styles.horizontal}
          onPress={this.guessAbove}>
          <Text style={styles.button}>
            Higher
          </Text>
        </TouchableOpacity>
        <View style={styles.horizontalRule} />
        <TouchableOpacity
          style={styles.horizontal}
          onPress={this.guessBelow}
        >
          <Text style={styles.button}>
            Lower
          </Text>
        </TouchableOpacity>
        
      </View>
    )
  }
  
}

const backgroundColor = '#333'
const foregroundColor = '#ccc'
const tertiaryColor = '#555'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  horizontal: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  numberContainer: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  powerupContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  powerup: {
    flex: 1,
    flexBasis: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },



  
  horizontalRule: {
    borderBottomColor: tertiaryColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignSelf: 'stretch'
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
  powerupText: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: foregroundColor,
    borderWidth: StyleSheet.hairlineWidth,
  }
});
