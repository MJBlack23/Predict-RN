import React from 'react'
import { View, Text } from 'react-native'

import { foregroundColor, backgroundColor } from '../styles/index'

const determineColor = (breakPoint, current) => {
  return current > breakPoint ? foregroundColor : backgroundColor
}

const Star = (props) => (
  <Text style={{ color: determineColor(props.breakPoint, props.current), fontSize: 25 }}>*</Text>
)

export default (props) => (
  <View
    style={{
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly'
    }}
  >
    <Star
      breakPoint={8}
      current={props.countDown}
    />
    <Star
      breakPoint={6}
      current={props.countDown}
    />
    <Star
      breakPoint={4}
      current={props.countDown}
    />
    <Star
      breakPoint={2}
      current={props.countDown}
    />
    <Star
      breakPoint={4}
      current={props.countDown}
    />
    <Star
      breakPoint={6}
      current={props.countDown}
    />
    <Star
      breakPoint={8}
      current={props.countDown}
    />

  </View>
)
