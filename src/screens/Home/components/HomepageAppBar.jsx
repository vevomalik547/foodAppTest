import { StyleSheet, Text, TouchableOpacity, View, Image, Platform } from 'react-native'
import React from 'react'
import { Ionicons } from 'react-native-vector-icons';
import PagerView from 'react-native-pager-view';


const HomepageAppBar = () => {
    return (
        
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, alignItems: 'center', paddingTop:Platform.OS === 'ios' ? 40 : 10 }}>
            <View style={{}}>
                <Text style={{ fontSize: 10, color:'#737275', fontWeight:'600' }}>Current location</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop:4 }}>
                    <Image source={require('../../../../assets/location.png')} />
                    <Text style={{ fontSize: 14, fontWeight: 'bold', marginHorizontal: 4 }}>Colombo, Sri Lanka</Text>
                    <Ionicons name='chevron-down' size={20} color={'#000'} />
                </View>
            </View>
            <View style={{}}>
                <TouchableOpacity onPress={() => console.log('Hello There')}>
                    <Image source={require('../../../../assets/notiIcon.png')} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default HomepageAppBar

const styles = StyleSheet.create({})