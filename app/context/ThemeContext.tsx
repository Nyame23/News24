import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';

interface ThemeContextProps {
  darkMode: boolean;
  useDeviceTheme: boolean;
  toggleDarkMode: () => void;
  toggleUseDeviceTheme: () => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  language: string;
  setLanguage: (lang: string) => void;
  notifications: boolean;
  toggleNotifications: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  darkMode: false,
  useDeviceTheme: true,
  toggleDarkMode: () => {},
  toggleUseDeviceTheme: () => {},
  fontSize: 16,
  setFontSize: () => {},
  language: 'en',
  setLanguage: () => {},
  notifications: true,
  toggleNotifications: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const deviceColorScheme = useColorScheme();
  const [darkMode, setDarkMode] = useState<boolean>(deviceColorScheme === 'dark');
  const [useDeviceTheme, setUseDeviceTheme] = useState<boolean>(true);
  const [fontSize, setFontSize] = useState<number>(16);
  const [language, setLanguage] = useState<string>('en');
  const [notifications, setNotifications] = useState<boolean>(true);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
    setUseDeviceTheme(false);
  };

  const toggleUseDeviceTheme = () => {
    setUseDeviceTheme(prevValue => !prevValue);
    setDarkMode(deviceColorScheme === 'dark');
  };

  const toggleNotifications = () => {
    setNotifications(prevValue => !prevValue);
  };

  const theme = useDeviceTheme ? (deviceColorScheme === 'dark' ? DarkTheme : DefaultTheme) : (darkMode ? DarkTheme : DefaultTheme);

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        useDeviceTheme,
        toggleDarkMode,
        toggleUseDeviceTheme,
        fontSize,
        setFontSize,
        language,
        setLanguage,
        notifications,
        toggleNotifications,
      }}
    >
      <NavigationThemeProvider value={theme}>
        {children}
      </NavigationThemeProvider>
    </ThemeContext.Provider>
  );
};
