import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useColorScheme } from 'react-native';

// Define the shape of your context
interface ColorSchemeContextType {
  darkMode: boolean;
  useDeviceTheme: boolean;
  toggleDarkMode: () => void;
  toggleUseDeviceTheme: () => void;
}

// Create a context with a default value
const ColorSchemeContext = createContext<ColorSchemeContextType | undefined>(undefined);

export const ColorSchemeProvider = ({ children }: { children: ReactNode }) => {
  const deviceColorScheme = useColorScheme();
  const [darkMode, setDarkMode] = useState(deviceColorScheme === 'dark');
  const [useDeviceTheme, setUseDeviceTheme] = useState(true);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const toggleUseDeviceTheme = () => setUseDeviceTheme(!useDeviceTheme);

  return (
    <ColorSchemeContext.Provider value={{ darkMode, useDeviceTheme, toggleDarkMode, toggleUseDeviceTheme }}>
      {children}
    </ColorSchemeContext.Provider>
  );
};

export const useColorSchemeContext = () => {
  const context = useContext(ColorSchemeContext);
  if (context === undefined) {
    throw new Error('useColorSchemeContext must be used within a ColorSchemeProvider');
  }
  return context;
};
