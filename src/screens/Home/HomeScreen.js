import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Animated,
  Image,
} from "react-native";
import React, { useRef, useState } from "react";
import HomepageAppBar from "./components/HomepageAppBar";
import Intro from "./components/Intro";
import Feeds from "../Feed/Feeds";

const { height } = Dimensions.get("window");

const HomeScreen = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity for animation
  const [showFeeds, setShowFeeds] = useState(false); // Track Feeds visibility
  const [activeTab, setActiveTab] = useState("Following"); // Track active tab


  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;

    // Trigger rendering of Feeds when scrolling past the first section
    if (scrollY > height - 200 && !showFeeds) {
      setShowFeeds(true);
      animateFeeds();
    }
  };

  const animateFeeds = () => {
    // Animate opacity to 1 for a smooth fade-in effect
    Animated.timing(fadeAnim, {
      toValue: 1, // Fully visible
      duration: 500, // Animation duration (in milliseconds)
      useNativeDriver: true,
    }).start();
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Following":
        return (
          <Animated.View
            style={[styles.feedsSection, { opacity: fadeAnim }]} // Apply fade animation
          >
            <Feeds />
          </Animated.View>
        );
      case "Explore":
        return <Text style={styles.content}>This is the Explore section</Text>;
      case "Meals":
        return <Text style={styles.content}>This is the Meals section</Text>;
      default:
        return <Text style={styles.content}>Select a tab to view content</Text>;
    }
  };


  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll} // Handle scroll event
        scrollEventThrottle={16} // Frequency of scroll events
      >
        {/* First Section */}
        <View>
          <HomepageAppBar />
          <Intro name="Pradeep" />

          <View style={styles.midBanner}>
            <Text style={styles.title}>Happening near you</Text>
            <Image source={require('../../../assets/map.png')} />
          </View>
        </View>

        <View style={{ flex: 1, flexGrow: 1 }}>
          <View style={styles.tabContainer}>
            {/* Following Button */}
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
          </View>


          <View style={{  }}>
            {renderContent()}
          </View>
          {/* </ScrollView> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '300'
  },
  content: {
    flexGrow: 1,
  },
  midBanner: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 16
  },
  section: {
    height: height - 180,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  feedsSection: {
    // margin: -28,
    // padding: -40,
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
  },
  tabContainer: {
    flexDirection: "row",
    // justifyContent: "space-around",
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 16,
    flex: 1, flexGrow: 1
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
    fontWeight: 'bold'
  },
  activeTab: {
    backgroundColor: "#000", // Highlighted button background color
  },
  activeTabText: {
    color: "#fff", // Highlighted button text color
  },
  contentContainer: {
    padding: 20,
  },
  content: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
});
