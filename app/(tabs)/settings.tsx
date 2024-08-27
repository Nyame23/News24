import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, SafeAreaView, StatusBar, Button, Alert, Platform } from 'react-native';
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../context/ThemeContext';

const Settings = () => {
  const { darkMode, useDeviceTheme, toggleDarkMode, toggleUseDeviceTheme } = useTheme();
  const [fontSize, setFontSize] = useState<number>(16); // Default font size
  const [notifications, setNotifications] = useState<boolean>(true); // Default notification preference
  const [language, setLanguage] = useState<string>('en'); // Default language

  const handleAboutPress = () => {
    Alert.alert("About", "App Version: 1.0.0\nDeveloper: Opendot Solutions");
  };

  const handleHelpPress = () => {
    Alert.alert("Help & Support", "Contact us at nyphil515@gmail.com");
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: darkMode ? '#000' : '#fff' }]}>
      <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
      <View style={[styles.container, { backgroundColor: darkMode ? '#000' : '#fff' }]}>
        <Text style={[styles.text, { color: darkMode ? '#fff' : '#000' }]}>Settings</Text>

        <View style={styles.settingRow}>
          <Text style={[styles.label, { color: darkMode ? '#fff' : '#000' }]}>Use Device Theme</Text>
          <Switch value={useDeviceTheme} onValueChange={toggleUseDeviceTheme} />
        </View>

        {!useDeviceTheme && (
          <View style={styles.settingRow}>
            <Text style={[styles.label, { color: darkMode ? '#fff' : '#000' }]}>Dark Mode</Text>
            <Switch value={darkMode} onValueChange={toggleDarkMode} />
          </View>
        )}

        <View style={styles.settingRow}>
          <Text style={[styles.label, { color: darkMode ? '#fff' : '#000' }]}>Font Size</Text>
          <Slider
            style={styles.slider}
            minimumValue={12}
            maximumValue={30}
            step={1}
            value={fontSize}
            onValueChange={(value: number) => setFontSize(value)}
            minimumTrackTintColor="#1fb28f"
            maximumTrackTintColor="#000000"
          />
          <Text style={[styles.value, { color: darkMode ? '#fff' : '#000' }]}>{fontSize.toFixed(0)} px</Text>
        </View>

        <View style={styles.settingRow}>
          <Text style={[styles.label, { color: darkMode ? '#fff' : '#000' }]}>Notifications</Text>
          <Switch value={notifications} onValueChange={(value: boolean) => setNotifications(value)} />
        </View>

        <View style={[styles.settingRow, styles.pickerContainer]}>
          <Text style={[styles.label, { color: darkMode ? '#fff' : '#000' }]}>Language</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={language}
              style={[
                styles.picker,
                {
                  color: darkMode ? '#000' : '#000',
                  backgroundColor: darkMode ? '#fff' : '#fff', // Ensure better contrast in dark mode
                },
              ]}
              onValueChange={(itemValue: string) => setLanguage(itemValue)}
              mode={Platform.OS === 'ios' ? 'dropdown' : 'dialog'} // Set picker mode based on platform
            >
              <Picker.Item label="English" value="en" />
              <Picker.Item label="Spanish" value="es" />
              <Picker.Item label="French" value="fr" />
              {/* Add more languages as needed */}
            </Picker>
          </View>
        </View>

        {/* Adjust buttons for better visibility on iOS */}
        <View style={styles.buttonContainer}>
          <Button title="About" onPress={handleAboutPress} color={Platform.OS === 'ios' ? '#007AFF' : '#000'} />
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Help & Support" onPress={handleHelpPress} color={Platform.OS === 'ios' ? '#007AFF' : '#000'} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  text: {
    fontSize: 24,
    marginBottom: 24,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  label: {
    fontSize: 18,
    flex: 1,
  },
  slider: {
    width: 150,
  },
  value: {
    fontSize: 18,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20, // Ensure consistent margin with other settings
  },
  pickerWrapper: {
    flex: 1,
    marginLeft: 17,
    marginRight: 1,
    marginBottom: 20,
  },
  picker: {
    width: '100%', // Use full width for the Picker to avoid overflow
  },
  buttonContainer: {
    marginVertical: 10,
  },
});

export default Settings;
