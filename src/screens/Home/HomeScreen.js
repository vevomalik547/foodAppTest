import { FlatList, StyleSheet, Text, View, Dimensions, TouchableOpacity, Animated, Image } from "react-native";
import React, { useRef, useState } from "react";
import HomepageAppBar from "./components/HomepageAppBar";
import Intro from "./components/Intro";
import Feeds from "../Feed/Feeds";
import Gallery from "../Gallery/Gallery";

const { height, width } = Dimensions.get("window");

const HomeScreen = ({ props, route, username }) => {

  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity for animation
  const translateY = useRef(new Animated.Value(0)).current; // Value to translate Feeds component
  const tabsTranslateY = useRef(new Animated.Value(0)).current; // Value for the sticky tabs container
  const [showFeeds, setShowFeeds] = useState(false); // Track Feeds visibility
  const [activeTab, setActiveTab] = useState("Following"); // Track active tab

  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;

    // Trigger rendering of Feeds when scrolling past the first section
    if (showFeeds === false) {
      setShowFeeds(true);
      animateFeeds();
    }

    Animated.spring(translateY, {
      toValue: scrollY > 20 ? 280 : scrollY,
      useNativeDriver: true,
    }).start();

    if (scrollY > 180) {
      Animated.spring(tabsTranslateY, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(tabsTranslateY, {
        toValue: scrollY,
        useNativeDriver: true,
      }).start();
    }
  };

  const animateFeeds = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Following":
        return (
          <Animated.View
            style={[
              styles.feedsSection,
              {
                opacity: fadeAnim,
                transform: [{ translateY }],
                height: "100%",
              },
            ]}
          >
            <Feeds />
          </Animated.View>
        );
      case "Explore":
        return (
          <Animated.View>
            <Gallery />
          </Animated.View>
        );
      case "Meals":
        return <Text style={styles.content}>This is the Meals section</Text>;
      default:
        return <Text style={styles.content}>Select a tab to view content</Text>;
    }
  };

  const sections = [
    {
      id: 'homepage-content',
      data: [
        { component: <HomepageAppBar /> },
        { component: <Intro name={username} /> },
        {
          component: (
            <View style={styles.midBanner}>
              <Text style={styles.title}>Happening near you</Text>
              <Image source={require('../../../assets/map.png')} />
            </View>
          ),
        },
      ],
    },
    {
      id: 'tabs',
      data: [
        {
          component: (
            <Animated.View style={[styles.tabContainer, { transform: [{ translateY: tabsTranslateY }] }]}>
              <TouchableOpacity
                style={[styles.tabButton, activeTab === "Following" && styles.activeTab]}
                onPress={() => setActiveTab("Following")}
              >
                <Text style={[styles.tabButtonText, activeTab === "Following" && styles.activeTabText]}>Following</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.tabButton, activeTab === "Explore" && styles.activeTab]}
                onPress={() => setActiveTab("Explore")}
              >
                <Text style={[styles.tabButtonText, activeTab === "Explore" && styles.activeTabText]}>Explore</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.tabButton, activeTab === "Meals" && styles.activeTab]}
                onPress={() => setActiveTab("Meals")}
              >
                <Text style={[styles.tabButtonText, activeTab === "Meals" && styles.activeTabText]}>Meals</Text>
              </TouchableOpacity>
            </Animated.View>
          ),
        },
      ],
    },
    {
      id: 'feeds-content',
      data: [
        { component: renderContent() },
      ],
    }
  ];

  return (
    <FlatList
      style={styles.container}
      data={sections}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.section}>
          {item.data.map((subItem, index) => (
            <View key={index}>{subItem.component}</View>
          ))}
        </View>
      )}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      pagingEnabled={true}
      horizontal={false}
      getItemLayout={(data, index) => ({
        length: deviceHeight, // Fixed height for each item
        offset: deviceHeight * index,
        index,
      })}
    />
  );
};

export default HomeScreen;

const { height: deviceHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '300',
  },
  midBanner: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 4,
    marginLeft: 16,
    zIndex: 1, // Ensure tabs are on top
    // backgroundColor: "#fff", // To maintain visibility on scroll
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: "#a6a4a8",
    marginHorizontal: 4,
  },
  tabButtonText: {
    fontSize: 11,
    color: "#fff",
    fontWeight: 'bold',
  },
  activeTab: {
    backgroundColor: "#000", // Highlighted button background color
  },
  activeTabText: {
    color: "#fff", // Highlighted button text color
  },
  feedsSection: {
    flex: 1, // Make it fill the screen
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    marginTop: 10, // Add margin if needed
  },
  content: {
    flexGrow: 1,
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  section: {
    paddingVertical: 10,
  },
});