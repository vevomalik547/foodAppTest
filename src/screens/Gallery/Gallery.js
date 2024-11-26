import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
    View,
    Image,
    StyleSheet,
    Dimensions,
    FlatList,
    Text,
} from 'react-native';

// Screen dimensions
const { width: deviceWidth } = Dimensions.get('window');
const columnWidth = (deviceWidth - 30) / 2; // Adjust for padding and spacing

// Local images
const images = [
    { id: '1', uri: require('../../../assets/gallery/gal1.png'), name: "Magnum", profilepic: require('../../../assets/gallery/profile/prof1.png'), time: '20min' },
    { id: '2', uri: require('../../../assets/gallery/gal2.png'), name: "Theodore", profilepic: require('../../../assets/gallery/profile/prof2.png'), time: '20min' },
    { id: '3', uri: require('../../../assets/gallery/gal3.png'), name: "Thomas", profilepic: require('../../../assets/gallery/profile/prof1.png'), time: '20min' },
    { id: '4', uri: require('../../../assets/gallery/gal4.png'), name: "M Knight", profilepic: require('../../../assets/gallery/profile/prof2.png'), time: '20min' },
    { id: '5', uri: require('../../../assets/gallery/gal5.png'), name: "Thomas Magnum", profilepic: require('../../../assets/gallery/profile/prof1.png'), time: '20min' },
    { id: '6', uri: require('../../../assets/gallery/gal6.png'), name: "Trunk", profilepic: require('../../../assets/gallery/profile/prof2.png'), time: '20min' },
    { id: '7', uri: require('../../../assets/gallery/gal7.png'), name: "Calvin", profilepic: require('../../../assets/gallery/profile/prof1.png'), time: '20min' },
    { id: '8', uri: require('../../../assets/gallery/gal8.png'), name: "Kate", profilepic: require('../../../assets/gallery/profile/prof2.png'), time: '20min' },
];

const Gallery = () => {
    const renderItem = ({ item, index }) => {
        const isEven = index % 2 === 1; // Check if the index is even
        return (
            <View style={[styles.imageContainer, isEven && styles.evenImage]}>
                <Image source={item.uri} style={styles.image} />
                {/* Faded Gradient Overlay */}
                <LinearGradient
                    colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.8)']}
                    style={styles.gradientOverlay}
                    start={{ x: 0, y: 0 }} // Gradient starts from the top
                    end={{ x: 0, y: 1 }}   // Gradient ends at the bottom
                />
                {/* Content */}
                <View style={styles.content}>
                    <Image source={item.profilepic} style={styles.profilePics} />
                    <View style={{ marginLeft: 4, justifyContent: 'space-around' }}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.time}>{item.time}</Text>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={images}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                numColumns={2} // 2 columns
                pagingEnabled={false}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={styles.row} // Styling for rows
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        padding: 10,
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    imageContainer: {
        width: columnWidth,
        height: columnWidth * 2, // Maintain aspect ratio
        borderRadius: 10,
        backgroundColor: '#eee',
        overflow: 'hidden', // Ensures content stays within rounded corners
    },
    evenImage: {
        marginTop: 20, // Add offset for even-indexed items
    },
    image: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    gradientOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '50%', // Adjust as needed to control fade effect
    },
    profilePics: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    name: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
    },
    time: {
        fontWeight: '300',
        color: 'white',
    },
    content: {
        position: 'absolute',
        bottom: 10,
        flexDirection: 'row',
        padding: 8,
        alignItems: 'center',
    },
});

export default Gallery;
