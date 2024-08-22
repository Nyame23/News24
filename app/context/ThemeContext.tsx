import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

// Define the context shape
interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  useDeviceTheme: boolean;
  toggleUseDeviceTheme: () => void;
}

// Create context with default values
const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,
  toggleDarkMode: () => {},
  useDeviceTheme: true,
  toggleUseDeviceTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const deviceColorScheme = useColorScheme();
  const [darkMode, setDarkMode] = useState(deviceColorScheme === 'dark');
  const [useDeviceTheme, setUseDeviceTheme] = useState(true);

  // Update darkMode when deviceColorScheme or useDeviceTheme changes
  useEffect(() => {
    if (useDeviceTheme) {
      setDarkMode(deviceColorScheme === 'dark');
    }
  }, [deviceColorScheme, useDeviceTheme]);

  const toggleDarkMode = () => {
    if (!useDeviceTheme) {
      setDarkMode(prev => !prev);
    }
  };

  const toggleUseDeviceTheme = () => {
    setUseDeviceTheme(prev => {
      const newUseDeviceTheme = !prev;
      if (newUseDeviceTheme) {
        setDarkMode(deviceColorScheme === 'dark');
      }
      return newUseDeviceTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode, useDeviceTheme, toggleUseDeviceTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
