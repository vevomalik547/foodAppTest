import { StyleSheet, Text, View, Dimensions, ScrollView, Image } from 'react-native';
import React from 'react';
import Pages from './Pages';

const { height } = Dimensions.get('window');

const Feeds = () => {
  return (
    <View>
      <Pages />
    </View>

  );
};

export default Feeds;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  content: {
    flexGrow: 1,
  },
  section: {
    height: height, // Full screen height for each section
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
