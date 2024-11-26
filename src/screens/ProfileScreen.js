import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {

  const nav = useNavigation();
  const logout = async () => {
    await AsyncStorage.removeItem("@user");
    nav.navigate("Login")
  };

  return (
    <SafeAreaView>
      <View>
        <Button
          title="Sign Out"
          onPress={()=>logout()}
        />
      </View>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})