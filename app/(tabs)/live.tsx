import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, useWindowDimensions } from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';
import { useTheme } from '../context/ThemeContext'; // Adjust the import path as needed

const calculateVideoHeight = (screenWidth: number): number => (screenWidth * 9) / 16;

const Live = () => {
  const { darkMode } = useTheme();
  const { width } = useWindowDimensions();

  // Adjust video dimensions based on screen width
  const videoWidth = width > 1024 ? width * 0.7 : width - 20;
  const videoHeight = calculateVideoHeight(videoWidth);

  // Define breakpoints
  const isLargeScreen = width > 1024;
  const isMediumScreen = width <= 1024 && width > 768;
  const isSmallScreen = width <= 768;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: darkMode ? '#000' : '#fff' }]}>
      <View style={[styles.container, { backgroundColor: darkMode ? '#000' : '#fff' }]}>
        
        {/* Channel Header */}
        <View style={[
          styles.channelHeader, 
          { top: isLargeScreen ? 60 : isMediumScreen ? 50 : 40 } // Adjust header position based on screen size
        ]}>
          <Text style={[styles.title, { color: darkMode ? '#fff' : '#000' }]}>
            News
            <Text style={styles.highlight}> 24</Text>
          </Text>
        </View>
        
        {/* Scrollable Content */}
        <ScrollView contentContainerStyle={[
          styles.contentContainer, 
          { paddingTop: isLargeScreen ? 110 : isMediumScreen ? 100 : 0 } // Adjust paddingTop based on screen size
        ]}>
          {/* Live News Section */}
          <View style={[styles.section, { alignItems: 'center' }]}>
            <Text style={[styles.sectionTitle, { color: darkMode ? '#fff' : '#000' }]}>Live News</Text>
            <View style={[styles.videoContainer, { width: videoWidth }]}>
              <YoutubeIframe
                height={videoHeight}
                width={videoWidth}
                videoId="YQHsXMglC9A" // Your video ID
                play={true}
              />
            </View>
          </View>

          {/* Previous Podcasts Section */}
          <View style={[styles.section, { alignItems: 'center' }]}>
            <Text style={[styles.sectionTitle, { color: darkMode ? '#fff' : '#000' }]}>Podcasts</Text>
            <View style={[styles.videoContainer, { width: videoWidth }]}>
              <YoutubeIframe
                height={videoHeight}
                width={videoWidth}
                videoId="YQHsXMglC9A" // Replace with another video ID
                play={true}
              />
            </View>
          </View>

          {/* Additional Section */}
          <View style={[styles.section, { alignItems: 'center' }]}>
            <Text style={[styles.sectionTitle, { color: darkMode ? '#fff' : '#000' }]}>Ads</Text>
            <View style={[styles.videoContainer, { width: videoWidth }]}>
              <YoutubeIframe
                height={videoHeight}
                width={videoWidth}
                videoId="YQHsXMglC9A" // Replace with another video ID
                play={true}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  channelHeader: {
    marginBottom: 38,
    marginTop: -2,
    marginLeft: 16,
    left: 0, // Align title to the left
     // Use absolute positioning to adjust header position
    width: '100%', // Ensure header spans the full width
  },
  title: {
    fontSize: 28,
    textAlign: 'left', // Align text to the left
    fontWeight: 'bold',
  },
  highlight: {
    color: '#FFD700',
  },
  section: {
    marginVertical: 20,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  videoContainer: {
    alignSelf: 'center', // Center video container horizontally
    marginBottom: 10,
  },
});

export default Live;
