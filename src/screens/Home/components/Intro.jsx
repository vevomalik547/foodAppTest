import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const Intro = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.lightWeight}>Hello {props.name},</Text>
            <Text style={styles.lightWeight}>feeling like going on</Text>
            <Text style={styles.bolded}>an adventure ?</Text>

            <View style={{ borderColor: '#BC865D', borderWidth: 1.5, backgroundColor: '#FFFFFF', borderRadius: 100, padding: 10, marginTop: 16, flexDirection: 'row', alignContent:'center', alignItems:'center' }}>
                <View style={{ flex: 3, justifyContent: 'flex-start', marginLeft:4,}}>
                    <Text style={{ fontWeight: '500', color: '#121212', fontSize: 14, }}>What are you craving?</Text>
                    <Text style={{ fontWeight: '300', color: '#737275', fontSize: 12,marginTop:4 }}>Search for home food and home cooks</Text>
                </View>
                <View style={{ flex: 1, maxWidth:10, height:40 }}>
                    <Image source={require('../../../../assets/filtericon.png')} style={{ alignSelf: 'flex-end', alignContent: 'flex-end', width:40, height:40 }} />
                    {/* <Image source={require('../../../../assets/notiIcon.png')} style={{ alignSelf: 'flex-end', alignContent: 'flex-end' }} /> */}
                </View>
            </View>
        </View>
    )
}

export default Intro

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EFE1DB',
        borderRadius: 20,
        padding: 20,
        margin: 20
    },
    lightWeight: {
        fontWeight: '300',
        color: 'black',
        fontSize: 28,
    },
    bolded: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 28
    }
})