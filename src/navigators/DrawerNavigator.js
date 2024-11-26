import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator({ route }) {
  const { username } = route.params || {}; // Retrieve username from route params

  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Main Tabs">
        {(props) => <TabNavigator {...props} username={username} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}
