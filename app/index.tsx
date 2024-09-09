import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import CustomButton from '../components/CustomButton';
import { images } from '../constants'; // Adjust import if you have a `constants` file

const Welcome = () => {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colorScheme === 'dark' ? '#161622' : '#fff' }]}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <Text style={[styles.title, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>
            News
            <Text style={styles.highlight}> 24</Text>
          </Text>

          <Image
            source={images.globe1} // Adjust image path if necessary
            style={styles.image}
            resizeMode="contain"
          />

          <View style={styles.textContainer}>
            <Text style={[styles.title, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>
              Discover Latest{'\n'}
              Exciting News with{'\n'}
              <Text style={styles.highlight}>News 24</Text>
            </Text>
          </View>
          
          <Text style={[styles.subtitle, { color: colorScheme === 'dark' ? '#D1D1D1' : '#000' }]}>
            Exploration with News24
          </Text>
          
          <CustomButton
            title="WELCOME"
            onPress={() => router.push("/home")}
            containerStyles={styles.button}
          />
        </View>
      </ScrollView>

      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 250,
    height: 250, 
    marginVertical: 65, 
  },
  textContainer: {
    marginTop: -2,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  highlight: {
    color: '#FFD700', // Adjust highlight color
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
  },
  button: {
    width: '100%',
    marginTop: 20,
  },
});

export default Welcome;
