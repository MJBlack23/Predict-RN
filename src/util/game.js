const generateNumber = (upper = 100, lower = 1) => Math.round(Math.random() * (upper - 1)) + lower
const incrementLives = rules => (streak, lives) => streak % rules.gainLife === 0 ? lives + 1 : lives

const guessCorrect = (guess = 'higher', currentNumber = 0, nextNumber = 0) =>
  guess === 'higher' && nextNumber >= currentNumber ||
  guess === 'lower' && nextNumber <= currentNumber

const generatePowerup = (rules, generator) => powerups => {
  const seed = generator()

  const powerupBuilder = powerups.find(powerup => (
    seed >= powerup.lBound && seed <= powerup.uBound
  ))

  if (powerupBuilder === undefined) {
    return null
  }

  return Object.assign({},
    powerupBuilder,
    {
      label: powerupBuilder.label(generator(rules.powerupUpperBound, rules.powerupLowerBound))
    })
}

const appendPowerup = (rules, generatePowerup) => (score, powerups = []) => {
  if (powerups.length >= rules.maxPowerups || score % (rules.gainPowerup * (powerups.length + 1)) !== 0) {
    return powerups
  }

  powerups.push(generatePowerup(powerups))

  return powerups
    .filter(p => p !== null)
    .map((p, id) => ({ ...p, id }))
}

module.exports = {
  generateNumber,
  incrementLives,
  generatePowerup,
  guessCorrect,
  appendPowerup,
}
