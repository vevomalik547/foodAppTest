import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, Image } from 'react-native';
import HomeScreen from '../screens/Home/HomeScreen';
import EatScreen from '../screens/EatScreen';
import ReservationScreen from '../screens/ReservationScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

// Map route names to image paths
const iconPaths = {
    Home: require('../../assets/tabIcons/Home.png'),
    Eat: require('../../assets/tabIcons/Eat.png'),
    Reservation: require('../../assets/tabIcons/Reservations.png'),
    Profile: require('../../assets/tabIcons/Profile.png'),
};

export default function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    const iconPath = iconPaths[route.name]; // Fetch the icon path based on the route name

                    return (
                        <View style={[styles.iconWrapper, focused && styles.activeIconWrapper]}>
                            <Image
                                source={iconPath}
                                style={[styles.icon, focused && styles.activeIcon]} // Style for icons
                                resizeMode="contain"
                            />
                            <Text style={[styles.tabLabel, focused && styles.activeTabLabel]}>
                                {route.name}
                            </Text>
                        </View>
                    );
                },
                tabBarLabel: ({ focused }) => (
                    <Text style={[styles.tabLabel, focused && styles.activeTabLabel]}>
                        {/* {route.name} */}
                    </Text>
                ),
                tabBarStyle: styles.tabBar,
                tabBarActiveTintColor: '#8B4513',
                tabBarInactiveTintColor: '#333',
                headerShown: false,
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Eat" component={EatScreen} />
            <Tab.Screen name="Reservation" component={ReservationScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#f8f8f8',
        borderTopWidth: 0,
        elevation: 0,
        height: 80,
        paddingTop: 16,
    },
    iconWrapper: {
        padding: 20,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeIconWrapper: {
        backgroundColor: '#f4ebe8', // Rounded background for active tab
    },
    icon: {
        width: 27,
        height: 27,
    },
    activeIcon: {
        tintColor: '#8B4513', // Change icon color for active tab
    },
    tabLabel: {
        fontSize: 8,
        fontWeight: '400',
        color: '#333',
        width:'100%',
        marginTop: 8,
    },
    activeTabLabel: {
        color: '#8B4513', // Active label color
        // fontWeight: '600',
    },
});
