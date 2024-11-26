import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Feeds from './Feed/Feeds'
import Pages from './Feed/Pages'
import Gallery from './Gallery/Gallery'

const EatScreen = () => {
  return (
    <View style={{ flex:1 }}>
      <Gallery />
    </View>
  )
}

export default EatScreen

const styles = StyleSheet.create({})