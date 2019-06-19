/** TYPE
 * name: string
 * label: function
 * description: string
 * lBound: number (decimal)
 * uBound: number (decimal)
 */

export default [
  {
    name: 'Randomize',
    label: () => '?',
    description: 'Generate a new random number',
    lBound: 0,
    uBound: 50,
  },
  {
    name: 'Subtract',
    label: (num) => `-${num}`,
    description: 'Subtract to the current number by the amount',
    lBound: 51,
    uBound: 75,
  },
  {
    name: 'Add',
    label: (num) => `+${num}`,
    description: 'Add to the current number by the amount',
    lBound: 76,
    uBound: 100,
  },
]
