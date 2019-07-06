import React from 'react'
import { Animated, Text, StyleSheet } from 'react-native'

import { foregroundColor } from '../styles/index'

export default class Number extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0)
  }

  fadeIn() {
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: 1500,
      }
    ).start()
  }

  fadeOut() {
    this.state.fadeAnim.setValue(1)

    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: -1,
        duration: 1500,
      }
    ).start()
  }

  componentDidMount() {
    this.fadeIn()
  }

  componentWillReceiveProps(props) {
    if (!props.wrong) {
      this.fadeOut()
    }
  }

  determineColor(wrong) {
    const color = wrong ? 'red' : foregroundColor

    const sheet = StyleSheet.create({
      number: {
        fontSize: 100,
        color,
      }
    })

    return sheet.number
  }

  render() {
    const { fadeAnim } = this.state

    return (
      <Animated.View
        style={{
          ...this.props.style,
          opacity: fadeAnim,
        }}
      >
        <Text style={this.determineColor(this.props.wrong)}>
          {this.props.number}
        </Text>
      </Animated.View>
    )
  }
}
