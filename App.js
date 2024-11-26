import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigators/StackNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

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
