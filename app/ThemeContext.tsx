import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useColorScheme } from 'react-native';

type ThemeContextType = {
  darkMode: boolean;
  toggleDarkMode: () => void;
  useDeviceTheme: boolean;
  toggleUseDeviceTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const deviceColorScheme = useColorScheme();
  const [useDeviceTheme, setUseDeviceTheme] = useState(true);
  const [darkMode, setDarkMode] = useState(deviceColorScheme === 'dark');

  const toggleDarkMode = () => {
    setUseDeviceTheme(false);
    setDarkMode(!darkMode);
  };

  const toggleUseDeviceTheme = () => {
    setUseDeviceTheme(!useDeviceTheme);
    if (!useDeviceTheme) {
      setDarkMode(deviceColorScheme === 'dark');
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        useDeviceTheme,
        toggleUseDeviceTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
