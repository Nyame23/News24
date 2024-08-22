import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useColorScheme } from 'react-native';

const Settings = () => {
  const deviceColorScheme = useColorScheme();
  const [darkMode, setDarkMode] = useState(deviceColorScheme === 'dark');
  const [language, setLanguage] = useState('en'); // Default language
  const [useDeviceTheme, setUseDeviceTheme] = useState(true);

  const toggleDarkMode = () => {
    setUseDeviceTheme(false);
    setDarkMode(!darkMode);
  };

  const toggleUseDeviceTheme = () => {
    setUseDeviceTheme(!useDeviceTheme);
    if (useDeviceTheme) {
      setDarkMode(deviceColorScheme === 'dark');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: darkMode ? '#000' : '#fff' }]}>
      <Text style={[styles.text, { color: darkMode ? '#fff' : '#000' }]}>Settings</Text>
      
      {/* Dark Mode Switch */}
      <View style={styles.settingRow}>
        <Text style={[styles.label, { color: darkMode ? '#fff' : '#000' }]}>Dark Mode</Text>
        <Switch
          value={darkMode}
          onValueChange={toggleDarkMode}
          disabled={useDeviceTheme}
        />
      </View>
      
      {/* Use Device Theme Switch */}
      <View style={styles.settingRow}>
        <Text style={[styles.label, { color: darkMode ? '#fff' : '#000' }]}>Use Device Theme</Text>
        <Switch
          value={useDeviceTheme}
          onValueChange={toggleUseDeviceTheme}
        />
      </View>
      
      {/* Language Picker */}
      <View style={styles.settingRow}>
        <Text style={[styles.label, { color: darkMode ? '#fff' : '#000' }]}>Language</Text>
        <Picker
          selectedValue={language}
          style={[styles.picker, { color: darkMode ? '#fff' : '#000' }]}
          onValueChange={(itemValue: string) => setLanguage(itemValue)}
        >
          <Picker.Item label="English" value="en" />
          <Picker.Item label="Spanish" value="es" />
          <Picker.Item label="French" value="fr" />
          {/* Add more languages as needed */}
        </Picker>
      </View>
      
      {/* Other Settings Button */}
      <Button
        title="More Settings"
        color={darkMode ? '#FFD700' : '#000'}
        onPress={() => alert('More settings will be added here.')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
  },
  picker: {
    width: 150,
    height: 50,
  },
});

export default Settings;
