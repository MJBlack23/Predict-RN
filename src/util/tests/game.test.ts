import * as gameHelpers from '../game'
import { expect } from 'chai'
import 'mocha'

const powerups = require('../../data/powerups')


describe('Game Helpers', () => {
  describe('generateNumber', () => {
    it('should generate a number between 1 and 100 when given no params', () => {
        for (let i = 0; i < 1000; i++) {
          expect(gameHelpers.generateNumber()).to.be.lessThan(101)
          expect(gameHelpers.generateNumber()).to.be.greaterThan(0)
        }
    })
  })

  describe('incrementLives', () => {
    const rules = { gainLife: 5 }
    it('should increment live counter when the streak equals a modifier of the gainLife rule', () => {
      expect(gameHelpers.incrementLives(rules)(5, 0)).to.equal(1)
      expect(gameHelpers.incrementLives(rules)(10, 10)).to.equal(11)
    })

    it('should not increment if streak not equal to a multiple of the gainlife rule', () => {
      expect(gameHelpers.incrementLives(rules)(1, 0)).to.equal(0)
      expect(gameHelpers.incrementLives(rules)(19, 10)).to.equal(10)
    })
  })

  describe('generatePowerup', () => {
    const rules = {
      powerupUpperBound: 25,
      powerupLowerBound: 10,
    }

    it('should return a Randomize powerup on a 1 - 50', () => {
      expect(gameHelpers.generatePowerup(rules, () => 1, powerups)().name).to.equal('Randomize')
      expect(gameHelpers.generatePowerup(rules, () => 50, powerups)().name).to.equal('Randomize')
    })

    it('should return a Subtract on a 51 to 75', () => {
      expect(gameHelpers.generatePowerup(rules, () => 51, powerups)().name).to.equal('Subtract')
      expect(gameHelpers.generatePowerup(rules, () => 75, powerups)().name).to.equal('Subtract')
    })

    it('should return an Add on a 76 to 100', () => {
      expect(gameHelpers.generatePowerup(rules, () => 76, powerups)().name).to.equal('Add')
      expect(gameHelpers.generatePowerup(rules, () => 100, powerups)().name).to.equal('Add')
    })

    it('should return null if above 100', () => {
      expect(gameHelpers.generatePowerup(rules, () => 101, powerups)()).to.be.null
    })
  })

  describe('guessCorrect', () => {
    it('should return true when guessing "higher", and nextNumber is greater than the currentNumber', () => {
      expect(gameHelpers.guessCorrect('higher', 15, 16)).to.be.true
    })
    it('should return true when guessing "higher", and nextNumber is equal to the currentNumber', () => {
      expect(gameHelpers.guessCorrect('higher', 15, 15)).to.be.true
    })
    it('should return false when guessing "higher", and nextNumber is less than the currentNumber', () => {
      expect(gameHelpers.guessCorrect('higher', 15, 14)).to.be.false
    })

    it('should return true when guessing "lower", and nextNumber is lower than to the currentNumber', () => {
      expect(gameHelpers.guessCorrect('lower', 15, 14)).to.be.true
    })
    it('should return true when guessing "lower", and nextNumber is equal to the currentNumber', () => {
      expect(gameHelpers.guessCorrect('lower', 15, 15)).to.be.true
    })
    it('should return false when guessing "lower", and nextNumber is greater than the currentNumber', () => {
      expect(gameHelpers.guessCorrect('lower', 15, 16)).to.be.false
    })
  })

  describe('appendPowerup', () => {
    const rules = {
      maxPowerups: 3,
      gainPowerup: 10,
    }
    const genPowerup = () => {}

    it('should append a powerup if score is a multiple of the gainPowerup rule', () => {
      const startingPowerups = []
      expect(gameHelpers.appendPowerup(rules, genPowerup)(10, startingPowerups).length).to.equal(1)
    })

    it('shouldn\'t append a powerup when the score is not a multiple of the gainPowerup rule', () => {
      const startingPowerups = []
      expect(gameHelpers.appendPowerup(rules, genPowerup)(7, startingPowerups).length).to.equal(0)
    })

    it('powerups of null shouldn\'t be appended to the list of powerups', () => {
      const startingPowerups = []
      const genNull = () => null
      expect(gameHelpers.appendPowerup(rules, genNull)(10, startingPowerups).length).to.equal(0)
    })
  })
})
