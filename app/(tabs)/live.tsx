import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, useColorScheme } from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';

const { width } = Dimensions.get('window');

// Calculate responsive height based on the aspect ratio and screen width
const calculateVideoHeight = (screenWidth: number): number => (screenWidth * 9) / 16;

const Live = () => {
  const colorScheme = useColorScheme();
  
  // Adjust video dimensions based on screen width
  const videoWidth = width > 1024 ? width * 0.7 : width - 20; // 70% of screen width for larger screens
  const videoHeight = calculateVideoHeight(videoWidth);

  // Define breakpoints
  const isLargeScreen = width > 1024;
  const isMediumScreen = width <= 1024 && width > 768;
  const isSmallScreen = width <= 768;

  return (
    <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' }]}>
      
      {/* Channel Header */}
      <View style={[
        styles.channelHeader, 
        { top: isLargeScreen ? 60 : isMediumScreen ? 50 : 40 } // Adjust header position based on screen size
      ]}>
        <Text style={[styles.title, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>
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
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>Live News</Text>
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
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>Podcasts</Text>
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
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>Ads</Text>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center', // Center content horizontally
    paddingBottom: 20,
  },
  channelHeader: {
    marginBottom: 38, // Existing margin to push content down
    marginTop: -8, // Adjust this value to move header down
    marginLeft: 16,
    left: -140, // Align to the left similar to HomePage
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  highlight: {
    color: '#FFD700',
  },
  section: {
    marginVertical: 20,
    width: '100%', // Ensure section takes full width
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  videoContainer: {
    alignItems: 'center', // Center video horizontally
    marginBottom: 10,
  },
});

export default Live;
