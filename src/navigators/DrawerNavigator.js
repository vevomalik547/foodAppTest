// src/navigators/DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown:false }}>
      <Drawer.Screen name="Main Tabs" component={TabNavigator} />
      {/* Add other drawer items here */}
    </Drawer.Navigator>
  );
}
