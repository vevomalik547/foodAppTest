import { ScrollView, StyleSheet, Text, View, FlatList, Dimensions, Button } from 'react-native'
import React, { useRef, useEffect, useState } from 'react'
import HomepageAppBar from './components/HomepageAppBar'
import Intro from './components/Intro'
import PagerView from 'react-native-pager-view';

const { height } = Dimensions.get('window');

const HomeScreen = (props) => {

  const scrollViewRef = useRef(null);

  useEffect(() => {
    let scrollY = 0;
    const interval = setInterval(() => {
      scrollY += height; // Scroll by one screen height
      scrollViewRef.current?.scrollTo({ y: scrollY, animated: true });
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <View style={styles.container}>

      <ScrollView
        // ref={scrollViewRef}
        style={styles.container}
        contentContainerStyle={styles.content}
        pagingEnabled // Snap to each section
        showsVerticalScrollIndicator={false}
      >

        <View style={[{height:height} ]}>
          <HomepageAppBar />
          <Intro name='Pradeep' />
        </View>

        <View style={[styles.section, { backgroundColor: '#ffcccb' }]}>
          <Text style={styles.text}>First View</Text>
        </View>
        <View style={[styles.section, { backgroundColor: '#add8e6' }]}>
          <Text style={styles.text}>Second View</Text>
        </View>
        <View style={[styles.section, { backgroundColor: '#90ee90' }]}>
          <Text style={styles.text}>Third View</Text>
        </View>
      </ScrollView>
    </View>
  )
}

export default HomeScreen

let deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
  section: {
    height : height-100,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
})