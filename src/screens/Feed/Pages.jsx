import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    FlatList,
    Dimensions,
    TouchableOpacity,
    Image,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import data from './data.json';
import { LinearGradient } from 'expo-linear-gradient';


const images = {
    feed1: require('../../../assets/Feeds/feed1.png'),
    feed2: require('../../../assets/Feeds/feed2.png'),
    feed3: require('../../../assets/Feeds/feed3.png'),
};

// Get the device height
const { height: deviceHeight } = Dimensions.get('window');

const Pages = () => {
    const refRBSheet = useRef();
    const [likeCount, setLikeCount] = useState(0);
    const [isLiked, setIsLiked] = useState(false);

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    };

    const handleShare = () => {
        // Handle share functionality here (e.g., using Share API)
        console.log('Shared!');
    };

    const renderItem = ({ item }) => (
        <>
            <View style={styles.card}>
                {/* Background Image */}
                <ImageBackground
                    source={images[item.imagePath]}
                    style={styles.backgroundImage}
                    resizeMode="cover"
                >
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,1)']}
                        style={[styles.gradientOverlay, {}]}
                    >

                        <View style={styles.tagsContainer}>
                            {item.imageTags.map((tag, index) => (
                                <TouchableOpacity key={index} style={styles.tagButton}>
                                    <Text style={styles.tagText}>{tag}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <Text style={{ color:'white',  }}><Text style={{ color:'#7FD28C', fontWeight:'bold', fontSize:24 }}>200m</Text> away from you</Text>
                        
                        <Text style={styles.description}>{item.imageDescription}</Text>

                        {/* Counts */}
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 19 }}>
                            <Icon name='star' color={'white'} size={20} style={{ marginRight: 8 }} />
                            <Text style={[styles.counts, { textDecorationLine: 'none', marginRight: 4 }]}>4.95</Text>
                            <Entypo name='dot-single' color={'white'} size={20} style={{ marginRight: 5 }} />
                            <Text style={[styles.counts, { marginRight: 10 }]}>{item.reviewCount} Reviews</Text>
                        </View>
                        {/* Price */}
                        <View style={{ display:'flex', flexDirection:'row', alignItems:'center' }}>
                            <Text style={styles.price}>$ {item.price.toFixed(2)} per seat</Text>
                            
                            <View style={{ backgroundColor:'#7FD28C', padding:5, borderRadius:100, paddingHorizontal:10, marginLeft:10 }}>
                            <Text>2/5 open seats</Text>
                            </View>
                        </View>

                        <View style={{ marginTop:15 }}>
                            <Image source={require('../../../assets/btnset.png')} style={{marginLeft:-20 }} />
                        </View>

                    </LinearGradient>
                </ImageBackground >

            </View >
                        <View style={styles.actionButtons}>
                            <View>
                                <TouchableOpacity onPress={handleLike} style={styles.btns}>
                                    <Icon name={isLiked ? 'thumbs-up' : 'thumbs-o-up'} size={20} color="#fff" />
                                </TouchableOpacity>
                                <Text style={styles.btnText}>{likeCount}</Text>
                            </View>

                            <View>
                                <TouchableOpacity
                                    onPress={() => refRBSheet.current.open()}
                                    style={styles.btns}
                                >
                                    <Icon name="comment" size={20} color="#fff" />
                                </TouchableOpacity>
                                <Text style={styles.btnText}>{item.commentCount}</Text>
                            </View>

                            <View>
                                < TouchableOpacity
                                    style={styles.btns}
                                    onPress={handleShare}
                                >
                                    <Icon name="share-alt" size={20} color="#fff" />
                                </TouchableOpacity >
                                <Text style={styles.btnText}>{item.commentCount}</Text>
                            </View>


                        </View>
            {/* Bottom Sheet for Comments */}
            <RBSheet
                ref={refRBSheet}
                height={250}
                openDuration={250}
                customStyles={{
                    container: {
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                    },
                }}
            >
                <View style={styles.bottomSheet}>
                    <Text style={styles.bottomSheetTitle}>Comments</Text>
                    {/* You can add a list of comments here */}
                    <Text style={styles.commentText}>Add a comment...</Text>
                </View>
            </RBSheet>
        </>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                pagingEnabled // Enables scrolling one item at a time
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    btnText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 8
    },
    card: {
        height: deviceHeight, // Set each card to the device height
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add a semi-transparent overlay
        padding: 20,
    },
    gradientOverlay: {
        // height: 350,
        paddingVertical: 20,
        paddingLeft: 20,
        paddingRight: 70
    },
    description: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop:10
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10,
    },
    tagButton: {
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 15,
        marginRight: 10,
        marginBottom: 10,
    },
    tagText: {
        color: '#000',
        fontSize: 12,
        fontWeight: '500',
    },
    counts: {
        fontSize: 14,
        color: '#ccc',
        // marginBottom: 10,
        textDecorationLine: 'underline'
    },
    price: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fff',
    },
    actionButtons: {
        flexDirection: 'column',
        position: 'absolute',
        bottom: 180,
        right: 16,
    },
    btns: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderRadius: 50,
        padding: 10,
        elevation: 5,
        marginBottom: 5
    },
    bottomSheet: {
        flex: 1,
        padding: 20,
    },
    bottomSheetTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    commentText: {
        fontSize: 16,
        marginTop: 20,
        color: '#888',
    },
});

export default Pages;
