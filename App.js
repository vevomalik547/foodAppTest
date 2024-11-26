//ios 672923535750-9hvpcm2m9ade4r0lqpref183ho8tn50q.apps.googleusercontent.com
// android 672923535750-a2h7p26lgupobo39bs5c9qs9sathv71g.apps.googleusercontent.com
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigators/StackNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react';
import * as Google from 'expo-auth-session/providers/google'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  
  return (

    // <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F3F9' }}>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
