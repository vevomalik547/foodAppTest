import { StyleSheet, View, Dimensions} from 'react-native';
import React from 'react';
import Pages from './Pages';

const Feeds = () => {
  return (
    <View style={styles.container}>
      <Pages />
    </View>
  );
};

export default Feeds;
const { height: deviceHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    minHeight:'100%'
    // maxHeight: deviceHeight - 60
  },
});
