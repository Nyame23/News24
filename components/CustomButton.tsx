import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  containerStyles?: ViewStyle;
  textStyles?: TextStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress, containerStyles, textStyles }) => {
  return (
    <TouchableOpacity style={[styles.button, containerStyles]} onPress={onPress}>
      <Text style={[styles.buttonText, textStyles]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FF5722', // Example background color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomButton;
